export default async function handler(req, res) {
  const { creatorId } = req.query;
  try {
    const imagePath = `/public/creators/${creatorId}.png`;
    res.status(200).json({ imagePath });
  } catch {
    res.status(404).json({ error: 'Creator not found' });
  }
}

