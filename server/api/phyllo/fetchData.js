const phyllo = require('phyllo-sdk');

// Phyllo setup
const phylloClient = new phyllo.Client({
  clientId: process.env.PHYLLO_CLIENT_ID,  // Use your PHYLLO_CLIENT_ID 
from .env
  secretKey: process.env.PHYLLO_SECRET_KEY // Use your PHYLLO_SECRET_KEY 
from .env
});

// Function to fetch creator data from Phyllo API based on social handles
async function fetchCreatorData(socialHandles) {
  try {
    // Fetch creator data from Phyllo using the social handles (e.g., 
TikTok, YouTube, Instagram)
    const { data } = await phylloClient.getCreatorData(socialHandles);
    
    // Return the fetched data
    return data;
  } catch (error) {
    console.error("Error fetching Phyllo data:", error);
    throw new Error("Unable to fetch data from Phyllo.");
  }
}

module.exports = fetchCreatorData;

