require('dotenv').config();
const mongoose = require('mongoose');
const Transcript = require('./models/Transcript');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const result = await Transcript.create({
      creatorId: 'demo123',
      content: 'I just got back from a healing retreat in Lisbon and it was amazing. Yoga, confidence, and pure wellness!'
    });

    console.log('✅ Transcript seeded:', result);
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding transcript:', err);
    process.exit(1);
  }
}

seed();

