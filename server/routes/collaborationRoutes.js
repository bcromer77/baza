// server/routes/collaborationRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { createCollabCharge } = require('../services/paymentService');

router.post('/', authMiddleware, async (req, res) => {
  const { brandId, creatorId, eventId, eventName, proposedAmount, message 
} = req.body;
  try {
    // Store collaboration proposal
    const collab = await MongoDB.Collab.insert({
      brandId,
      creatorId,
      eventId,
      eventName,
      proposedAmount,
      message,
      status: 'pending',
      createdAt: new Date()
    });

    // Initiate payment (mock source for now; integrate Stripe Checkout in 
production)
    const charge = await createCollabCharge({
      amount: proposedAmount,
      currency: 'usd',
      source: 'mock_payment_method',
      destination: creatorId,
      commission: proposedAmount * 0.15 // 15% commission
    });

    await MongoDB.Collab.update(collab.id, { status: 'initiated', 
chargeId: charge.id });
...

Something went wrong, please refresh to reconnect or try again.
