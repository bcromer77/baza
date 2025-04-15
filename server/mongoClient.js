const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);  // Exit the process with a failure code
  }
};

// Get the MongoDB database instance
const getDatabase = () => {
  return mongoose.connection.db; // This provides direct access to the 
MongoDB instance
};

module.exports = { connectDB, getDatabase };

