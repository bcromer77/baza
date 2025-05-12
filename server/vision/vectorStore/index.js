// server/vision/vectorStore/index.js

let vectorDB = [];

function storeEmbedding(creatorId, embedding, imagePath) {
  vectorDB.push({ creatorId, embedding, imagePath });
}

function cosineSim(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

function query(queryEmbedding) {
  let bestMatch = null;
  let bestScore = -1;

  for (const entry of vectorDB) {
    const score = cosineSim(queryEmbedding, entry.embedding);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch;
}

module.exports = { storeEmbedding, query };

