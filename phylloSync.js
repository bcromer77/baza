import axios from 'axios';
import dotenv from 'dotenv';
import { connectMongo } from '../lib/mongo.js';

dotenv.config();

// --- Main Sync Function ---
const syncPhylloPosts = async ({ creatorId, accessToken }) => {
  const db = await connectMongo();
  const posts = db.collection('creator_posts');

  const { data } = await axios.get(
    `https://api.getphyllo.com/v1/posts?creator_id=${creatorId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  const entries = data?.data || [];

  for (const post of entries) {
    const formatted = {
      creatorId,
      phylloPostId: post.id,
      platform: post.account_type,
      caption: post.caption,
      timestamp: post.timestamp,
      media_url: post.media_urls?.[0] || null,
      sentiment: null
    };

    await posts.updateOne(
      { phylloPostId: post.id },
      { $set: formatted },
      { upsert: true }
    );

    console.log(`📥 Synced: ${formatted.platform} post (${formatted.caption?.slice(0, 40)}...)`);
  }
};

export default syncPhylloPosts;

