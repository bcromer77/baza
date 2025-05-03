// server/models/Affiliate.js

const mongoose = require('mongoose');

const affiliateSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator', required: true },
  productName: { type: String },
  link: { type: String },
  commissionRate: { type: Number }, // e.g. 0.15 = 15%
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Affiliate = mongoose.model('Affiliate', affiliateSchema);
module.exports = Affiliate;
