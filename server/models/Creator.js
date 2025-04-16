const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
  name: String,
  email: String,
  videos: [String],
  stats: {
    views: Number,
    subscribers: Number,
  },
});

module.exports = mongoose.models.Creator || mongoose.model('Creator', creatorSchema);
