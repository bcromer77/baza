// server/agents/prismCampaignAgent.js

const mongoose = require('mongoose');
const Creator = require('../models/Creator');
const Transcript = require('../models/Transcript');
const { score_cosine, score_language, score_sentiment, 
score_engagement_gbm, score_revenue, score_distance, topsis_rank } = 
require('../prism_rag_engine/utils/scoring');
const { getOpportunityVector } = 
require('../prism_rag_engine/utils/embeddingUtils');

const TARGET_TOPICS = ['event', 'retreat', 'festival', 'beach', 'summer'];
const TARGET_LANGUAGES = ['en', 'fr', 'es', 'de'];
const VENUE_COORDS = [38.703, -9.398]; // Lisbon sample

async function runPrismCampaignAgent() {
  const creators = await Creator.find({ 'location.continent': 'Europe' });

  const results = [];

  for (const creator of creators) {
    const transcripts = await Transcript.find({ creatorId: creator._id });

    const videoTopics = transcripts.flatMap(t => t.topics || []);
    const mentionsEvents = videoTopics.some(t => 
TARGET_TOPICS.includes(t.toLowerCase()));
    if (!mentionsEvents) continue;

    const topicVec = getOpportunityVector(videoTopics);
    const oppVec = getOpportunityVector(TARGET_TOPICS);

    const audienceVec = creator.audienceProfile?.vector || [0];
    const oppAudienceVec = getOpportunityVector(['travel', 'events', 
'summer']);

    const scores = [
      score_distance([creator.location.lat, creator.location.lng], 
VENUE_COORDS), // distance
      creator.location.city === 'Lisbon' ? 1 : 0.5, // location
      score_cosine(audienceVec, oppAudienceVec), // audience
      1, // engagement time placeholder
      score_revenue(2000, score_engagement_gbm([creator.engagementRate]), 
0.8), // revenue
      score_language((creator.languages || []).length, TARGET_LANGUAGES), 
// language reach
      score_cosine(topicVec, oppVec), // topic
      score_sentiment(transcripts.some(t => t.sentiment === 'positive')) 
// sentiment
    ];

    results.push({
      creatorId: creator._id,
      name: creator.name,
      scores,
      location: creator.location.city,
    });
  }

  const ranked = topsis_rank(results, [0.2, 0.1, 0.15, 0.1, 0.15, 0.15, 
0.1, 0.05]);
  console.log('🏖️ Top Creators for Travel Event Offers:', ranked.map(c => 
`${c.name} (${c.location}) - ${c.topsis_score.toFixed(2)}`));

  return ranked;
}

module.exports = runPrismCampaignAgent;

