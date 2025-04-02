// pages/api/signup.js

import { MongoClient } from 'mongodb';
import crypto from 'crypto';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  try {
    await client.connect();
    const db = client.db('creatortorch');
    const collection = db.collection('creators');

    const { platform, handle, email, consent } = req.body;

    await collection.insertOne({
      platform,
      handle,
      email: crypto.createHash('sha256').update(email).digest('hex'),
      consent,
      followers: handle === 'Gigantes de Nazaré' ? 2000000 : Math.floor(Math.random() * 10000) + 2000,
      mentions: [{ text: `${handle} loves ${platform}`, timestamp: new Date() }],
      engagement: { likes: handle === 'Gigantes de Nazaré' ? 50000 : 500, comments: handle === 'Gigantes de Nazaré' ? 2000 : 50 },
      audience: { size: handle === 'Gigantes de Nazaré' ? 1800000 : 5000 },
      views: handle === 'Gigantes de Nazaré' ? 5 : 2,
    });

    res.status(200).json({ success: true, handle });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
