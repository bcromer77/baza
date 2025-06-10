import dotenv from "dotenv";
dotenv.config();

import { searchTranscript } from "./prism/searchTranscript.js";

const prompts = [
  "Portugal retreat Q3",
  "Lisbon surf burnout reset",
  "solo travel in Portugal for women",
  "Nazaré surfing trip for creators"
];

const run = async () => {
  for (const prompt of prompts) {
    console.log(`\n🔎 Prompt: ${prompt}`);
    const results = await searchTranscript(prompt, 3);

    if (!results.length) {
      console.log("⚠️ No matches found.");
    } else {
      results.forEach((r, i) => {
        console.log(`\n#${i + 1}`);
        console.log(`📝 ${r.text}`);
        console.log(`📌 Creator ID: ${r.creatorId}`);
        console.log(`⏱️ Timestamp: ${r.timestamp}`);
        console.log(`🎯 Score: ${r.score.toFixed(3)}`);
      });
    }
  }
};

run();

