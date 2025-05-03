const mongoose = require('mongoose');

const audienceInsightSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator', required: true },
  geography: { type: Object, default: {} },
  behavior: { type: Object, default: {} },
  intent: { type: Object, default: {} },
  engagementTimes: { type: Object, default: {} },
  sentiment: { type: Object, default: {} },
});

module.exports = mongoose.model('AudienceInsight', audienceInsightSchema);