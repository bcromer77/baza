const admin = require("firebase-admin");
const serviceAccount = require("./firebase/serviceAccount.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Mock write to 'creators' collection
const docRef = db.collection("creators").doc("kay-tueday");

docRef.set({
  name: "Kay Tueday",
  followers: 500,
  engagement: "7.5%",
  topics: ["pitch decks", "confidence", "pastel colours", "Bournemouth"],
  sentiment: "uplifting",
  tone: "confident",
  location: "UK",
  platforms: {
    instagram: "kaytueday"
  },
  createdAt: new Date().toISOString()
}).then(() => {
  console.log("✔️ Firestore write success");
}).catch((err) => {
  console.error("❌ Firestore write failed:", err);
});

