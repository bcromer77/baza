import { NextResponse } from "next/server"
import { initializeApp, getApps } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

// Only initialize once
const firebaseConfig = {
  apiKey: "AIzaSyCnJqLRebQbAVScZnEcVcde1f1tQjsV74g",
  authDomain: "audiantix.firebaseapp.com",
  projectId: "audiantix",
  storageBucket: "audiantix.appspot.com",
  messagingSenderId: "282379213175",
  appId: "1:282379213175:web:4ae45c1e3ccffb854ee972",
  measurementId: "G-Z1BWSGXQ49",
}

const app = !getApps().length ? initializeApp(firebaseConfig) : 
getApps()[0]
const db = getFirestore(app)

export async function GET() {
  const creators = [
    {
      id: "1",
      name: "Luna Wanderlust",
      platform: "Instagram",
      followers: "120K",
      festival: "Tomorrowland",
      location: "Boom, Belgium",
      quote: "My voice is my vibe! Epic Tomorrowland events! 🎶",
      engagement: "8.2%",
      hotel: { name: "Radisson Blu Antwerp", price: 150 },
      flight: { from: "London", price: 120 },
      potentialEarnings: 600,
      event: { name: "Tomorrowland VIP Meetup", attendees: 50, revenue: 
2500 },
      affiliates: { codes: 3, earnings: 450 },
    },
    // Add the other 4 creators from your file here...
  ]

  try {
    const colRef = collection(db, "creators")
    for (const creator of creators) {
      await addDoc(colRef, creator)
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err })
  }
}

