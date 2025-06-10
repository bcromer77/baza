import express from "express";
import { searchTranscript } from "../../prism/searchTranscript.js";

const router = express.Router();

router.post("/match", async (req, res) => {
  try {
    const { prompt, topK = 5 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const results = await searchTranscript(prompt, topK);
    return res.json(results);
  } catch (err) {
    console.error("❌ Match API error:", err.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;

