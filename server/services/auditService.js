const fs = require('fs');
const path = require('path');

const flagged = require('../../data/flagged_keywords.json');
const { detectTransparency, detectAdultCue, scoreFit } = require('../utils/scoringUtils');

// NSFW score between 0 and 10, lower = more risk
function scoreNSFW(matches) {
  if (matches.length === 0) return 10.0;
  const severity = matches.length > 5 ? 4.5 : matches.length > 2 ? 6.5 : 8.0;
  return Math.round((severity + Math.random() * 0.5) * 10) / 10;
}

async function analyzeVideoContent(video) {
  // Replace this with actual Whisper transcript when ready
  const transcript = "Simulated transcript about a beauty product... #ad Check my bio 💦";

  const combinedText = [
    transcript,
    video.title || "",
    video.description || "",
    ...(video.hashtags || []).join(" ")
  ].join(" ").toLowerCase();

  // Match flagged terms
  const flagged_matches = flagged.filter(term => combinedText.includes(term));

  // Compute scores
  const nsfw_score = scoreNSFW(flagged_matches);
  const transparency_score = detectTransparency(combinedText) ? 9.5 : 4.0;
  const adult_inference = detectAdultCue(combinedText);
  const fit_score = scoreFit(flagged_matches.length > 0, adult_inference);

  // Final output
  return {
    creator_id: video.creator_id,
    video_id: video.video_id,
    platform: video.platform,
    transcript,
    flagged: flagged_matches.length > 0,
    flagged_matches,
    nsfw_score,
    transparency_score,
    adult_inference,
    fit_score,
    createdAt: new Date()
  };
}

module.exports = { analyzeVideoContent };

