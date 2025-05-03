require('dotenv').config(); // 

const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
// 🔐 Securely pull Mongo URI from .env
const uri = process.env.MONGODB_URI;

// Debug: Log the URI to verify it's being loaded
console.log('MONGODB_URI:', process.env.MONGODB_URI);

if (!uri) {
  console.error('❌ MONGODB_URI is not defined in .env file');
  process.exit(1);
}

// Load Phyllo API credentials from .env
const PHYLLO_CLIENT_ID = process.env.PHYLLO_CLIENT_ID;
const PHYLLO_SECRET_KEY = process.env.PHYLLO_SECRET_KEY;
const PHYLLO_API_URL = 'https://api.sandbox.getphyllo.com';

if (!PHYLLO_CLIENT_ID || !PHYLLO_SECRET_KEY) {
  console.error('❌ PHYLLO_CLIENT_ID or PHYLLO_SECRET_KEY is not defined in .env file');
  process.exit(1);
}

const client = new MongoClient(uri);

app.use(express.json());
app.use(cors());

async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    return client.db('creator-torch');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
}

async function createPhylloUser(userId) {
  const response = await axios.post(
    `${PHYLLO_API_URL}/v1/users`,
    {
      external_id: userId,
      name: userId,
    },
    {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${PHYLLO_CLIENT_ID}:${PHYLLO_SECRET_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.id;
}

async function getPhylloToken(userId) {
  const response = await axios.post(
    `${PHYLLO_API_URL}/v1/sdk-tokens`,
    {
      user_id: userId,
      products: ['IDENTITY', 'IDENTITY.AUDIENCE', 'ENGAGEMENT'],
    },
    {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${PHYLLO_CLIENT_ID}:${PHYLLO_SECRET_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.sdk_token;
}

async function fetchCreatorData(userId) {
  try {
    const tokenResponse = await axios.get(
      `${PHYLLO_API_URL}/v1/sdk-tokens?user_id=${userId}`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${PHYLLO_CLIENT_ID}:${PHYLLO_SECRET_KEY}`).toString('base64')}`,
        },
      }
    );
    const token = tokenResponse.data.data[0]?.token;

    if (!token) throw new Error('No SDK token found');

    const response = await axios.get(`${PHYLLO_API_URL}/v1/accounts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const account = response.data.data[0] || {};
    return {
      followers: account.followers_count || 1000,
      topVideoViews: account.content?.[0]?.views || 5000,
      platform: account.platform_name || 'youtube',
    };
  } catch (error) {
    console.error('Phyllo fetch error:', error.response?.data || error.message);
    return null;
  }
}

async function preloadData() {
  const db = await connectDB();
  const gigs = db.collection('gigs');
  await gigs.deleteMany({});
  await gigs.insertMany([
    { gigId: 'surfco', name: '@SurfCo', description: 'Promote our surfboards—$5K offer', type: 'brand', timestamp: new Date() },
    { gigId: 'visitportugal', name: 'Visit Portugal', description: 'Showcase Nazaré waves—$10K campaign', type: 'agency', timestamp: new Date() },
  ]);
}

app.post('/signup', async (req, res) => {
  const { platform, handle, email, consent } = req.body;
  const db = await connectDB();
  const creators = db.collection('creators');

  let creatorData = {
    platform,
    handle,
    email: require('crypto').createHash('sha256').update(email).digest('hex'),
    consent,
    followers: 1000,
    topVideoViews: 5000,
  };

  try {
    const userId = await createPhylloUser(handle);
    creatorData.userId = userId;

    const sdkToken = await getPhylloToken(userId);
    creatorData.sdkToken = sdkToken;

    if (consent) {
      const liveData = await fetchCreatorData(userId);
      creatorData = {
        ...creatorData,
        followers: liveData ? liveData.followers : 2000000,
        topVideoViews: liveData ? liveData.topVideoViews : 500000,
        platform: liveData ? liveData.platform : platform,
      };
    }
  } catch (error) {
    console.error('Phyllo signup error:', error.response?.data || error.message);
  }

  await creators.insertOne(creatorData);
  res.json({ success: true, handle, userId: creatorData.userId, sdkToken: creatorData.sdkToken });
});

app.post('/agency-signup', async (req, res) => {
  const { name, email, consent } = req.body;
  const db = await connectDB();
  const agencies = db.collection('agencies');
  await agencies.insertOne({ name, email: require('crypto').createHash('sha256').update(email).digest('hex'), consent });
  res.json({ success: true, name });
});

app.post('/apply', async (req, res) => {
  const { creatorHandle, gigId } = req.body;
  const db = await connectDB();
  const applications = db.collection('applications');
  await applications.insertOne({ creatorHandle, gigId, status: 'pending', timestamp: new Date() });
  res.json({ success: true });
});

app.get('/creator/:handle', async (req, res) => {
  const { handle } = req.params;
  const db = await connectDB();
  const creators = db.collection('creators');
  const creator = await creators.findOne({ handle });
  res.json(creator || { error: 'Creator not found' });
});

// Temporary endpoint to match frontend expectations
app.get('/api/creators/:id/dashboard', async (req, res) => {
  res.json({
    audienceInsights: [
      {
        geography: { Portugal: 60 },
        intent: { Health: 45 },
        behavior: { Engaged: 70 },
        engagementTimes: { peak: '18:00-20:00' },
        sentiment: { Ozempic: { sentiment: 'Positive', score: 0.8 } },
      },
    ],
    monetizationPrompts: [{ text: 'Create a post about Ozempic' }],
    brandOffers: [
      { id: 1, brand: 'Lumi', offer: 'Lisbon Brunch Collab' },
      { id: 2, brand: 'Ozempic', offer: 'Trend Series, €7K' },
      { id: 3, brand: 'EcoBrand', offer: 'Galway Eco Routine, €3K' },
    ],
  });
});

app.post('/api/creators/:id/query', async (req, res) => {
  res.json({
    matches: 1500,
    totalAudience: 20000,
  });
});

app.post('/api/brands/search', async (req, res) => {
  res.json([
    {
      handle: 'Creator1',
      location: 'Portugal',
      audienceSize: 25000,
      matchPercentage: 85,
      sentiment: { Ozempic: { sentiment: 'Positive' } },
    },
    {
      handle: 'Creator2',
      location: 'Portugal',
      audienceSize: 30000,
      matchPercentage: 90,
      sentiment: { Ozempic: { sentiment: 'Neutral' } },
    },
  ]);
});

// Boot the server + seed data
preloadData().then(() => {
  app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
});