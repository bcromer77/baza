const express = require('express');
const router = express.Router();
const Transcript = require('../models/Transcript'); // Adjust if path differs

// GET /api/search?term=example
router.get('/', async (req, res) => {
  const term = req.query.term;

  if (!term || term.trim() === '') {
    return res.status(400).json({ success: false, message: 'Search term is required' });
  }

  try {
    const regex = new RegExp(term, 'i'); // case-insensitive
    const matches = await Transcript.find({ raw: regex }).limit(20);

    const results = matches.map(match => ({
      creatorId: match.creatorId,
      videoUrl: match.videoUrl,
      createdAt: match.createdAt,
      lines: match.lines.filter(line => line.includes(term)),
    }));

    res.status(200).json({ success: true, results });
  } catch (err) {
    console.error('❌ Search error:', err);
    res.status(500).json({ success: false, message: 'Search failed', error: err.message });
  }
});

module.exports = router;

