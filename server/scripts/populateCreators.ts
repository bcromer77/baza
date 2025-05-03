import mongoose from 'mongoose';
import 'dotenv/config';
import axios from 'axios';
import CreatorAccount from '../../models/CreatorAccount';

const PHYLLO_BASE = 'https://api.sandbox.getphyllo.com/v1';

const headers = {
  'Content-Type': 'application/json',
  'phyllo-client-id': process.env.PHYLLO_CLIENT_ID!,
  'phyllo-secret': process.env.PHYLLO_SECRET_KEY!,
};

async function fetchCreators() {
  const response = await axios.get(`${PHYLLO_BASE}/profiles`, { headers 
});
  return response.data.data;
}

async function enrichAndStore(profile: any) {
  const creatorDoc = {
    phylloId: profile.id,
    name: profile.name || '',
    email: profile.email || '',
    audience_geography: profile.audience?.geography || [],
    audience_size: profile.audience?.total_followers || 0,
    engagement_rate: profile.metrics?.engagement_rate || 0,
    location: profile.location || 'unknown',
    platform: profile.platform || 'unknown',
    createdAt: new Date(),
  };

  await CreatorAccount.findOneAndUpdate(
    { phylloId: profile.id },
    creatorDoc,
    { upsert: true }
  );
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!);
  const creators = await fetchCreators();
  for (const profile of creators) {
    await enrichAndStore(profile);
  }
  await mongoose.disconnect();
}

run();

