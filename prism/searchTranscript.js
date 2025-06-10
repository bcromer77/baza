import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables

import { MongoClient } from "mongodb";
import OpenAI from "openai";

// 🔍 Optional debug
console.log("📘 OPENAI_API_KEY loaded:", process.env.OPENAI_API_KEY?.slice(0, 12));

// ✅ Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "MISSING_KEY",
});

// ✅ Initialize MongoDB
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.DB_NAME || "audiantix");
const collection = db.collection("transcripts");

// 🔎 Search function
export async function searchTranscript(prompt, k = 5) {
  console.log("🔎 Embedding prompt:", prompt);
  await client.connect();

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: prompt,
  });

  const promptEmbedding = response.data[0].embedding;

  const results = await collection.aggregate([
    {
      $search: {
        knnBeta: {
          path: "embedding",
          vector: promptEmbedding,
          k,
        },
      },
    },
    {
      $project: {
        _id: 0,
        text: 1,
        creatorId: 1,
        videoId: 1,
        timestamp: 1,
        score: { $meta: "searchScore" },
      },
    },
  ]).toArray();

  return results;
}

