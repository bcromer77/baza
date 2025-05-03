const User = require('../../models/User');

async function searchBrands(req, res) {
  const { query, location } = req.body;  // Brand search query and 
optional location

  try {
    const creators = await User.find({
      $or: [
        { 'creatorData.content': { $regex: query, $options: 'i' } },
        { 'tiktok': { $regex: query, $options: 'i' } },
        { 'youtube': { $regex: query, $options: 'i' } },
        { 'instagram': { $regex: query, $options: 'i' } },
        { 'creatorData.location': { $regex: location, $options: 'i' } }  
// Add location-based filtering
      ]
    }).select('username tiktok youtube instagram creatorData');

    if (creators.length === 0) {
      return res.status(404).json({ success: false, message: "No creators 
found matching your search." });
    }

    res.status(200).json({ success: true, creators });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error searching for 
creators." });
  }
}

module.exports = searchBrands;

