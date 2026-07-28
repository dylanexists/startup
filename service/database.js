const { MongoClient } = require('mongodb')
const config = require('./dbConfig.json')

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`

const client = new MongoClient(url);
const db = client.db('rentitbest')
const userCollection = db.collection('users')
const apartmentCollection = db.collection('apartments')
const paymentCollection = db.collection('payments')

