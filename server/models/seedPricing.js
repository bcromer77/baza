require('dotenv').config({ path: '../../.env' }); // Load .env from project root
const mongoose = require('mongoose');
const Pricing = require('./Pricing');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

async function seedPricing() {
  try {
    // Clear existing data
    await Pricing.deleteMany({});
    console.log('Cleared existing pricing data');

    // Seed new data
    await Pricing.createPricing('hotel-123', 'london-supper-club-2025', 100);
    await Pricing.createPricing('hotel-456', 'paris-master-class-2025', 150);
    console.log('Seeded pricing data');

    // Verify data
    const pricing = await Pricing.findInfluencerPricing('test-user-123');
    console.log('Seeded PRICING RESULTS:', pricing);
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedPricing();
