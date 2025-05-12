const vectorDB: Record<string, { vector: number[]; creatorId: string; imagePath: string }> = {};

export function storeVector(creatorId: string, vector: number[], imagePath: string) {
  vectorDB[creatorId] = { vector, creatorId, imagePath };
}

export function searchVector(queryVec: number[], topK = 1) {
  const scores = Object.values(vectorDB).map(entry => {
    const score = cosineSimilarity(queryVec, entry.vector);
    return { ...entry, score };
  });
  return scores.sort((a, b) => b.score - a.score).slice(0, topK);
}

function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val ** 2, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val ** 2, 0));
  return dot / (normA * normB);
}

