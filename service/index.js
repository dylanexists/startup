const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const { ACCOUNTS_GLOB, APARTMENTS_GLOB, PAYMENTS_GLOB } = require('../src/constants');
const app = express();

const authCookieName = "token"

let users = ACCOUNTS_GLOB
let apartments = APARTMENTS_GLOB
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


//--------- User Services ---------//

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) { // user input sanitization
    return res.status(400).send({ msg: 'Email and password are required' });
  }

  if (await findUserByEmail(email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(email, password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
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
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

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
