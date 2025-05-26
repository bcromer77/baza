const express = require("express");
const router = express.Router();
const { matchCreatorsToRetreat } = require("../services/matchRetreatService");

router.post("/", async (req, res) => {
  const { location, month, intent } = req.body;

  if (!location || !month || !intent) {
    return res.status(400).json({ error: "Missing location, month, or intent" });
  }

  try {
    const results = await matchCreatorsToRetreat({ location, month, intent });
    res.status(200).json({ creators: results });
  } catch (err) {
    console.error("Dream matchmaker failed:", err);
    res.status(500).json({ error: "Dream matchmaker failed" });
  }
});

module.exports = router;

