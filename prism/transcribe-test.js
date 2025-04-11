const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

// ✅ Step 1: Set your video file name here
const audioFile = "whatsyourismKMapproval req.mp4";
const audioPath = path.join(__dirname, audioFile);

// ✅ Step 2: Check if the file exists
if (!fs.existsSync(audioPath)) {
  console.error("❌ File not found:", audioPath);
  process.exit(1);
}

console.log("🧠 Running Whisper transcription on:", audioFile);

// ✅ Step 3: Run Whisper CLI with English language + base model
const whisper = spawn("whisper", [
  audioPath,
  "--language",
  "en",
  "--model",
  "base"
]);

// ✅ Step 4: Handle standard output
whisper.stdout.on("data", (data) => {
  console.log(`✅ Whisper says: ${data}`);
});

// ✅ Step 5: Handle errors
whisper.stderr.on("data", (data) => {
  console.error(`⚠️ Whisper error: ${data}`);
});

// ✅ Step 6: On exit
whisper.on("close", (code) => {
  if (code === 0) {
    console.log("✅ Whisper transcription completed successfully.");
  } else {
    console.error(`🛑 Whisper exited with code ${code}`);
  }
});

