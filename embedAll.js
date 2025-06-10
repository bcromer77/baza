import { MongoClient } from "mongodb";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("audiantix");
const transcripts = db.collection("transcripts");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embedAll() {
  await client.connect();
  const cursor = transcripts.find({ embedding: { $exists: false } });

  for await (const doc of cursor) {
    const inputText = doc.text;
    if (!inputText) continue;

    const embeddingRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: inputText
    });

    const embedding = embeddingRes.data[0].embedding;

    await transcripts.updateOne(
      { _id: doc._id },
      { $set: { embedding } }
    );

    console.log(`✅ Embedded: ${doc._id}`);
  }

  await client.close();
}

embedAll();

