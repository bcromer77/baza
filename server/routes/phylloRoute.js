// server/routes/phylloRoute.js
import { fetchPhylloData } from '../api/phyllo';

export default async function handler(req, res) {
  try {
    const { creatorId } = req.query;  // Ensure you pass the correct 
creator ID
    const creatorData = await fetchPhylloData(creatorId);
    res.status(200).json(creatorData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

