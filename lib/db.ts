import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable in .env.local");
}

// Avoid reinitializing in dev or serverless
interface MongooseGlobalCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached = (global as any).mongoose as MongooseGlobalCache;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        dbName: "audiantix", // ✅ change if you're using another DB
      })
      .then((mongooseInstance) => {
        console.log("✅ Connected to MongoDB");
        return mongooseInstance;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;

