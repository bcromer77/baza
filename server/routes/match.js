const express = require('express');
const router = express.Router();
const { runPrismCampaignAgent } = require('../agents/prismCampaignAgent');

router.get('/:creatorId', async (req, res) => {
  try {
    const { creatorId } = req.params;
    const matches = await runPrismCampaignAgent(creatorId);
    res.json(matches);
  } catch (err) {
    console.error('Match error:', err);
    res.status(500).json({ error: 'Failed to match campaigns' });
  }
});

module.exports = router;

