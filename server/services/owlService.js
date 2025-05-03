// server/services/owlService.js
const { GladiaWhisperAPI, GPT4API, BERTModel, PineconeAPI } = 
require('../utils/externalApis');
const { PrismMatch } = require('./prismService');

async function OwlSearch({ queryInput, userId, role, userLanguage, eventId 
}) {
  const isVoice = queryInput instanceof Buffer;
  const queryText = isVoice ? await 
GladiaWhisperAPI.Transcribe(queryInput) : queryInput;

  const analysis = await GPT4API.Analyze({
    prompt: `Extract keywords, goals, and event context from: 
${queryText}`,
    options: {
      keywords: [],
      goals: ['community', 'engagement', 'culinary'],
      events: [eventId || 'generic']
    }
  });

  const queryData = {
    explicit: analysis.keywords,
    implicit: analysis.goals,
    event: analysis.event,
    language: userLanguage
  };

  const textInput = queryText + ' ' + [...queryData.explicit, 
...queryData.implicit].join(' ');
  const queryEmbedding = await BERTModel.Encode(textInput);

  const candidates = await PineconeAPI.Query({
    vector: queryEmbedding,
    topK: 100,
    filter: {
      platform: ['instagram', 'tiktok', 'youtube', 'podcast'],
      eventId: queryData.event,
      language: queryData.language
    }
  });

  const results = await PrismMatch({
    audioFile: null,
    queryInput: { queryData, queryEmbedding, candidates },
    userId,
    role,
    userLanguage,
    eventId
  });

  return results;
}

module.exports = { OwlSearch };
