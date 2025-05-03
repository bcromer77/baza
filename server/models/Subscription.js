const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // the user this sub belongs to
  type: { type: String, enum: ['creator', 'brand', 'hotel'], required: true },
  tier: { type: String, enum: ['Free', 'Pro', 'Premium'], default: 'Free' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  active: { type: Boolean, default: true },
  paymentId: { type: String }, // Stripe payment intent or sub id
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);

