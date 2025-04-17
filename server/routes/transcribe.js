const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const Transcript = require('../models/Transcript');
const fs = require('fs');
const path = require('path');

router.post('/', async (req, res) => {
  try {
    const { creatorId, videoUrls } = req.body;

    if (!creatorId || !videoUrls || !Array.isArray(videoUrls) || 
videoUrls.length === 0) {
      return res.status(400).json({ success: false, message: 'Missing 
creatorId or video URLs' });
    }

    const videoUrl = videoUrls[0];
    const outputPath = path.join(__dirname, '../../temp_audio.mp3');

    const python = spawn('python3', ['scripts/transcribe.py', 
videoUrl]);

    let transcriptData = '';

    python.stdout.on('data', (data) => {
      transcriptData += data.toString();
    });

    python.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    python.on('close', async (code) => {
      console.log(`Python script exited with code ${code}`);

      const lines = transcriptData
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);

      const newTranscript = new Transcript({
        creatorId,
        videoUrl,
        lines,
        raw: transcriptData,
        createdAt: new Date()
      });

      await newTranscript.save();

      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

      res.status(200).json({ success: true, transcripts: lines });
    });
  } catch (err) {
    console.error('Transcription failed:', err);
    res.status(500).json({ success: false, message: 'Transcription 
failed' });
  }
});

module.exports = router;
const 
express = 
require('express');
const router = express.Router();
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const Transcript = require('../models/Transcript'); // Ensure this 
model exists

router.post('/', async (req, res) => {
  try {
    const { creatorId, videoUrls } = req.body;

    if (!creatorId || !videoUrls || !videoUrls.length) {
      return res.status(400).json({ success: false, message: 'No 
video URLs or creator ID provided' });
    }

    const videoUrl = videoUrls[0]; // Handle first video only for now
    const outputPath = path.join(__dirname, '../../temp_audio.mp3');

    // Step 1: Use yt-dlp to extract audio
    const ytdlp = spawn('yt-dlp', [
      '-x',
      '--audio-format', 'mp3',
      '-o', outputPath,
      videoUrl,
    ]);

    ytdlp.stderr.on('data', data => console.error(`yt-dlp stderr: 
${data}`));
    ytdlp.on('close', async (code) => {
      if (code !== 0) {
        return res.status(500).json({ success: false, message: 'Audio 
extraction failed' });
      }

      // Step 2: Call Python Whisper script
      const whisper = spawn('python3', 
['server/scripts/transcribe.py', outputPath]);
      let transcriptData = '';

      whisper.stdout.on('data', data => transcriptData += 
data.toString());
      whisper.stderr.on('data', data => console.error(`whisper 
stderr: ${data}`));

      whisper.on('close', async (code) => {
        if (code !== 0) {
          return res.status(500).json({ success: false, message: 
'Transcription failed' });
        }

        const lines = transcriptData
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean);

        const newTranscript = new Transcript({
          creatorId,
          lines,
          sourceUrl: videoUrl,
          createdAt: new Date(),
        });

        await newTranscript.save();

        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

        res.status(200).json({ success: true, transcripts: lines });
      });
    });
  } catch (err) {
    console.error('Transcription failed:', err);
    res.status(500).json({ success: false, message: 'Transcription 
failed' });
  }
});

module.exports = router;
const 
express = 
require('express');
const router = express.Router();
const { spawn } = require('child_process');
const Transcript = require('../models/Transcript');
const fs = require('fs');

router.post('/', async (req, res) => {
  try {
    const { creatorId, videoUrls } = req.body;
    if (!creatorId || !videoUrls || !videoUrls.length) {
      return res.status(400).json({ success: false, message: 'No 
video URLs or creator ID provided' });
    }

    const python = spawn('python3', ['scripts/transcribe.py', 
videoUrls[0]]);
    let transcriptData = '';

    python.stdout.on('data', (data) => {
      transcriptData += data.toString();
    });

    python.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    python.on('close', async (code) => {
      console.log(`Python script exited with code ${code}`);

      // Optional: basic cleanup of transcript
      const cleaned = transcriptData
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);

      const savedTranscript = new Transcript({
        creatorId,
        lines: cleaned,
        sourceUrl: videoUrls[0],
        createdAt: new Date(),
      });

      await savedTranscript.save();

      // Placeholder for outputPath - replace with actual path
      const outputPath = 'path/to/temporary/file'; // Replace with 
the actual path used by transcribe.py
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }

      res.status(200).json({ success: true, transcripts: cleaned });
    });
  } catch (err) {
    console.error('Transcription failed', err);
    res.status(500).json({ success: false, message: 'Transcription 
failed' });
  }
});

module.exports = router;nconst 
express 
= 
require('express');
const router = express.Router();
const { spawn } = require('child_process');
const Transcript = require('../models/Transcript'); // Make sure this 
model exists

router.post('/', async (req, res) => {
  try {
    const { creatorId, videoUrls } = req.body;
    if (!creatorId || !videoUrls || !videoUrls.length) {
      return res.status(400).json({ success: false, message: 'No video 
URLs or creator ID provided' });
    }

    const python = spawn('python3', ['scripts/transcribe.py', 
videoUrls[0]]);
    let transcriptData = '';

    python.stdout.on('data', (data) => {
      transcriptData += data.toString();
    });

    python.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    python.on('close', async (code) => {
      console.log(`Python script exited with code ${code}`);

      // Optional: basic cleanup of transcript
      const cleaned = transcriptData
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);

      const savedTranscript = new Transcript({
        creatorId,
        lines: cleaned,
        sourceUrl: videoUrls[0],
        createdAt: new Date(),
      });

      await savedTranscript.save();

      res.json({ success: true, transcripts: cleaned });
    });
  } catch (err) {
    console.error('Transcription failed', err);
    res.status(500).json({ success: false, message: 'Transcription 
failed' });
  }
});

module.exports = router;st express = 
require('express');
const router = express.Router();
const { spawn } = require('child_process');
const Transcript = require('../models/Transcript'); // Make sure this 
model exists

router.post('/', async (req, res) => {
  try {
    const { creatorId, videoUrls } = req.body;
    if (!creatorId || !videoUrls || !videoUrls.length) {
      return res.status(400).json({ success: false, message: 'No video 
URLs or creator ID provided' });
    }

    const python = spawn('python3', ['scripts/transcribe.py', 
videoUrls[0]]);
    let transcriptData = '';

    python.stdout.on('data', (data) => {
      transcriptData += data.toString();
    });

    python.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    python.on('close', async (code) => {
      console.log(`Python script exited with code ${code}`);

      // Optional: basic cleanup of transcript
      const cleaned = transcriptData
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);

      const savedTranscript = new Transcript({
        creatorId,
        lines: cleaned,
        sourceUrl: videoUrls[0],
        createdAt: new Date(),
      });

      await savedTranscript.save();

      res.json({ success: true, transcripts: cleaned });
    });
  } catch (err) {
    console.error('Transcription failed', err);
    res.status(500).json({ success: false, message: 'Transcription 
failed' });
  }
});

module.exports = router;
// 
server/routes/transcribe.js
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

const express = require('express');
const router = express.Router();
const yt_dlp = require('yt-dlp-exec');
const fs = require('fs');
const path = require('path');
const whisper = require('whisper-node'); // assumed custom wrapper
const { Transcript } = require('../models/Transcript'); // adjust if your 
model path is different

router.post('/', async (req, res) => {
  const { creatorId, videoUrls } = req.body;

  if (!videoUrls || !Array.isArray(videoUrls) || videoUrls.length === 0) {
    return res.status(400).json({ success: false, message: 'No video URLs 
provided' });
  }

  try {
    const results = [];

    for (const url of videoUrls) {
      const outputPath = path.resolve(__dirname, '../../temp_audio.mp3');

      // Download using yt-dlp
      await yt_dlp(url, {
        extractAudio: true,
        audioFormat: 'mp3',
        output: outputPath,
        quiet: true
      });

      // Transcribe with whisper (replace this with your actual function)
      const whisperModel = require('whisper').loadModel('base');
      const result = await whisperModel.transcribe(outputPath);

      const transcriptLines = result.text.split('. ').map(line => 
line.trim()).filter(Boolean);

      // Store in DB
      const transcript = new Transcript({
        creatorId,
        videoUrl: url,
        lines: transcriptLines,
        raw: result.text,
        createdAt: new Date()
      });

      await transcript.save();
      results.push(...transcriptLines);

      // Clean up
      fs.unlinkSync(outputPath);
    }

    res.status(200).json({ success: true, transcripts: results });
  } catch (err) {
    console.error('Transcription failed', err);
    res.status(500).json({ success: false, message: 'Transcription failed' 
});
  }
});

module.exports = router;

