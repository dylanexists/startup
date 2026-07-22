const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const { ACCOUNTS_GLOB, APARTMENTS_GLOB, PAYMENTS_GLOB } = require('../src/constants');
const app = express();

const authCookieName = "token"
const adminRole = "Admin"

let users = ACCOUNTS_GLOB
const apartments = APARTMENTS_GLOB
let payments = PAYMENTS_GLOB

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


//--------- Verification Middleware ---------//


// Verify user authentication
const verifyAuth = async (req, res, next) => {
  const user = await findUserByToken(req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Verify admin authentication
const verifyAdminAuth = async (req, res, next) => {
  const user = await findUserByToken(req.cookies[authCookieName]);
  if (user && user.role === adminRole) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Verify Specific user authentication (or admin fetching user data)
const verifySpecificUserAuth = (paramSource = "params", paramKey) => {
    return async (req, res, next) => {
        const user = await findUserByToken(req.cookies[authCookieName]);
        if (!user) {
            return res.status(401).send({ msg: 'Unauthorized!' });
        } 

        const paramValue = req[paramSource]?.[paramKey];
        let targetUserId = paramValue

        if (paramKey === 'apartmentid') {
            const apartment = apartments[paramValue];
            if (!apartment) {
                return res.status(404).send({ msg: 'Apartment not found' });
            }
            targetUserId = apartment.linkedUserId;
        }

        if (paramKey === 'paymentid') {
            const payment = payments[paramValue];
            if (!payment) {
                return res.status(404).send({ msg: 'Payment not found' });
            }
            const targetAptId = payment.linkedApartmentId
            const apartment = apartments[targetAptId];
            if (!apartment) {
                return res.status(404).send({ msg: 'Apartment from payment not found' });
            }
            targetUserId = apartment.linkedUserId;
        }

        if (user.id !== targetUserId && user.role !== 'Admin') {
            return res.status(403).send({ msg: 'Forbidden: Access denied' });
        }
        next()
    }
}


//--------- Apartment Services ---------//


// GetAvailableApartments for Find Apartments Dash
apiRouter.get('/apartments/available', (req, res) => {
  const availableApartments = Object.values(apartments).filter(apt => !apt.linkedUserId);
  res.json(availableApartments);
});

// GetApartment for User
apiRouter.get('/apartments/user/:userid', verifySpecificUserAuth("params", "userid"), (req, res) => {
  const { userid } = req.params
  const userApartment = Object.values(apartments).find(
    (apt) => apt.linkedUserId === userid)
  res.json(userApartment);
});

// GetApartments for Admin
apiRouter.get('/apartments/all', verifyAdminAuth, (req, res) => {
  res.json(apartments);
});

// updateApartment for User
apiRouter.patch('/apartments/id/:apartmentid', verifySpecificUserAuth("params", "apartmentid"), (req, res) => {
  try {
    const { apartmentid } = req.params;
    const updates = req.body;

    const updatedApartment = updateApartment(apartmentid, updates);

    if (!updatedApartment) {
      return res.status(404).json({ error: `Apartment ${apartmentid} not found` });
    }

    res.status(200).json(updatedApartment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function updateApartment(id, updates) {
  if (!apartments[id]) return null;

  apartments[id] = {
    ...apartments[id],
    ...updates,
    id: apartments[id].id // Prevent accidental overwriting of the primary ID
  };

  return apartments[id];
}


//--------- Payment Services ---------//

// GetPayments for Admin
apiRouter.get('/payments/all', verifyAdminAuth, (req, res) => {
  res.send(payments);
});

// GetPayments for User
apiRouter.get('/payments/id/:apartmentid', verifySpecificUserAuth("params", "apartmentid"), (req, res) => {
  const { apartmentid } = req.params
  const userPayments = Object.values(payments).filter(
    (apt) => apt.linkedApartmentId === apartmentid)
  res.send(userPayments);
});

// Add bulk payments from admin
apiRouter.post('/payments/bulk', verifyAdminAuth, (req, res) => {
  const prevCount = Object.keys(payments).length
  const { newPayments } = req.body; // Expecting an array or object of payment records

  // If using an object like PAYMENTS_GLOB:
  newPayments.forEach((p) => {
    payments[p.id] = p;
  });

  const updatedCount = Object.keys(payments).length

  res.status(200).send({ previousCount: prevCount, updatedCount: updatedCount });
});

// updatePayment for User
apiRouter.patch('/payments/id/:paymentid', verifySpecificUserAuth("params", "paymentid"), (req, res) => {
  try {
    const { paymentid } = req.params;
    const updates = req.body;

    const updatedPayment = updatePayment(paymentid, updates);

    if (!updatedPayment) {
      return res.status(404).json({ error: `Payment ${paymentid} not found` });
    }

    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function updatePayment(id, updates) {
  if (!payments[id]) return null;

  payments[id] = {
    ...payments[id],
    ...updates,
    id: payments[id].id // Prevent accidental overwriting of the primary ID
  };

  return payments[id];
}

//--------- Account Services ---------//


// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) { // user input sanitization
    return res.status(400).send({ msg: 'Email and password are required' });
  }

  if (await findUserByEmail(email)) {
    res.status(409).send({ msg: 'An account already exists with this email. Please try a different email.' });
  } else {
    const user = await createUser(email, password);
    setAuthCookie(res, user.token);
    res.send({ user: user });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) { // user input sanitization
    return res.status(400).send({ msg: 'Email and password are required' });
  }

  const user = await findUserByEmail(email);
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ user: user });
      return;
    }
  }
  res.status(401).send({ msg: 'Invalid email or password' });
});

// DeleteAuth to logout user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUserByToken(req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10)
  const newId = uuid.v4();

  const newUser = 
        {id: newId, 
        email: email, 
        password: passwordHash, 
        role: "User",
        token: uuid.v4()}

  users[newId] = newUser

  return newUser
}

async function findUserByEmail(email) {
  if (!email) return null

  return Object.values(users).find((u) => u.email?.toLowerCase() === email.toLowerCase()) || null
}

async function findUserByToken(token) {
  if (!token) return null

  return Object.values(users).find((u) => u.token === token) || null
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
