const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

router.get('/creator/:id/audits', async (req, res) => {
  const mongo = new MongoClient(uri);
  await mongo.connect();
  const db = mongo.db("audiantix");
  const audits = await db.collection("audits")
    .find({ creator_id: req.params.id })
    .sort({ createdAt: -1 }).toArray();
  res.json(audits);
});

module.exports = router;

