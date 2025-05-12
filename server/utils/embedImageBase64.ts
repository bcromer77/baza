export async function embedImageBase64(base64: string): Promise<{ vector: number[] }> {
  try {
    // Use Cohere Embed API v4 (or swap to Aya fallback below)
    const res = await fetch('https://api.cohere.ai/v1/embed', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model: 'embed-image-v4.0', image: base64 })
    });
    const data = await res.json();
    return { vector: data.embeddings[0] };
  } catch (err) {
    console.error('Falling back to Aya Vision:', err);
    // TODO: Add Aya fallback logic here
    throw new Error('Embedding failed');
  }
}
