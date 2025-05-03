const fs = require('fs');
const path = require('path');

async function downloadVideos(videoUrl) {
  console.log(`📥 Mock downloading: ${videoUrl}`);
  // Mock: return path to local audio file
  return path.join(__dirname, 'mock_audio.wav');
}

async function transcribeWithWhisper(audioPath) {
  console.log(`🧠 Transcribing: ${audioPath}`);
  // Mock: simulate Whisper transcription
  return "surfing in Lisbon, amazing waves, best hotel to stay near the 
beach";
}

async function detectLanguage(text) {
  console.log(`🌍 Detecting language for text: ${text.slice(0, 30)}...`);
  // Mock: always return 'en'
  return 'en';
}

async function translateToEnglish(text) {
  console.log(`🔁 Translating to English: ${text.slice(0, 30)}...`);
  // Mock: return unchanged
  return text;
}

module.exports = {
  downloadVideos,
  transcribeWithWhisper,
  detectLanguage,
  translateToEnglish,
};

