const fs = require("fs");
const { spawn } = require("child_process");
const path = require("path");

async function transcribeAudio(filePath) {
  return new Promise((resolve, reject) => {
    const script = spawn("python3", ["server/scripts/transcribe.py", filePath]);

    let transcript = "";
    let error = "";

    script.stdout.on("data", (data) => {
      transcript += data.toString();
    });

    script.stderr.on("data", (data) => {
      error += data.toString();
    });

    script.on("close", (code) => {
      if (code !== 0) {
        return reject(`Whisper failed: ${error}`);
      }
      resolve(transcript.trim());
    });
  });
}

module.exports = {
  transcribeAudio,
};

