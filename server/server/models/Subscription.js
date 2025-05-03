const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Unique identifier for the user (hotel, brand, or creator)
  tier: { type: String, enum: ['free', 'pro', 'brand'], default: 'free' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date }, // Optional: For paid tiers with expiry
  status: { type: String, enum: ['active', 'inactive', 'cancelled'], default: 'active' },
  stripeSubscriptionId: { type: String }, // Optional: Stripe integration
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Optional: update the updatedAt field on save
SubscriptionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);

