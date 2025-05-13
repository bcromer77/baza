const { fetchCreatorVideos } = require('../services/phylloService');
const { analyzeVideoContent } = require('../services/auditService');

async function runCreatorAudit(creatorId) {
  const videos = await fetchCreatorVideos(creatorId); // mock or real
  const results = [];

  for (const video of videos) {
    const audit = await analyzeVideoContent(video);
    results.push(audit);
  }

  return results;
}

module.exports = { runCreatorAudit };

