const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing video URL' });

  // Simulated response for now
  return res.json({
    transcript: "Surfing in Nazaré changed my life—it’s unreal...",
    emotion: "passionate",
    tone: "authentic",
    topic: "travel",
    suggestion: "Why not host a sunset supper club on Nazaré’s beach?",
    sentiment: "positive",
    matchedTags: ["adventure", "retreats", "Portugal"],
    earnings: "Potential Earnings: €1,800 (estimate after fees)"
  });
});

module.exports = router;

