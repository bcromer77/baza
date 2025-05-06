const fs = require("fs");
const path = require("path");

const transcriptFile = path.join(__dirname, "whatsyourismKMapproval 
req.mp4.txt");
const outputFile = path.join(__dirname, "chunks.json");

if (!fs.existsSync(transcriptFile)) {
  console.error("❌ Transcript file not found:", transcriptFile);
  process.exit(1);
}

const lines = fs.readFileSync(transcriptFile, "utf-8").split("\n");

const chunkRegex = /\[(\d{2}:\d{2}\.\d{3}) --> 
(\d{2}:\d{2}\.\d{3})\]\s+(.*)/;

function timeToSeconds(t) {
  const [mins, secs] = t.split(":");
  return parseFloat(mins) * 60 + parseFloat(secs);
}

const chunks = [];

for (const line of lines) {
  const match = chunkRegex.exec(line);
  if (match) {
    const [_, start, end, text] = match;
    chunks.push({
      start: timeToSeconds(start),
      end: timeToSeconds(end),
      text: text.trim()
    });
  }
}

fs.writeFileSync(outputFile, JSON.stringify(chunks, null, 2));
console.log(`✅ Saved ${chunks.length} chunks to ${outputFile}`);

