import crypto from 'crypto';
import dotenv from 'dotenv';
import fetchCreatorData from '../../api/phyllo/fetchData.js';
import sendWhatsapp from '../../utils/sendWhatsapp.js';
import syncPhylloPosts from '../../services/syncPhylloPosts.js';
import analyzePostsForSentiment from '../../services/analyzePostsForSentiment.js';
import User from '../../models/User.js';

dotenv.config();

// Helper: Send WhatsApp Verification
async function sendVerificationCode(phoneNumber, code) {
  const message = `Your Audiantix verification code is:\n${code}`;
  await sendWhatsapp(phoneNumber, message);
}

// Route Handler
async function handleSignup(req, res) {
  const { username, phoneNumber, tiktok, youtube, instagram } = req.body;

  // Generate a 6-digit code
  const verificationCode = crypto.randomInt(100000, 999999).toString();

  // Fetch from Phyllo
  const socialHandles = { tiktok, youtube, instagram };
  let creatorData;
  try {
    creatorData = await fetchCreatorData(socialHandles);
  } catch (err) {
    console.error('❌ Error fetching Phyllo:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch Phyllo data.' });
  }

  // Create Mongo User
  let user;
  try {
    user = await User.create({
      username,
      phoneNumber,
      tiktok,
      youtube,
      instagram,
      verificationCode,
      accessToken: creatorData.accessToken,
      phyllo_user_id: creatorData.creatorId,
      creatorData
    });
  } catch (err) {
    console.error('❌ Error saving user:', err);
    return res.status(500).json({ success: false, message: 'Signup failed.' });
  }

  // 🔁 Sync Posts
  try {
    await syncPhylloPosts({
      creatorId: creatorData.creatorId,
      accessToken: creatorData.accessToken
    });
  } catch (err) {
    console.warn('⚠️ Warning: Failed to sync posts:', err.message);
  }

  // 🧠 Optional: Run sentiment analysis
  try {
    await analyzePostsForSentiment(creatorData.creatorId);
  } catch (err) {
    console.warn('⚠️ Warning: Sentiment analysis skipped:', err.message);
  }

  // ✅ Send verification code via WhatsApp
  try {
    await sendVerificationCode(phoneNumber, verificationCode);
  } catch (err) {
    console.error('❌ WhatsApp failed:', err);
    return res.status(500).json({ success: false, message: 'WhatsApp message failed.' });
  }

  // ✅ Done
  res.status(200).json({ success: true, message: 'Verification code sent!' });
}

export default handleSignup;

