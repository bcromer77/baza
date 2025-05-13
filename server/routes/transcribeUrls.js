const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

router.post('/', async (req, res) => {
  const { urls } = req.body;

  if (!Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'No URLs provided' });
  }

  console.log("🧠 Starting batch transcription for URLs:", urls);

  const child = spawn('python3', ['scripts/batch_transcribe_urls.py', ...urls]);

  child.stdout.on('data', (data) => {
    console.log(`📝 stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`❌ stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`👋 Transcription process exited with code ${code}`);
  });

  res.status(200).json({ message: '🎤 Transcription job started' });
});

module.exports = router;

