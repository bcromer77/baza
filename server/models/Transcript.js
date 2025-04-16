const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  start: {
    type: Number,
    required: true,
  },
  end: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Transcript = mongoose.model('Transcript', transcriptSchema);

module.exports = Transcript;
const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator' },
  url: String,
  transcript: String,
  analysis: {
    emotion: String,
    tone: String,
    topic: String,
    suggestion: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transcript', transcriptSchema);

