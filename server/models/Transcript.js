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

