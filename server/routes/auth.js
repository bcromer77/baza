const express = require("express");
const { getDb } = require("../db.js");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, persona } = req.body;

    if (!name || !email || !persona) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = await getDb();
    const existing = await db.collection("creators").findOne({ email });

    if (existing) {
      return res.status(200).json({ userId: existing._id });
    }

    const result = await db.collection("creators").insertOne({
      name,
      email,
      persona,
      createdAt: new Date()
    });

    res.status(201).json({ userId: result.insertedId });
  } catch (err) {
    console.error("Signup failed:", err);
    res.status(500).json({ error: "Signup failed internally" });
  }
});

module.exports = router;

