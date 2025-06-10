import dotenv from "dotenv";
dotenv.config();

console.log("📘 OPENAI_API_KEY loaded:", process.env.OPENAI_API_KEY?.slice(0, 10));

import { analyzeTranscript } from "./prism/analyzeTranscript.js";

const main = async () => {
  const sampleTranscript = `
    Just landed in Lisbon — I’m so excited for this solo trip.
    If you’ve never surfed the Portuguese coast, Nazaré is unreal.
    It’s a total reset from burnout.
  `;

  const result = await analyzeTranscript({
    transcriptText: sampleTranscript,
    creatorId: "creator001",
    videoId: "vid001"
  });

  console.log(`✅ Successfully inserted ${result.length} chunks`);
};

main();

