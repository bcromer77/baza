// server/models/Creator.js

const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  location: { type: String },
  niche: { type: String }, // e.g., "Trauma Coach", "Tennis Influencer"
  followers: { type: Number, default: 0 },
  platforms: [{ type: String }], // e.g., ["Instagram", "YouTube"]
  stripeId: { type: String }, // For payouts
  phylloConnected: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Creator = mongoose.model('Creator', creatorSchema);
module.exports = Creator;
