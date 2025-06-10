import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";
import OpenAI from "openai";

// ✅ Confirm env loaded
console.log("🔐 OpenAI Key prefix:", process.env.OPENAI_API_KEY?.slice(0, 10));

// Init OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Connect to Mongo
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.DB_NAME || "audiantix");
const collection = db.collection("transcripts");

/**
 * Main function — chunk, embed, store
 */
export async function analyzeTranscript({ transcriptText, creatorId, videoId }) {
  const CHUNK_SIZE = 1000;
  const chunks = splitTranscript(transcriptText, CHUNK_SIZE);
  const results = [];

  await client.connect();

  for (let i = 0; i < chunks.length; i++) {
    const text = chunks[i];
    const embedding = await getEmbedding(text);

    const doc = {
      text,
      embedding,
      creatorId,
      videoId,
      timestamp: estimateTimestamp(i, CHUNK_SIZE),
      createdAt: new Date()
    };

    await collection.insertOne(doc);
    results.push(doc);
  }

  console.log(`✅ Successfully inserted ${results.length} transcript chunks.`);
  return results;
}

/**
 * Split transcript text into ~1000 char chunks
 */
function splitTranscript(text, chunkSize) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Call OpenAI to embed each chunk
 */
async function getEmbedding(text) {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });
  return res.data[0].embedding;
}

/**
 * Estimate timestamp per chunk
 */
function estimateTimestamp(index, chunkSize) {
  const avgCharsPerSec = 15;
  const seconds = (index * chunkSize) / avgCharsPerSec;
  return new Date(seconds * 1000).toISOString().substr(11, 8); // HH:MM:SS
}

