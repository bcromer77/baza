const fs = require('fs');
const path = require('path');
const Transcript = require('../models/Transcript');

async function fetchCreatorTranscript(creatorId) {
  const transcript = await Transcript.findOne({ creatorId });
  return transcript?.content || '';
}

function loadCampaigns(source = 'apollo') {
  const data = fs.readFileSync(path.join(__dirname, `../../mock/campaigns/${source}.json`));
  return JSON.parse(data);
}

function scoreMatch(transcript, campaign) {
  const lowerText = transcript.toLowerCase();
  let score = 0;

  if (campaign.keywords) {
    for (let word of campaign.keywords) {
      if (lowerText.includes(word.toLowerCase())) score += 2;
    }
  }

  if (campaign.location && lowerText.includes(campaign.location.toLowerCase())) {
    score += 3;
  }

  if (campaign.tone && lowerText.includes(campaign.tone.toLowerCase())) {
    score += 1.5;
  }

  return score;
}

async function runPrismCampaignAgent(creatorId, source = 'apollo') {
  const transcript = await fetchCreatorTranscript(creatorId);
  const campaigns = loadCampaigns(source);

  const results = campaigns.map(c => {
    const score = scoreMatch(transcript, c);
    return { ...c, score };
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}

module.exports = {
  runPrismCampaignAgent,
};

