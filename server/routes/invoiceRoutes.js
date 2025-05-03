const express = require('express');
const router = express.Router();
const generateInvoicePDF = require('../utils/pdfGenerator');

// POST /api/invoice/create
router.post('/create', async (req, res) => {
  try {
    const { creatorId, brandId, amount, creatorName, brandName, items } = req.body;

    if (!creatorId || !brandId || !amount || !creatorName || !brandName || !items) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 1. Generate PDF
    const invoiceUrl = generateInvoicePDF({
      creatorName,
      brandName,
      items,
      amount,
    });

    // 2. Respond with URL (no email for now)
    res.status(200).json({
      message: '✅ Invoice created successfully (email not sent)',
      invoiceUrl,
    });

  } catch (err) {
    console.error('❌ Invoice error:', err);
    res.status(500).json({ error: 'Invoice creation failed', details: err.message });
  }
});

module.exports = router;
