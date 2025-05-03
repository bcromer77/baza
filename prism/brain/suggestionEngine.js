// prism/brain/suggestionEngine.js

const suggestionEngine = (chunks) => {
  const prompts = [];

  chunks.forEach((chunk) => {
    if (chunk.topic === "location" && chunk.emotion === "excited") {
      prompts.push({
        prompt: `🎉 Host an exciting event in 
${chunk.text.match(/lisbon|paris|london/i)[0]}`,
        timestamp: chunk.start,
      });
    } else if (chunk.topic === "values" && chunk.emotion === "empowering") 
{
      prompts.push({
        prompt: "🎤 Offer a speaking gig focused on empowerment",
        timestamp: chunk.start,
      });
    } else if (chunk.suggestion) {
      prompts.push({
        prompt: chunk.suggestion,
        timestamp: chunk.start,
      });
    }
  });

  return prompts;
};

module.exports = suggestionEngine;

