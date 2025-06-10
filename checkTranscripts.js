import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.DB_NAME || "audiantix");
const transcripts = db.collection("transcripts");

const run = async () => {
  await client.connect();
  const docs = await transcripts.find({}).toArray();

  console.log("🧾 Transcript Check:");
  docs.forEach((doc, i) => {
    const preview = doc.embedding?.slice(0, 5)?.map(n => n.toFixed(3)).join(", ");
    const vectorStatus = doc.embedding?.length === 1536
      ? `✅ vector OK (${doc.embedding.length})`
      : `⚠️ missing or invalid`;

    console.log(`\n${i + 1}: ${doc.text}`);
    console.log(`   📏 ${vectorStatus}`);
    if (preview) console.log(`   🔍 ${preview}`);
  });

  await client.close();
};

run();

