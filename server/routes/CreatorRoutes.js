const express = require('express');
const router = express.Router();
const Creator = require('../models/Creator');

// GET /api/creators - Test route
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Creator route is working!' });
});

// GET /api/creators/:id/dashboard
router.get('/:id/dashboard', async (req, res) => {
  try {
    const { id } = req.params;

    const creator = await Creator.findById(id);
    if (!creator) {
      return res.status(404).json({
        success: false,
        message: 'Creator not found',
      });
    }

    const dashboardData = {
      creatorId: creator._id,
      name: creator.name || 'Unknown',
      email: creator.email || 'N/A',
      videoCount: creator.videos ? creator.videos.length : 0,
      stats: creator.stats || { views: 0, subscribers: 0 },
    };

    res.json({
      success: true,
      message: 'Creator dashboard retrieved',
      data: dashboardData,
    });
  } catch (error) {
    console.error('Error fetching creator dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

module.exports = router;
