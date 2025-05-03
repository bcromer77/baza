const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  tiktok: { type: String },
  youtube: { type: String },
  instagram: { type: String },
  verificationCode: { type: String, required: true },
  creatorData: { 
    type: Map, 
    of: mongoose.Schema.Types.Mixed,
    required: false
  },
  location: { type: String, required: false }  // Add location field
});

const User = mongoose.model('User', userSchema);
module.exports = User;

