// /Users/macbook/Downloads/creator-torch-unzipped/server/db.js

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
