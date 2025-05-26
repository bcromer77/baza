const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'audiantix';

let cachedClient = null;
let cachedDb = null;

// MongoClient connection for direct queries
async function getDb() {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  console.log("✅ Connected to MongoDB:", DB_NAME);
  return db;
}

// Mongoose model setup for optional use elsewhere
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt:{ type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Export both MongoDB client + Mongoose model
module.exports = {
  getDb,
  User
};

