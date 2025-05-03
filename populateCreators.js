const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

// Adjust path as needed — this expects models/CreatorAccount.ts to be 
compiled to JS
const CreatorAccount = require('../../models/CreatorAccount').default;

const PHYLLO_BASE = 'https://api.sandbox.getphyllo.com/v1';
const headers = {
  'Content-Type': 'application/json',
  'phyllo-client-id': process.env.PHYLLO_CLIENT_ID,
  'phyllo-secret': process.env.PHYLLO_SECRET_KEY,
};

async function fetchProfiles() {
  try {
    const res = await axios.get(`${PHYLLO_BASE}/profiles`, { headers });
    return res.data.data;
  } catch (err) {
    console.error('❌ Error fetching profiles:', err.message);
    return [];
  }
}

async function storeProfile(profile) {
  try {
    const doc = {
      user_id: profile.user_id || '',
      account_id: profile.account_id || '',
      work_platform_id: profile.work_platform_id || '',
      connected_at: profile.connected_at ? new Date(profile.connected_at) 
: new Date(),
      status: profile.status || '',
    };

    await CreatorAccount.findOneAndUpdate(
      { account_id: doc.account_id },
      doc,
      { upsert: true, new: true }
    );

    console.log(`✅ Synced: ${doc.account_id}`);
  } catch (err) {
    console.error(`❌ Failed to store profile ${profile.account_id}:`, 
err.message);
  }
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const profiles = await fetchProfiles();
    for (const profile of profiles) {
      await storeProfile(profile);
    }

    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Script error:', err.message);
  }
}

run();

