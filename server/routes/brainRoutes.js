// routes/brainRoutes.js

const express = require('express');
const router = express.Router();
const Transcript = require('../models/Transcript');
const { analyzeChunk } = require('../utils/analyzeTranscript');

// POST /api/brain/analyze
router.post('/analyze', async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript) {
      return res.status(400).json({ success: false, message: 'Transcript is required' });
    }

    const insights = transcript.split('\n').map(analyzeChunk);

    res.status(200).json({ success: true, insights });
  } catch (err) {
    console.error('🧠 Brain analysis error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
