const mongoose = require('mongoose');

const AudienceInsightSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator' },
  geography: { type: Map, of: Number },
  behavior: { type: Map, of: Number },
  intent: { type: Map, of: Number },
  engagementTimes: { type: Map, of: String },
  sentiment: { type: Map, of: Object }, // { sentiment: 'positive', score: 0.89 }
  createdAt: { type: Date, default: Date.now },
});

AudienceInsightSchema.index({ creatorId: 1 });

module.exports = mongoose.model('AudienceInsight', AudienceInsightSchema);
