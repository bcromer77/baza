const mongoose = require('mongoose');

const TranscriptSchema = new mongoose.Schema({
  creatorId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transcript', TranscriptSchema);

