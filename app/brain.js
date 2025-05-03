const express = require('express');
const router = express.Router();

// Temp mock
router.get('/:creatorId', async (req, res) => {
  const { creatorId } = req.params;

  // TODO: Replace with real DB logic
  const insights = [
    { type: "💡 Idea", message: "Host a speaking retreat in Borgen – earn 
€3,200" },
    { type: "🔥 Trending", message: "35% of your audience searched for 
'confidence'" },
    { type: "🎯 Match", message: "Brand X is looking for creators 
discussing 'shame healing'" }
  ];

  res.json({ insights });
});

module.exports = router;

