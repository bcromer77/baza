// server/services/whisperService.js
const Transcript = require('../models/Transcript');
const path = require('path');

// Import analyzer and (stubbed or real) transcriber
const analyzeChunk = require(path.resolve(__dirname, '../../prism/analyzeTranscript'));

// Placeholder transcribe function — replace later with Whisper logic
const transcribeVideo = async (url) => {
  return `Sample transcript text for video at ${url}`;
};

exports.batchTranscribe = async (req, res) => {
  try {
    const { creatorId, videoUrls } = req.body;

    if (!creatorId || !Array.isArray(videoUrls)) {
      return res.status(400).json({ error: 'Missing creatorId or videoUrls[]' });
    }

    const results = [];

    for (const url of videoUrls.slice(0, 50)) {
      const transcript = await transcribeVideo(url);
      const analysis = analyzeChunk(transcript);

      const saved = await Transcript.create({
        creatorId,
        url,
        transcript,
        analysis,
        createdAt: new Date()
      });

      results.push(saved);
    }

    res.status(200).json({
      message: '✅ Transcription + analysis complete',
      transcripts: results
    });

  } catch (err) {
    console.error('❌ Whisper batch error:', err);
    res.status(500).json({ error: 'Batch transcription failed', details: err.message });
  }
};
