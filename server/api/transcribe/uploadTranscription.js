import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import runVisionModeration from '../../services/visionModeration.js';
import runWhisperTranscription from '../../services/whisperTranscribe.js';
import { connectMongo } from '../../lib/mongo.js';

dotenv.config();

const router = express.Router();

// TEMP STORAGE
const upload = multer({ dest: 'tmp_uploads/', limits: { fileSize: 500 * 1024 * 1024 } });

router.post('/', upload.single('file'), async (req, res) => {
  const { userId, videoTitle, videoId } = req.body;
  const filePath = req.file?.path;

  if (!filePath) return res.status(400).json({ error: 'File not uploaded' });

  try {
    // ✅ 1. Vision SafeSearch
    const isSafe = await runVisionModeration(filePath);
    if (!isSafe) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: 'Video failed moderation check' });
    }

    // ✅ 2. Whisper Transcription
    const { transcript, segments } = await runWhisperTranscription(filePath);

    // ✅ 3. Clean up file
    fs.unlinkSync(filePath);

    // ✅ 4. Save to MongoDB
    const db = await connectMongo();
    await db.collection('transcripts').insertOne({
      userId,
      videoId,
      title: videoTitle,
      transcript,
      segments,
      createdAt: new Date()
    });

    res.json({ success: true, message: 'Transcript saved', preview: transcript.slice(0, 200) + '...' });

  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ error: 'Processing failed' });
  }
});

export default router;

