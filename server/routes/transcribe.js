const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const Transcript = require('../models/Transcript');

router.post('/', async (req, res) => {
  try {
    const { creatorId, videoUrls } = req.body;

    if (!creatorId || !videoUrls || !Array.isArray(videoUrls) || videoUrls.length === 0) {
      return res.status(400).json({ success: false, message: 'Missing creatorId or videoUrls' });
    }

    const videoUrl = videoUrls[0];
    const outputPath = path.join(__dirname, '../../temp_audio.mp3');

    console.log(`🎬 Starting transcription for: ${videoUrl}`);

    // Step 1: Download audio using yt-dlp
    const ytdlp = spawn('yt-dlp', [
      '-x',
      '--audio-format', 'mp3',
      '-o', outputPath,
      videoUrl,
    ]);

    ytdlp.stderr.on('data', data => console.error(`📦 yt-dlp stderr: ${data}`));

    ytdlp.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ success: false, message: 'Audio extraction failed' });
      }

      // Step 2: Transcribe with Python + Whisper
      const whisper = spawn('python3', ['scripts/transcribe.py', outputPath]);

      let transcriptData = '';
      whisper.stdout.on('data', data => transcriptData += data.toString());
      whisper.stderr.on('data', data => console.error(`🐍 Whisper stderr: ${data}`));

      whisper.on('close', async (code) => {
        if (code !== 0 || !transcriptData) {
          return res.status(500).json({ success: false, message: 'Transcription failed' });
        }

        const lines = transcriptData.split('\n').map(line => line.trim()).filter(Boolean);

        const newTranscript = new Transcript({
          creatorId,
          videoUrl,
          lines,
          raw: transcriptData,
          createdAt: new Date(),
        });

        await newTranscript.save();

        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

        res.status(200).json({ success: true, transcript: lines });
      });
    });

  } catch (err) {
    console.error('❌ Transcription server error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;

