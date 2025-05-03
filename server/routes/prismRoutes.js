const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { OwlSearch } = require('../services/owlService');

router.post('/search', authMiddleware, async (req, res) => {
  const { queryInput, userId, role, userLanguage, eventId } = req.body;
  try {
    const results = await OwlSearch({ queryInput, userId, role, 
userLanguage, eventId });
    res.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search for creators' });
  }
});

module.exports = router;
