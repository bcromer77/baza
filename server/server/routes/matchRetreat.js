const express = require("express");
const router = express.Router();

// ✅ Import with full path and extension (required in Node.js v22+)
const { matchCreatorsToRetreat } = require("../services/matchRetreatService.js");

router.post("/", async (req, res) => {
  const { location, month, intent } = req.body;

  // Basic input validation
  if (!location || !month || !intent) {
    return res.status(400).json({ error: "Missing location, month, or intent" });
  }

  try {
    // Call the matching logic
    const results = await matchCreatorsToRetreat({ location, month, intent });
    res.status(200).json({ creators: results });
  } catch (err) {
    console.error("Dream Matchmaker error:", err);
    res.status(500).json({ error: "Dream matchmaker failed" });
  }
});

module.exports = router;

