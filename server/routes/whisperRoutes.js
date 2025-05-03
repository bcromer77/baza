const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ success: true, message: '🔥 Whisper route is working!' });
});

// Batch transcribe route
router.post('/batch-transcribe', (req, res) => {
  const { creatorId, videoUrls } = req.body;

  // Basic validation
  if (!creatorId || !videoUrls || !Array.isArray(videoUrls)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request: creatorId and videoUrls array are required',
    });
  }

  res.json({
    success: true,
    message: 'Transcription request received',
    data: {
      creatorId,
      videoUrls,
      status: 'queued',
    },
  });
});

module.exports = router;