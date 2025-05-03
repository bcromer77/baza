const Creator = require('../models/Creator');

const matchCreators = async (query) => {
  const { topics, location, budget, audienceSizeMin, audienceSizeMax, geographicSpread } = query;

  const creators = await Creator.find().populate('audienceInsights');

  const matches = creators
    .filter(creator => {
      const insight = creator.audienceInsights[0];
      const audienceSize = insight?.behavior?.get('totalFollowers') || 0;

      if (audienceSizeMin && audienceSize < audienceSizeMin) return false;
      if (audienceSizeMax && audienceSize > audienceSizeMax) return false;

      if (geographicSpread?.length) {
        const creatorLocations = Object.keys(insight.geography || {});
        return geographicSpread.some(loc => creatorLocations.includes(loc));
      }

      return true;
    })
    .map(creator => {
      const insight = creator.audienceInsights[0];
      let contentRelevance = 0;
      topics.forEach(topic => {
        if (insight.behavior?.has(topic) || insight.intent?.has(topic)) contentRelevance += 0.5;
      });

      const audienceAlignment = location && insight.geography?.has(location)
        ? insight.geography.get(location) / 100
        : 0;

      const sentimentPositivity = topics.reduce((sum, topic) => {
        const sentiment = insight.sentiment?.get(topic);
        return sum + (sentiment?.sentiment === 'positive' ? 0.5 : 0);
      }, 0) / topics.length;

      const score = (contentRelevance * 0.4) + (audienceAlignment * 0.3) + (sentimentPositivity * 0.2) + (0.1); // dummy engagement

      return {
        creator,
        score: Math.min(score * 100, 100),
        sentiment: Object.fromEntries(topics.map(t => [t, insight.sentiment?.get(t) || { sentiment: 'neutral', score: 0 }])),
      };
    })
    .filter(match => match.score > 50)
    .sort((a, b) => b.score - a.score);

  const selected = [];
  let totalCost = 0;

  for (const match of matches) {
    const cost = budget / 5;
    if (totalCost + cost <= budget) {
      selected.push(match);
      totalCost += cost;
    }
    if (selected.length >= 5) break;
  }

  return selected;
};

module.exports = { matchCreators };