// server/routes/search.js
const express = require('express');
const router = express.Router();
const Creator = require('../models/creator'); // Assumes you have a 
Mongoose model set up

// Example route: GET /api/search?query=surf portugal
router.get('/', async (req, res) => {
  const { query } = req.query;

  if (!query) return res.status(400).json({ error: 'Missing query param' 
});

  try {
    const regex = new RegExp(query, 'i'); // case-insensitive search

    const matches = await Creator.find({
      $or: [
        { 'voiceHighlights.quote': regex },
        { 'voiceHighlights.topic': regex },
        { 'voiceHighlights.tone': regex },
        { 'voiceHighlights.sentiment': regex }
      ]
    });

    res.json(matches);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

