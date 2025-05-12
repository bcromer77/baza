const fs = require('fs');
const path = require('path');
const Transcript = require('../models/Transcript');

// Load the creator's transcript from MongoDB
async function fetchCreatorTranscript(creatorId) {
  const transcript = await Transcript.findOne({ creatorId });
  return transcript?.content || '';
}

// Load campaigns from a JSON file
function loadCampaigns(source = 'apollo') {
  const data = fs.readFileSync(path.join(__dirname, `../../mock/campaigns/${source}.json`));
  return JSON.parse(data);
}

// Score match based on keyword, tone, and location
function scoreMatch(transcript, campaign) {
  if (!transcript || typeof transcript !== 'string') return 0;

  const lowerText = transcript.toLowerCase().trim();
  let score = 0;

  if (campaign.keywords) {
    for (let word of campaign.keywords) {
      if (lowerText.includes(word.toLowerCase())) {
        console.log(`✅ Matched keyword: ${word}`);
        score += 2;
      }
    }
  }

  if (campaign.location && lowerText.includes(campaign.location.toLowerCase())) {
    console.log(`📍 Matched location: ${campaign.location}`);
    score += 3;
  }

  if (campaign.tone && lowerText.includes(campaign.tone.toLowerCase())) {
    console.log(`🎭 Matched tone: ${campaign.tone}`);
    score += 1.5;
  }

  return score;
}

// Main matching function
async function runPrismCampaignAgent(creatorId, source = 'apollo') {
  const transcript = await fetchCreatorTranscript(creatorId);
  console.log('📄 Loaded transcript:', transcript);

  const campaigns = loadCampaigns(source);
  console.log('📦 Campaigns loaded:', campaigns);

  const results = campaigns.map(c => {
    const score = scoreMatch(transcript, c);
    return { ...c, score };
  });

  console.log('✅ Scored results:', results);
  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}

module.exports = {
  runPrismCampaignAgent,
};

