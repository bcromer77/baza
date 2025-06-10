import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import analyzeText from './sentimentEngine.js'; // We'll create this next

dotenv.config();
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.DB_NAME || 'audiantix');
const posts = db.collection('creator_posts');

const analyzePostsForSentiment = async (creatorId) => {
  await client.connect();

  const entries = await posts.find({ creatorId, sentiment: null }).toArray();

  for (const post of entries) {
    const sentiment = analyzeText(post.caption || '');
    await posts.updateOne(
      { _id: post._id },
      { $set: { sentiment } }
    );
    console.log(`🧠 Analyzed: "${post.caption.slice(0, 30)}..." → ${sentiment}`);
  }

  await client.close();
};

export default analyzePostsForSentiment;

