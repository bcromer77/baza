const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const authMiddleware = require('../middleware/auth');
const { createStripeSubscription } = 
require('../services/paymentService');

router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const subscription = await 
Subscription.findActiveSubscription(req.params.userId);
    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' 
});
    }
    res.json({ subscription });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

router.post('/subscribe', authMiddleware, async (req, res) => {
  const { userId, userType, plan } = req.body;
  try {
    const stripeSubscription = await createStripeSubscription(userId, 
plan);
    const subscription = await Subscription.createSubscription(userId, 
userType, plan, stripeSubscription.id);
    res.status(201).json({ subscription });
  } catch (error) {
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

module.exports = router;

