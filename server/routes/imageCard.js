// server/routes/imageCard.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/:creatorId", (req, res) => {
  const { creatorId } = req.params;
  const filePath = path.join(__dirname, `../../public/creators/${creatorId}_card.png`);

  try {
    const imageData = fs.readFileSync(filePath, { encoding: "base64" });
    res.json({
      creatorId,
      imageBase64: `data:image/png;base64,${imageData}`,
    });
  } catch (err) {
    res.status(404).json({ error: "Image not found." });
  }
});

module.exports = router;

