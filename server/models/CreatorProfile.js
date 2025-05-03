const mongoose = require("mongoose");

const creatorProfileSchema = new mongoose.Schema({
  creatorId: String,
  name: String,
  handle: String,
  avatar: String,
  location: String,
  followers: Number,
  engagementRate: Number,
  tags: [String],
  languages: [String],
  weekdayAvailability: [String],
  videos: [
    {
      url: String,
      emotion: String,
      tone: String,
      topics: [String],
      sentiment: String,
      transcript: String,
    },
  ],
  stripeAccountId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CreatorProfile", creatorProfileSchema);

