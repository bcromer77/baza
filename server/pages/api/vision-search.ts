import { embedImageBase64 } from '@/utils/embedImageBase64';
import { searchVector } from '@/utils/vectorStore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { query } = req.body;

  const embedRes = await fetch('https://api.cohere.ai/v1/embed', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model: 'embed-english-v3.0', texts: [query] })
  });
  const { embeddings } = await embedRes.json();
  const results = searchVector(embeddings[0]);

  const explanation = `This creator fits your brief because they visually convey wellness and youth in a Mediterranean setting.`;

  res.status(200).json({
    creatorId: results[0].creatorId,
    imagePath: results[0].imagePath,
    score: results[0].score,
    explanation
  });
}

