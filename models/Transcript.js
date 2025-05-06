const mongoose = require('mongoose');

const TranscriptSchema = new mongoose.Schema({
  creatorId: { type: String, required: true },
  videoUrl: { type: String, required: true },
  lines: [String],
  raw: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transcript', TranscriptSchema);

