const fetchCreatorData = require('../../api/phyllo/fetchData');
const sendWhatsapp = require('../../utils/sendWhatsapp');
const crypto = require('crypto');
const User = require('../../models/User');

// Function to send verification code via WhatsApp
async function sendVerificationCode(phoneNumber, verificationCode) {
  const message = `Your Audiantix verification code is: 
${verificationCode}`;
  await sendWhatsapp(phoneNumber, message); // Send message via Twilio
}

// Handle the signup process
async function handleSignup(req, res) {
  const { username, phoneNumber, tiktok, youtube, instagram } = req.body;

  // Generate a random verification code
  const verificationCode = crypto.randomInt(100000, 999999).toString();

  // Fetch creator data from Phyllo using social handles
  const socialHandles = { tiktok, youtube, instagram };
  let creatorData;
  try {
    creatorData = await fetchCreatorData(socialHandles);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to 
fetch Phyllo data." });
  }

  // Save the user's info and the verification code in MongoDB
  const user = await User.create({
    username,
    phoneNumber,
    tiktok,
    youtube,
    instagram,
    verificationCode,
    creatorData // Store Phyllo data in user profile
  });

  // Send the WhatsApp message with the verification code
  await sendVerificationCode(phoneNumber, verificationCode);

  // Respond with success
  res.status(200).json({ success: true, message: 'Verification code sent!' 
});
}

module.exports = handleSignup;

