const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const analyzeChunk = require("./analyzeTranscript");
const suggestionEngine = require("./brain/suggestionEngine");

// Your video/audio file for testing:
const audioFile = "whatsyourismKMapproval req.mp4";
const audioPath = path.join(__dirname, audioFile);

if (!fs.existsSync(audioPath)) {
  console.error("❌ File not found:", audioPath);
  process.exit(1);
}

console.log("🧠 Running Whisper transcription on:", audioFile);

// Run Whisper
const whisper = spawn("whisper", [audioPath, "--language", "en", 
"--model", "base"]);

// Capture Whisper output
whisper.stdout.on("data", (data) => {
  const output = data.toString();
  console.log(`✅ Whisper says: ${output}`);

  // Dummy transcript chunks for testing
  const transcript = [
    {
      text: "I absolutely love Lisbon for late summer dinners.",
      start: 15.32,
      end: 20.96,
      ...analyzeChunk("I absolutely love Lisbon for late summer dinners.")
    },
    {
      text: "My career has always been about empowerment.",
      start: 21.96,
      end: 27.50,
      ...analyzeChunk("My career has always been about empowerment.")
    }
  ];

  const suggestions = suggestionEngine(transcript);
  console.log("✨ Generated Suggestions:", suggestions);
});

// Handle errors from Whisper
whisper.stderr.on("data", (data) => {
  console.error(`⚠️ Whisper error: ${data.toString()}`);
});

whisper.on("close", (code) => {
  if (code !== 0) {
    console.error(`🛑 Whisper exited with code ${code}`);
  } else {
    console.log("✅ Whisper transcription completed successfully.");
  }
});

