const express = require('express');
const router = express.Router();
const matchingService = require('../services/matchingService');

router.post('/search', async (req, res) => {
  try {
    const matches = await matchingService.matchCreators(req.body);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
