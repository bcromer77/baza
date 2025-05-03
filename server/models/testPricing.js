require('dotenv').config({ path: '../../.env' }); // Load .env from project root
const mongoose = require('mongoose');
const Pricing = require('./Pricing');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for test'))
  .catch(err => console.error('MongoDB connection error:', err));

async function testPricing() {
  try {
    const pricing = await Pricing.findInfluencerPricing('test-user-123');
    console.log('PRICING RESULTS:', pricing);
  } catch (error) {
    console.error('Test error:', error);
  } finally {
    mongoose.disconnect();
  }
}

testPricing();
