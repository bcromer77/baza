const express = require("express");
const { getDb } = require("../db.js");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get("/creators/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const db = await getDb();
    const creator = await db.collection("creators").findOne({ _id: new ObjectId(id) });

    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }

    res.status(200).json(creator);
  } catch (err) {
    console.error("❌ Error fetching creator:", err);
    res.status(500).json({ message: "Failed to fetch creator" });
  }
});

module.exports = router;

