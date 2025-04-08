const mongoose = require('mongoose');

const CreatorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  channels: [{ platform: String, handle: String, accessToken: String }],
  audienceInsights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AudienceInsight' }],
  stripeAccountId: String,
  createdAt: { type: Date, default: Date.now },
});

CreatorSchema.index({ email: 1 });
CreatorSchema.index({ stripeAccountId: 1 });

module.exports = mongoose.model('Creator', CreatorSchema);