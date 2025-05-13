
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { analyzeVideoContent } = require('../services/auditService');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("❌ MONGODB_URI is not defined");

router.post('/', async (req, res) => {
  const { client, platform, user, video_id, videoTitle, videoDescription, hashtags } = req.body;

  console.log("🧠 POST /api/audit received:", req.body);

  if (!client || !platform || !video_id) {
    return res.status(400).json({ error: "Missing required fields: client, platform, video_id" });
  }

  try {
    const mongo = new MongoClient(uri);
    await mongo.connect();
    const db = mongo.db("audiantix");
    const audits = db.collection("audits");

    const video = {
      creator_id: user || "unknown_creator",
      video_id,
      title: videoTitle,
      description: videoDescription,
      hashtags,
      platform
    };

    const auditData = await analyzeVideoContent(video);

    await audits.insertOne({
      ...auditData,
      client,
      createdAt: new Date()
    });

    console.log("✅ Audit saved for", auditData.creator_id);
    res.status(200).json({ message: "Audit completed", ...auditData });

  } catch (err) {
    console.error("❌ Audit error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

