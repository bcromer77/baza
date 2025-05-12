const express = require("express");
const router = express.Router();
const Transcript = require("../models/Transcript");

// ✨ Extract emotional + commercial themes from transcript
function extractThemes(text) {
  const themes = [];
  const lower = text.toLowerCase();

  if (lower.includes("moisturizer")) themes.push("beauty");
  if (lower.includes("spa") || lower.includes("pamper")) themes.push("spa");
  if (lower.includes("confidence")) themes.push("confidence");
  if (lower.includes("public speaking")) themes.push("speaking");
  if (lower.includes("lisbon")) themes.push("lisbon");
  if (lower.includes("retreat")) themes.push("retreat");
  if (lower.includes("healing")) themes.push("healing");
  if (lower.includes("self-love")) themes.push("self-love");
  if (lower.includes("burnout")) themes.push("wellness");
  if (lower.includes("surf")) themes.push("surf");

  return themes;
}

// 🎯 Main route to generate a smart event suggestion
router.get("/:creatorId", async (req, res) => {
  const { creatorId } = req.params;

  try {
    const transcript = await Transcript.findOne({ creatorId });
    if (!transcript) {
      return res.status(404).json({ error: "Transcript not found" });
    }

    const themes = extractThemes(transcript.content);

    // 🎨 Custom event title generation
    let title = "Creator Weekend Experience";
    if (themes.includes("confidence") && themes.includes("lisbon")) {
      title = "Confidence & Clarity Weekend · Lisbon";
    } else if (themes.includes("beauty") && themes.includes("spa")) {
      title = "Glow & Pamper Escape";
    } else if (themes.includes("healing")) {
      title = "Healing & Self-Love Retreat";
    } else if (themes.includes("speaking")) {
      title = "Find Your Voice Masterclass";
    }

    const suggestion = {
      title,
      quote: transcript.content.split(".")[0] || "Inspired by your recent video...",
      location: themes.includes("lisbon") ? "Lisbon" : "Your top location",
      payout: themes.includes("retreat") ? 850 : 450,
      qrUrl: `https://audiantix.com/events/${creatorId}-auto-event`,
      mobileOptimized: true,
      previewCTA: "Tap to share with your audience",
      eventImage: "https://cdn.audiantix.com/events/default-retreat-mobile.jpg",
      shareableLink: `https://audiantix.com/events/${creatorId}-auto-event`
    };

    res.json(suggestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate event suggestion" });
  }
});

module.exports = router;

