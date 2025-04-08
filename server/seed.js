const mongoose = require('mongoose');
const Creator = require('./models/Creators');
const AudienceInsight = require('./models/AudienceInsight');

// ✅ Use your Atlas connection string directly
mongoose.connect('mongodb+srv://bazilcromer:nGMQLD9bBpKt5s60@creatortorchdb.ea2elit.mongodb.net/?retryWrites=true&w=majority&appName=creatortorchdb')
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const run = async () => {
  try {
    const insight = new AudienceInsight({
      geography: { Lisbon: 70 },
      intent: { Ozempic: 85 },
      behavior: { 'Weight Loss Discussion': 78, totalFollowers: 142000 },
      engagementTimes: { peak: '8:00–10:00 AM' },
      sentiment: {
        Ozempic: { sentiment: 'positive', score: 0.88 },
      },
    });

    const savedInsight = await insight.save();

    const creator = new Creator({
      email: 'bazil@example.com',
      channels: [{ platform: 'YouTube', handle: '@bazil' }],
      audienceInsights: [savedInsight._id],
    });

    const savedCreator = await creator.save();

    // Update the audience insight with creatorId
    savedInsight.creatorId = savedCreator._id;
    await savedInsight.save();

    console.log(`✅ Seeded Creator: ${savedCreator._id}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

run();

