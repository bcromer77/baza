import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Router } from 'express';
import dotenv from 'dotenv';
import { moderateVideoWithVision } from '../../services/visionModeration.js';
import { transcribeAndStore } from '../../services/whisperTranscribe.js';

dotenv.config();
const router = Router();

// ⚙️ Setup Multer for file upload
const upload = multer({
  dest: '/tmp/',
  limits: { fileSize: 500 * 1024 * 1024 }, // Max 500MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.mp4', '.mov'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  }
});

// 🧠 Main Endpoint
router.post('/', upload.single('file'), async (req, res) => {
  const { userId, videoId, title } = req.body;
  const filePath = req.file.path;

  try {
    // 1. Moderate video frames
    const isSafe = await moderateVideoWithVision(filePath);
    if (!isSafe) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ success: false, message: 'Content flagged as unsafe.' });
    }

    // 2. Transcribe + Save
    await transcribeAndStore({ filePath, userId, videoId, title });

    return res.status(200).json({ success: true, message: 'Transcript stored.' });
  } catch (err) {
    console.error('❌ Upload error:', err);
    return res.status(500).json({ success: false, message: 'Transcription failed.' });
  }
});

export default router;

