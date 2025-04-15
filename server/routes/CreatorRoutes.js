const express = require('express');
const router = express.Router();
const creatorController = require('../controllers/creatorController');
const Creator = require('../models/Creator');

console.log("✅ creatorRoutes.js loaded");

router.get('/fireproof-test', (req, res) => {
  console.log("🔥 /api/creators/fireproof-test hit!");
  res.json({ working: true });
});
