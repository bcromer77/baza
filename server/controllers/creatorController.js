const Creator = require('../models/Creator');
const AudienceInsight = require('../models/AudienceInsight');
const phylloService = require('../services/phylloService');
const sentimentService = require('../services/sentimentService');
const stripeService = require('../services/stripeService');
const queryService = require('../services/queryService');
const Transcript = require('../models/Transcript');
const fetch = require('node-fetch');

const signup = async (req, res) => {
  const { email, channels } = req.body;
  try {
    let creator = await Creator.findOne({ email });
    if (creator) return res.status(400).json({ error: 'Creator already exists' });

    const stripeAccountId = await stripeService.createConnectedAccount(email);
    const accountLink = await stripeService.createAccountLink(stripeAccountId);

    creator = new Creator({ email, channels, stripeAccountId });
    await creator.save();

    const audienceInsights = [];

    for (const channel of channels) {
      const data = await phylloService.getCreatorData(creator._id, channel.accessToken, channel.platform);
      const comments = await phylloService.getCreatorComments(creator._id, channel.accessToken, channel.platform);

      const topics = ['exfoliation', 'sustainability', 'GRWM'];
      const sentimentResults = {};

      for (const topic of topics) {
        sentimentResults[topic] = sentimentService.analyzeSentiment(comments, topic);
      }

      const insight = new AudienceInsight({
        creatorId: creator._id,
        geography: data.geography || { Dublin: 45 },
        behavior: data.behavior || { 'Skincare Engagement': 68, totalFollowers: 128000 },
        intent: data.intent || { 'Eco-conscious': 68 },
        engagementTimes: data.engagementTimes || { peak: '7:30-9:00 AM' },
        sentiment: sentimentResults,
      });

      await insight.save();
      audienceInsights.push(insight._id);

      // Auto-trigger batch Whisper transcription for this channel
      if (channel.videoUrls && channel.videoUrls.length > 0) {
        await fetch('http://localhost:5000/api/whisper/batch-transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            creatorId: creator._id,
            videoUrls: channel.videoUrls.slice(0, 50)
          })
        });
      }
    }

    creator.audienceInsights = audienceInsights;
    await creator.save();

    res.status(201).json({
      message: 'Creator signed up successfully',
      creatorId: creator._id,
      stripeAccountLink: accountLink
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDashboard = async (req, res) => {
  try {
    const creator = await Creator.findById(req.params.id).populate('audienceInsights');
    if (!creator) return res.status(404).json({ error: 'Creator not found' });

    const monetizationPrompts = await queryService.generateMonetizationPrompts(creator._id);

    const transcripts = await Transcript.find({ creatorId: req.params.id });
    const topics = transcripts.flatMap(t => t.transcript.split(' '))
      .filter(w => w.length > 4)
      .reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});

    const mostSpokenTopics = Object.entries(topics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([topic, count]) => ({ topic, count }));

    res.json({
      audienceInsights: creator.audienceInsights.map(insight => ({
        ...insight._doc,
        sentiment: Object.fromEntries(insight.sentiment),
      })),
      monetizationPrompts,
      mostSpokenTopics,
      brandOffers: [
        { id: 1, brand: 'A Sustainable Skincare Brand', offer: '€5,000 for a 3-part GRWM video series' },
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const queryAudience = async (req, res) => {
  try {
    const creator = await Creator.findById(req.params.id);
    if (!creator) return res.status(404).json({ error: 'Creator not found' });

    const result = await queryService.queryAudience(creator._id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { signup, getDashboard, queryAudience };

