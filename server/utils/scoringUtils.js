function detectTransparency(text) {
  const disclosureTerms = ["#ad", "#sponsored", "gifted", "in partnership", "thanks to"];
  return disclosureTerms.some(term => text.toLowerCase().includes(term));
}

function detectAdultCue(text) {
  const cues = ["uncensored", "find me there", "🍑", "💦", "onlyfans"];
  return cues.some(term => text.toLowerCase().includes(term));
}

function scoreFit(flagged, adultCue) {
  if (flagged && adultCue) return 3.5;
  if (adultCue) return 5.5;
  if (flagged) return 6.5;
  return 9.8;
}

module.exports = { detectTransparency, detectAdultCue, scoreFit };

