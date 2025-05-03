// /Users/macbook/Downloads/creator-torch-unzipped/server/mongoClient.js

const mongoose = require('mongoose');
require('dotenv').config(); // Loads .env file if present

const MONGO_URI = process.env.MONGO_URI || 
'mongodb+srv://bazilcromer:Auditest234@creatortorchdb.ea2elit.mongodb.net/auditantix?retryWrites=true&w=majority&appName=creatortorchdb';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

