// server/models/Transcript.js

const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
  text: { type: String, required: true },
  emotion: { type: String },
  tone: { type: String },
  keywords: [String],
  trigger: { type: String },
  suggestion: { type: String }
});

const transcriptSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator', 
required: true },
  videoUrl: { type: String, required: true },
  lines: [lineSchema],
  raw: { type: String }, // Full unparsed transcript text
  createdAt: { type: Date, default: Date.now }
});

const Transcript = mongoose.model('Transcript', transcriptSchema);
module.exports = Transcript;

