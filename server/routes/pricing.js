// server/models/Pricing.js
const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema({
  hotelId: { type: String, required: true },
  eventId: { type: String, required: true },
  baseRate: { type: Number, required: true, select: false },
  prismMargin: { type: Number, required: true, select: false },
  prismSellPrice: { type: Number, required: true },
  influencerMargin: { type: Number, required: true },
  influencerSellPrice: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  createdAt: { type: Date, default: Date.now }
});

PricingSchema.statics.createPricing = async function (hotelId, eventId, 
baseRate) {
  const prismMargin = baseRate * 0.1667; // ~1/6
  const prismSellPrice = baseRate + prismMargin;
  const influencerMargin = baseRate * 0.1667;
  const influencerSellPrice = prismSellPrice + influencerMargin;
  const pricing' = new this({
    hotelId,
    eventId,
    baseRate,
    prismMargin,
    prismSellPrice,
    influencerMargin,
    influencerSellPrice
  });
  await pricing.save();
  return pricing;
};

PricingSchema.statics.findInfluencerPricing = async function (userId) {
  return this.find({}).select('prismSellPrice influencerSellPrice 
influencerMargin hotelId eventId currency');
};

module.exports = mongoose.model('Pricing', PricingSchema);
