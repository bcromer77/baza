const User = require('../../models/User');

async function getCreatorData(req, res) {
  try {
    const userId = req.user.id; // Assuming user is authenticated and 
userId is in the request
    const user = await User.findById(userId).select('username tiktok 
youtube instagram creatorData');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not 
found." });
    }

    res.status(200).json({ success: true, creator: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = getCreatorData;

