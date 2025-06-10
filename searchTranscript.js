import dotenv from "dotenv";
dotenv.config(); // ✅ load env variables

import { MongoClient } from "mongodb";
import OpenAI from "openai";

// Debug: log API key prefix
console.log("📘 OPENAI_API_KEY loaded:", process.env.OPENAI_API_KEY?.slice(0, 10));

// Set up OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "MISSING_KEY"
});

// Connect to Mongo
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("audiantix"); // ✅ must match what you used in seedAndEmbed
const collection = db.collection("transcripts");

// Main vector search function
export async function searchTranscript(prompt, k = 5) {
  console.log("🔎 Embedding prompt:", prompt);
  await client.connect();

  // Convert prompt to vector
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: prompt
  });

  const promptEmbedding = response.data[0].embedding;

  // Query MongoDB Atlas vector search
  const results = await collection.aggregate([
    {
      $search: {
        knnBeta: {
          path: "embedding",
          vector: promptEmbedding,
          k: k
        }
      }
    },
    {
      $project: {
        _id: 0,
        text: 1,
        creatorId: 1,
        videoId: 1,
        timestamp: 1,
        score: { $meta: "searchScore" }
      }
    }
  ]).toArray();

  return results;
}

