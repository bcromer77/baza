const mongoose = require('mongoose');
const Creator = require('../db'); // Import the Creator model from db.js
const connectDB = require('../mongoClient'); // Import the MongoDB 

async function seedData() {
  try {
    // Connect to MongoDB Atlas
    await connectDB();

    // Clear existing creators (optional)
    await Creator.deleteMany({});

    // Seed demo creators
    const demoCreators = [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123'
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'password456'
      }
    ];

    await Creator.insertMany(demoCreators);
    console.log('Demo creators seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

// Run the seeding function
seedData();

