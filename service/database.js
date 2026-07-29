const { MongoClient } = require('mongodb')
const config = require('./dbConfig.json')

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`

const client = new MongoClient(url);
const db = client.db('rentitbest');
const userCollection = db.collection('users');
const apartmentCollection = db.collection('apartments');
const paymentCollection = db.collection('payments');

// async test database connection, exit upon failure
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(userid) {
    return userCollection.findOne({ id: userid })
}

function getUserByEmail(email) {
    return userCollection.findOne({ email: email })
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token })
}

async function addUser(user) {
  await userCollection.insertOne(user)
}

async function updateUser(user) {
    await userCollection.updateOne({ id: user.id }, { $set: user })
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } })
}

module.exports = {
    getUser,
    getUserByEmail,
    getUserByToken,
    addUser,
    updateUser,
    updateUserRemoveAuth,
}