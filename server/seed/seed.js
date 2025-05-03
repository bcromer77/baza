const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// ✅ Import the Creator model
const Creator = require('../../models/Creator');

const seedCreator = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Missing MONGO_URI in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Optional: clear existing creators (for clean state)
    await Creator.deleteMany({});
    console.log("🧹 Cleared existing creators");

    // Create a new creator
    const newCreator = await Creator.create({
      name: 'Test Creator',
      email: 'creator@example.com',
      videos: ['https://www.youtube
