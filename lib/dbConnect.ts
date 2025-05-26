import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI || '';
const DB_NAME = process.env.DB_NAME || 'audiantix';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: DB_NAME,
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log('✅ MongoDB connected!');
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

