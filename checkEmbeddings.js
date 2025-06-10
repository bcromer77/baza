import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.DB_NAME || "audiantix");
const transcripts = db.collection("transcripts");

async function check() {
  await client.connect();

  const sample = await transcripts.findOne({ embedding: { $exists: true } });

  if (sample?.embedding) {
    console.log(`✅ Found embedded document with vector length: ${sample.embedding.length}`);
  } else {
    console.log("❌ No documents with embeddings found.");
  }

  await client.close();
}

check();

