const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  channels: [{ platform: String, accessToken: String }],
  stripeAccountId: { type: String },
  audienceInsights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AudienceInsight' }],
});

module.exports = mongoose.model('Creator', creatorSchema);