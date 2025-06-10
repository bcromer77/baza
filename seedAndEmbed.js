import { MongoClient } from "mongodb";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.DB_NAME || "audiantix");
const transcripts = db.collection("transcripts");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const transcriptExamples = [
  "I just landed in Lisbon for a solo surf retreat. Nazaré is incredible — giant waves, slow mornings, and daily journaling. A perfect reset from burnout.",
  "I'm hosting a Portugal surf retreat in Q3. It's all about creative reset for women — surfing, sisterhood, and sunshine.",
  "Big response to my Bali yoga retreat vlog. People loved the mindfulness, the group journaling, and the quiet detox vibe.",
  "My podcast covers burnout recovery, emotional healing, and travel-based resets. Lisbon and Bali both come up often.",
  "Audience keeps asking about solo travel tips for women. I tell them Lisbon is underrated — peaceful and empowering.",
  "Launching a new newsletter for creative mothers. Topics include journaling rituals, gentle travel, and community building.",
  "Our London vlog hit 40k views — brunch, beauty haul, and a candid talk on mental health. These posts really resonate.",
  "Planning a digital detox event this summer. No phones, just waves, notebooks, and campfire talks by the coast.",
  "Hosting a workshop on self-esteem through art and movement. Location still TBD — maybe Portugal?",
  "Lisbon has been magical. The surfing scene is perfect for beginners, and the local wellness culture feels really authentic."
];

async function seedAndEmbed() {
  await client.connect();
  await transcripts.deleteMany({}); // Clear old data

  for (const text of transcriptExamples) {
    const embeddingRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text
    });

    const embedding = embeddingRes.data[0].embedding;

    if (embedding.length !== 1536) {
      console.error("❌ Invalid embedding length:", embedding.length);
      continue;
    }

    await transcripts.insertOne({ text, embedding });
    console.log(`✅ Inserted & embedded: "${text.slice(0, 40)}..."`);
    console.log(`   🔍 Vector preview: ${embedding.slice(0, 5).map(x => x.toFixed(3)).join(", ")}`);
  }

  console.log("🏁 All transcripts seeded with OpenAI embeddings.");
  await client.close();
}

seedAndEmbed();

