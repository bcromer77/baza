const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { runWhisperTranscription } = require('../../services/whisperService');
const { moderateVideo } = require('../../services/moderationService');
const { saveTranscriptToDB } = require('../../services/dbService');

const router = express.Router();
const upload = multer({ dest: '/tmp/' });

router.post('/', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  const { userId, videoTitle, videoId } = req.body;

  try {
    const isSafe = await moderateVideo(filePath);
    if (!isSafe) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: 'Video flagged as unsafe.' });
    }

    const transcript = await runWhisperTranscription(filePath);
    await saveTranscriptToDB(userId, videoId, videoTitle, transcript);

    fs.unlinkSync(filePath); // Delete video file
    res.json({ success: true, transcript });
  } catch (err) {
    fs.unlinkSync(filePath);
    res.status(500).json({ error: 'Transcription failed.', details: err.message });
  }
});

module.exports = router;

