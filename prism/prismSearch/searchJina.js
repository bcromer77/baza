import axios from 'axios';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function searchJina(query) {
  // 1️⃣ Create an embedding
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: query,
  });

  const queryEmbedding = embeddingResponse.data[0].embedding;

  // 2️⃣ Call Jina’s REST endpoint (replace with your actual endpoint!)
  const jinaUrl = process.env.JINA_SEARCH_ENDPOINT; // e.g., "https://api.jina.ai/v1/search"
  const jinaApiKey = process.env.JINA_API_KEY;

  const response = await axios.post(
    jinaUrl,
    {
      data: [queryEmbedding],
      top_k: 5
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jinaApiKey}`,
      }
    }
  );

  console.log("Search results:", response.data);
}

// Test
searchJina("Travel influencer speaking in Seville");

