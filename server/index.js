const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const PHYLLO_CLIENT_ID = '468269e2-08c6-48ff-8109-54c043f793c3';
const PHYLLO_SECRET_KEY = 'a680f321-7ca0-43f0-b45a-94061a774654';
const PHYLLO_API_URL = 'https://api.sandbox.getphyllo.com';

app.use(express.json());
app.use(cors());

async function connectDB() {
  await client.connect();
  return client.db('creatortorch');
}

async function createPhylloUser(userId) {
  const response = await axios.post(
    `${PHYLLO_API_URL}/v1/users`,
    {
      external_id: userId,
      name: userId, // Use handle as name
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
    return null; // Fallback to mock
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
    followers: 1000, // Default mock
    topVideoViews: 5000,
  };

  try {
    // Create a user in Phyllo
    const userId = await createPhylloUser(handle);
    creatorData.userId = userId;

    // Generate SDK token
    const sdkToken = await getPhylloToken(userId);
    creatorData.sdkToken = sdkToken;

    // Fetch live data from Phyllo
    if (consent) {
      const liveData = await fetchCreatorData(userId);
      creatorData = {
        ...creatorData,
        followers: liveData ? liveData.followers : 2000000, // Gigantes fallback
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

preloadData().then(() => {
  app.listen(3000, () => console.log('Server on port 3000'));
});