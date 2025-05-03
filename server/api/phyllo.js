// server/api/phyllo.js
import fetch from 'node-fetch';

export async function fetchPhylloData(creatorId) {
  const response = await 
fetch(`https://api.phyllo.com/v1/creators/${creatorId}`, {
    headers: {
      'Authorization': `Bearer ${process.env.PHYLLO_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch creator data from Phyllo');
  }

  const data = await response.json();
  return data;
}

