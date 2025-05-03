const mongoose = require('mongoose');

const CreatorTorchBrainSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 
'Creator' },
  videoUrl: { type: String, required: true },
  transcriptChunks: [
    {
      text: String,
      start: Number,
      end: Number,
      emotion: String,
      tone: String,
      topic: String,
      suggestion: String,
    }
  ],
  visualTags: [String], // for future OCR/logo detection
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CreatorTorchBrain', 
CreatorTorchBrainSchema);

