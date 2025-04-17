// server/routes/transcribe.js
const express = require('express');
const router = express.Router();
const whisper = require('../services/whisper');
const Transcript = require('../models/Transcript');
const { analyzeChunk } = require('../utils/analyzeTranscript');

router.post('/', async (req, res) => {
  const { creatorId, videoUrls } = req.body;

  try {
    if (!videoUrls || videoUrls.length === 0) {
      return res.status(400).json({ success: false, message: 'No video 
URLs provided.' });
    }

    // Transcribe each video
    const results = [];

    for (const videoUrl of videoUrls) {
      const transcriptLines = await whisper.transcribeVideo(videoUrl);
      const analyzedLines = transcriptLines.map((line) => {
        const { emotion, triggers, suggestion } = analyzeChunk(line);
        return { text: line, emotion, triggers, suggestion };
      });
      results.push({ videoUrl, analyzedLines });
    }

    // Save to MongoDB
    const saved = await Transcript.create({
      creatorId,
      videoUrls,
      results,
    });

    res.status(200).json({ success: true, transcripts: results });
  } catch (err) {
    console.error('Transcription failed', err);
    res.status(500).json({ success: false, message: 'Transcription failed' 
});
  }
});

module.exports = router;

