const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Load Creator model
const Creator = require('../models/Creator');

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB error:', err);
    process.exit(1);
  });

// Seed test creator
const seedCreator = async () => {
  try {
    await Creator.deleteMany({ email: 'creator@example.com' });

    const newCreator = await Creator.create({
      name: 'Test Creator',
      email: 'creator@example.com',
      videos: ['https://www.youtube.com/watch?v=jCkTLCrwB5g'],
      stats: {
        views: 1000,
        subscribers: 500
      }
    });

    console.log('✅ Creator seeded:', newCreator._id.toString());
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedCreator();

