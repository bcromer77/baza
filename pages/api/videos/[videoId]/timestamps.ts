// pages/api/videos/[videoId]/timestamps.ts

import { NextApiRequest, NextApiResponse } from 'next';

// Dummy in-memory store (replace with DB)
let mockTimestamps = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { videoId } = req.query;

  if (typeof videoId !== 'string') {
    return res.status(400).json({ error: 'Invalid videoId' });
  }

  if (req.method === 'GET') {
    const timestamps = mockTimestamps[videoId] || [];
    return res.status(200).json(timestamps);
  }

  if (req.method === 'POST') {
    const body = req.body;

    const newTimestamp = {
      id: `${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };

    if (!mockTimestamps[videoId]) {
      mockTimestamps[videoId] = [];
    }

    mockTimestamps[videoId].push(newTimestamp);

    return res.status(201).json(newTimestamp);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

