const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const twilio = require("twilio");

console.log("✅ utilsRoutes.js loaded");

// 🔥 DEBUG — GET /api/utils/ping
router.get("/ping", (req, res) => {
  console.log("📡 Ping route hit");
  res.status(200).send("🔥 /api/utils/ping is ACTIVE");
});

// --- OpenAI Setup ---
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 📍 POST /api/utils/transcribe
router.post("/transcribe", async (req, res) => {
  const { audioUrl } = req.body;
  if (!audioUrl) return res.status(400).json({ error: "Missing audioUrl" });

  try {
    const response = await openai.audio.transcriptions.create({
      file: await OpenAI.File.fromUrl(audioUrl),
      model: "whisper-1",
      response_format: "verbose_json",
    });

    res.json(response);
  } catch (err) {
    console.error("❌ Whisper error:", err?.response?.data || err.message || err);
    res.status(500).json({
      error: "Whisper transcription failed",
      details: err?.response?.data || err.message || err
    });
  }
});

// --- Twilio Setup ---
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// 📍 POST /api/utils/test-whatsapp
router.post("/test-whatsapp", async (req, res) => {
  const { to } = req.body;
  if (!to) return res.status(400).json({ error: "Missing 'to' phone number" });

  try {
    const message = await twilioClient.messages.create({
      body: "👋 This is a test WhatsApp message from CreatorTorch!",
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
    });

    console.log("✅ WhatsApp message SID:", message.sid);
    res.json({ success: true, sid: message.sid });
  } catch (err) {
    console.error("❌ Twilio error details:", err?.response?.data || err.message || err);
    res.status(500).json({
      error: "Twilio message failed",
      details: err?.response?.data || err.message || err
    });
  }
});

module.exports = router;
