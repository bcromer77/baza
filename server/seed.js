const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("✅ Connected to MongoDB Atlas");
});

db.on("error", (error) => {
  console.error("❌ MongoDB Atlas connection error:", error);
});

const creatorProfileSchema = new mongoose.Schema({
  creatorId: String,
  name: String,
  handle: String,
  avatar: String,
  location: String,
  followers: Number,
  engagementRate: Number,
  tags: [String],
  videos: [
    {
      url: String,
      emotion: String,
      tone: String,
      topics: [String],
      sentiment: String,
    },
  ],
  stripeAccountId: String,
  createdAt: { type: Date, default: Date.now },
});

const CreatorProfile = mongoose.model("CreatorProfile", 
creatorProfileSchema);

const creators = [
  {
    creatorId: "alex-lisbon-1",
    name: "Alexandra Chen",
    handle: "@alexcreates",
    avatar: "/creator-profile.jpg",
    location: "Lisbon, Portugal",
    followers: 287500,
    engagementRate: 0.0312,
    tags: ["travel", "surfing", "voiceover"],
    videos: [
      {
        url: "https://youtube.com/watch?v=alex1",
        emotion: "passionate",
        tone: "authentic",
        topics: ["travel", "surfing"],
        sentiment: "positive",
      },
    ],
    stripeAccountId: "acct_alex001",
  },
];

async function seed() {
  try {
    await CreatorProfile.deleteMany({});
    await CreatorProfile.insertMany(creators);
    console.log("🌱 Audiantix database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
