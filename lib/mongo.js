// lib/mongo.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

export const connectMongo = async () => {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_NAME || 'audiantix');
  }
  return db;
};

