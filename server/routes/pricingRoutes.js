const express = require('express');
const router = express.Router();
const Pricing = require('../models/Pricing');
const authMiddleware = require('../middleware/auth');

router.get('/influencer', authMiddleware, async (req, res) => {
  try {
    const pricing = await Pricing.findInfluencerPricing(req.user.userId);
    res.json({ pricing });
  } catch (error) {
    console.error('Pricing error:', error);
    res.status(500).json({ error: 'Failed to fetch pricing' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { hotelId, eventId, baseRate } = req.body;
  try {
    const pricing = await Pricing.createPricing(hotelId, eventId, 
baseRate);
    res.status(201).json(pricing);
  } catch (error) {
    console.error('Pricing creation error:', error);
    res.status(500).json({ error: 'Failed to create pricing' });
  }
});

module.exports = router;
