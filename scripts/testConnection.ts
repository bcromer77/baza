import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import connectToDatabase from "../lib/db";
import Creator from "../models/Creator";

(async () => {
  try {
    console.log("🔁 Connecting to MongoDB...");

    const db = await connectToDatabase();

    console.log("✅ Connected to MongoDB:", db.connection.name);

    const creators = await Creator.find({}).lean();
    console.log("🧠 Found creators:", creators);

  } catch (err) {
    console.error("❌ Failed:", err);
  } finally {
    process.exit();
  }
})();
