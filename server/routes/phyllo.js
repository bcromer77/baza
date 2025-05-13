const express = require('express');
const axios = require('axios');
const router = express.Router();
const { MongoClient } = require('mongodb');

require('dotenv').config({ path: '.env.local' });

const MONGO_URI = process.env.MONGODB_URI;

router.post('/exchange', async (req, res) => {
  const { code } = req.body;

  try {
    const tokenRes = await axios.post('https://api.sandbox.getphyllo.com/v1/token', {
      client_id: process.env.PHYLLO_CLIENT_ID,
      client_secret: process.env.PHYLLO_SECRET_KEY,
      code,
    });

    const { user_id, access_token } = tokenRes.data;

    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db();
    await db.collection('creators').insertOne({
      phyllo_user_id: user_id,
      access_token,
      connected_at: new Date(),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Exchange error:', err.response?.data || err);
    res.status(500).json({ error: 'Token exchange failed' });
  }
});

module.exports = router;

