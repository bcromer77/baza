const admin = require("firebase-admin");
const serviceAccount = require(__dirname + 
"/firebase/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function run() {
  const docRef = db.collection("creators").doc("kay-tueday");

  await docRef.set({
    name: "Kay Tueday",
    followers: 500,
    engagement: "7.5%",
    topics: ["pitch decks", "confidence", "pastel colours", 
"Bournemouth"],
    sentiment: "uplifting",
    tone: "confident",
    location: "UK",
    platforms: {
      instagram: "kaytueday"
    },
    createdAt: new Date().toISOString()
  });

  console.log("✔️ Firestore write success");
}

run();

