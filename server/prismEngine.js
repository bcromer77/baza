const { getHaversineScore, getCosineSimilarity } = 
require("../utils/scoring");
const { predictEngagement } = require("../services/engagementModel");

async function prismEngine({ creator, opportunity }) {
  const maxDistance = 50; // km

  // 1. Geospatial Match
  const distance = getHaversineScore(creator.location, opportunity.venue);
  const S_distance = 1 - distance / maxDistance;
  const S_location = creator.city === opportunity.target_city ? 1 : 0.5;

  // 2. Global Language & Sentiment
  const S_language = creator.translated_languages.length / 
opportunity.target_languages.length;
  const S_topic = getCosineSimilarity(creator.topics_vector, 
opportunity.topics_vector);
  const S_sentiment = creator.sentiment === 
opportunity.preferred_sentiment ? 1 : 0.5;

  // 3. Audience Match
  const S_audience = getCosineSimilarity(creator.audience_vector, 
opportunity.target_audience_vector);
  const S_engagement_time = 
creator.peak_hours.includes(opportunity.event_time) ? 1 : 0.5;

  // 4. Revenue Prediction
  const S_engagement = await predictEngagement({
    engagement_rate: creator.engagement_rate,
    topic_score: S_topic,
    language_score: S_language,
    engagement_time_score: S_engagement_time,
  });

  const S_revenue = (opportunity.budget * S_engagement * (1 + S_language)) 
/ 10000; // normalized

  // 5. TOPSIS Ranking
  const scores = {
    S_distance, S_location, S_audience, S_engagement_time,
    S_revenue, S_language, S_topic, S_sentiment
  };

  const weights = {
    S_distance: 0.2,
    S_location: 0.1,
    S_audience: 0.15,
    S_engagement_time: 0.1,
    S_revenue: 0.15,
    S_language: 0.15,
    S_topic: 0.1,
    S_sentiment: 0.05
  };

  const finalScore = Object.keys(scores).reduce(
    (acc, key) => acc + scores[key] * weights[key],
    0
  );

  return { score: finalScore.toFixed(3), breakdown: scores };
}

module.exports = { prismEngine };

