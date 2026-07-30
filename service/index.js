const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = "token"
const adminRole = "Admin"

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
            const apartment = await DB.getApartment(paramValue)
            if (!apartment) {
                return res.status(404).send({ msg: 'Apartment not found' });
            }
            if (!apartment.linkedUserId) {
      // if no user assigned, let admins or self-assigning users in
        if (user.role === 'Admin') {
          return next();
        }

        const isSelfAssigning = req.body?.linkedUserId === user.id;

        if (isSelfAssigning) {
          return next()
        }

        return res.status(403).send({ msg: 'Forbidden: You can only assign this apartment to yourself' });
      }
            targetUserId = apartment.linkedUserId;
        }

        if (paramKey === 'paymentid') {
            const payment = await DB.getPayment(paramValue);
            if (!payment) {
                return res.status(404).send({ msg: 'Payment not found' });
            }
            const targetAptId = payment.linkedApartmentId
            const apartment = await DB.getApartment(targetAptId)
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
apiRouter.get('/apartments/available', async (req, res) => {
  try {
    const availableApartments = await DB.getAvailableApartments();
    res.json(availableApartments); 
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch apartments" });
  }
});

// GetApartment for User
apiRouter.get('/apartments/user/:userid', verifySpecificUserAuth("params", "userid"), async (req, res) => {
  try {
    const { userid } = req.params;
    const userApartment = await DB.getApartmentForUser(userid);

    if (!userApartment) {
      return res.status(404).json({ message: 'Apartment not found for this user' });
    }

    return res.json(userApartment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GetApartments for Admin
apiRouter.get('/apartments/all', verifyAdminAuth, async (req, res) => {
  try {
    const allApartments = await DB.getApartmentsForAdmin()
    res.json(allApartments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch apartments" });
  }
});

// updateApartment for User
apiRouter.patch('/apartments/id/:apartmentid', verifySpecificUserAuth("params", "apartmentid"), async (req, res) => {
  try {
    const { apartmentid } = req.params;
    const updates = req.body;

    const updatedApartment = await updateApartment(apartmentid, updates);
    

    if (!updatedApartment) {
      return res.status(404).json({ error: `Apartment ${apartmentid} not found` });
    }

    res.status(200).json(updatedApartment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

async function updateApartment(id, updates) {
  const apartment = await DB.getApartment(id)
  if (!apartment) return null
  const updatedApartment = { ...apartment, ...updates }
  await DB.updateApartment(updatedApartment)

  return updatedApartment;
}


//--------- Payment Services ---------//

// GetPayments for Admin
apiRouter.get('/payments/all', verifyAdminAuth, async (req, res) => {
  try {
    const allPayments = await DB.getPaymentsForAdmin()
    res.json(allPayments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// GetPayments for User
apiRouter.get('/payments/id/:apartmentid', verifySpecificUserAuth("params", "apartmentid"), async (req, res) => {
  try {
    const { apartmentid } = req.params;
    const payments = await DB.getPaymentsForApartment(apartmentid); 
    return res.json(payments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

// updatePayment for User
apiRouter.patch('/payments/id/:paymentid', verifySpecificUserAuth("params", "paymentid"), async (req, res) => {
  try {
    const { paymentid } = req.params;
    const updates = req.body;

    const updatedPayment = await updatePayment(paymentid, updates);

    if (!updatedPayment) {
      return res.status(404).json({ error: `Payment ${paymentid} not found` });
    }

    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

async function updatePayment(id, updates) {
  const payment = await DB.getPayment(id)
  if (!payment) return null
  const updatedPayment = { ...payment, ...updates }
  await DB.updatePayment(updatedPayment)

  return updatedPayment;
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
      user.token = uuid.v4()
      setAuthCookie(res, user.token)
      DB.updateUser(user)
      res.send({ user: user })
      return;
    }
  }
  res.status(401).send({ msg: 'Invalid email or password' });
});

// DeleteAuth to logout user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUserByToken(req.cookies[authCookieName]);
  if (user) {
    DB.updateUserRemoveAuth(user)
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser for Admin
apiRouter.get('/auth/id/:userid', verifyAdminAuth, async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await DB.getUser(userid);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
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

  await DB.addUser(newUser)

  return newUser
}

async function findUserByEmail(email) {
  if (!email) return null

  try {
    const user = await DB.getUserByEmail(email)
    return user; 
  } catch (err) {
    console.error("Error fetching user by email:", err);
    return null;
  }
}

async function findUserByToken(token) {
  if (!token) return null

  return await DB.getUserByToken(token)
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
