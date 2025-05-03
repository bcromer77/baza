const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const analyzeTranscript = require("../../prism/analyzeTranscript");
const { transcribeAudio } = require("./whisperRunner"); // make this if needed

async function transcribeFromUrl(url) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, "../../youtube_audio.wav");

    const command = `yt-dlp -x --audio-format wav -o "${outputPath}" ${url}`;
    console.log(`🎬 Running: ${command}`);

    exec(command, async (err) => {
      if (err) return reject(`Download error: ${err}`);

      try {
        const transcript = await transcribeAudio(outputPath);
        const analysis = analyzeTranscript(transcript);
        resolve({ transcript, ...analysis });
      } catch (e) {
        reject(e);
      }
    });
  });
}

module.exports = {
  transcribeFromUrl,
};

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
