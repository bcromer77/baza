const mongoose = require('mongoose');

const TranscriptSchema = new mongoose.Schema({
  creatorId: {
    type: String,
    required: true,
  },
  videoTitle: String,
  videoUrl: String,
  transcript: String,
  summary: String,
  emotions: [String],
  monetizationSuggestions: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transcript', TranscriptSchema);

