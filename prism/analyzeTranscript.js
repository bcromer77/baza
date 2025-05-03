const analyzeChunk = (text) => {
  const lower = text.toLowerCase();

  // 🎭 Emotion Tags
  const emotion = /empower|amazing|confident|strength|proud/.test(lower)
    ? "empowering"
    : /sad|cry|afraid|lost/.test(lower)
    ? "vulnerable"
    : /excited|fun|wow/.test(lower)
    ? "excited"
    : "neutral";

  // 🎙️ Tone
  const tone = /i believe|let me help|i want to/.test(lower)
    ? "inspirational"
    : /funny|joke/.test(lower)
    ? "playful"
    : "personal";

  // 🌍 Topics
  const topic = /lisbon|paris|london/.test(lower)
    ? "location"
    : /fashion|jeans|dress/.test(lower)
    ? "style"
    : /story|career|identity/.test(lower)
    ? "values"
    : "general";

  // 💡 Monetization Suggestion
  const suggestion =
    lower.includes("lisbon") && lower.includes("jeans")
      ? "📸 Suggest Fashion Supper Club in Lisbon"
      : lower.includes("career") && lower.includes("speak")
      ? "🎤 Suggest Speaker Booking"
      : lower.includes("burnout") || lower.includes("resilience")
      ? "🌿 Recommend Wellness Retreat Collab"
      : null;

  return { emotion, tone, topic, suggestion };
};

module.exports = function analyzeTranscript(transcript) {
  const lower = transcript.toLowerCase();
  const emotionalTriggers = [];
  const matchedBrands = [];
  let sentiment = "Neutral";
  let roryLogic = "";

  // 🎯 Rory Logic Block
  if (lower.includes("confidence")) {
    emotionalTriggers.push("self-belief", "empowerment");
    matchedBrands.push("Mindvalley", "BetterUp");
    sentiment = "Inspired";
    roryLogic =
      "This content reframes insecurity as a journey to power, which premium coaching brands are desperate to co-opt.";
  }

  // 🧩 Run analyzeChunk for deeper metadata
  const chunkInsights = analyzeChunk(transcript);

  return {
    sentiment,
    emotionalTriggers,
    matchedBrands,
    roryLogic,
    ...chunkInsights, // 👈 Adds: emotion, tone, topic, suggestion
  };
};
const analyzeChunk = (text) => {
  const lower = text.toLowerCase();

  // 🎭 Emotion Tags
  const emotion = /empower|amazing|confident|strength|proud/.test(lower)
    ? "empowering"
    : /sad|cry|afraid|lost/.test(lower)
    ? "vulnerable"
    : /excited|fun|wow/.test(lower)
    ? "excited"
    : "neutral";

  // 🎙️ Tone
  const tone = /i believe|let me help|i want to/.test(lower)
    ? "inspirational"
    : /funny|joke/.test(lower)
    ? "playful"
    : "personal";

  // 🌍 Topics
  const topic = /lisbon|paris|london/.test(lower)
    ? "location"
    : /fashion|jeans|dress/.test(lower)
    ? "style"
    : /story|career|identity/.test(lower)
    ? "values"
    : "general";

  // 💡 Monetization Suggestion
  const suggestion =
    lower.includes("lisbon") && lower.includes("jeans")
      ? "📸 Suggest Fashion Supper Club in Lisbon"
      : lower.includes("career") && lower.includes("speak")
      ? "🎤 Suggest Speaker Booking"
      : lower.includes("burnout") || lower.includes("resilience")
      ? "🌿 Recommend Wellness Retreat Collab"
      : null;

  return { emotion, tone, topic, suggestion };
};

module.exports = analyzeChunk;

