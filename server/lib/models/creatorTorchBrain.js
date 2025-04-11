const mongoose = require('mongoose');

const TranscriptionSchema = new mongoose.Schema({
  creatorId: { type: String, required: true },
  platform: { type: String }, // YouTube, TikTok, etc.
  videoUrl: { type: String },
  transcription: { type: String },
  timestamp: { type: Date, default: Date.now },
  flaggedNSFW: { type: Boolean, default: false },
  topics: [String],
  sentiment: { type: String }
});

module.exports = mongoose.model('CreatorTorchBrain', TranscriptionSchema);

