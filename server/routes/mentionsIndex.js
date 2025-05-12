const express = require("express");
const router = express.Router();
const Transcript = require("../models/Transcript");

// Helper: count keyword mentions in a text
function countMentions(text, keywords) {
  const lower = text.toLowerCase();
  const counts = {};

  for (const keyword of keywords) {
    const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, "g");
    const match = lower.match(regex);
    counts[keyword] = match ? match.length : 0;
  }

  return counts;
}

// GET /api/mentions-index?topics=confidence,retreat,yoga
router.get("/mentions-index", async (req, res) => {
  const rawTopics = req.query.topics;
  if (!rawTopics) return res.status(400).json({ error: "Missing 'topics' query param" });

  const topics = rawTopics.split(",").map((t) => t.trim().toLowerCase());
  const index = {};

  try {
    const transcripts = await Transcript.find({});

    for (const transcript of transcripts) {
      const counts = countMentions(transcript.content || "", topics);
      for (const topic of topics) {
        if (!index[topic]) index[topic] = 0;
        index[topic] += counts[topic] || 0;
      }
    }

    const sorted = Object.entries(index)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {});

    res.json({ index: sorted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compute topic index" });
  }
});

module.exports = router;

