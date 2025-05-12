export default function handler(req, res) {
  const { campaignPrompt } = req.body
  const mockQuery = `Find creators talking about: ${campaignPrompt}`
  res.status(200).json({ query: mockQuery })
}

