const AudienceInsight = require('../models/AudienceInsight');

const queryAudience = async (creatorId, query) => {
  const { location, topic, sentiment, minEngagement } = query;
  const insights = await AudienceInsight.find({ creatorId });

  const results = insights.map(insight => {
    let matches = 0;
    const totalAudience = insight.behavior?.get('totalFollowers') || 0;

    if (location && insight.geography?.has(location)) {
      matches += insight.geography.get(location) / 100 * totalAudience;
    }

    if (topic && insight.intent?.has(topic)) {
      matches = Math.min(matches, insight.intent.get(topic) / 100 * totalAudience);
    }

    if (sentiment && insight.sentiment?.has(topic)) {
      const s = insight.sentiment.get(topic);
      if (s.sentiment !== sentiment) matches = 0;
    }

    if (minEngagement && insight.behavior?.has(topic)) {
      const e = insight.behavior.get(topic);
      if (e < minEngagement) matches = 0;
    }

    return { matches: Math.round(matches), totalAudience };
  });

  return results.reduce((acc, r) => ({
    matches: acc.matches + r.matches,
    totalAudience: acc.totalAudience + r.totalAudience,
  }), { matches: 0, totalAudience: 0 });
};

const generateMonetizationPrompts = async (creatorId) => {
  const insights = await AudienceInsight.find({ creatorId });
  const prompts = [];

  insights.forEach(insight => {
    const locations = Object.entries(insight.geography || {});
    const topics = Object.entries(insight.intent || {});
    const highEngagement = Object.entries(insight.behavior || {}).filter(([_, v]) => v > 60);

    locations.forEach(([loc, pct]) => {
      if (pct > 30) {
        const size = Math.round((pct / 100) * (insight.behavior?.get('totalFollowers') || 0));
        prompts.push({ text: `Host an event in ${loc} for ${size} followers, earn €${Math.round(size * 0.6)}.` });
      }
    });

    highEngagement.forEach(([topic, score]) => {
      const s = insight.sentiment?.get(topic);
      if (s?.sentiment === 'positive') {
        prompts.push({ text: `Pitch a ${topic}-related brand collab, earn €${Math.round(score * 50)}.` });
      }
    });
  });

  return prompts.slice(0, 5);
};

module.exports = { queryAudience, generateMonetizationPrompts };