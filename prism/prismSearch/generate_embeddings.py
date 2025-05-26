#!/usr/bin/env python3
from dotenv import load_dotenv
import os
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct
from openai import OpenAI

# Load environment variables
load_dotenv(dotenv_path="/Users/macbook/Downloads/creator-torch-unzipped/.env.local")

# Initialize OpenAI and Qdrant clients
openai_client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
qdrant_client = QdrantClient(
    host=os.environ.get("QDRANT_HOST", "localhost"),
    port=int(os.environ.get("QDRANT_PORT", 6333)),
)

# Example text chunks to embed
chunks = [
    "This is a great day for the Audiantix project!",
    "We are working with eco skincare creators.",
    "Video transcripts are stored in MongoDB."
]

# Create embeddings
for i, text in enumerate(chunks):
    embedding = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    ).data[0].embedding

    # Save to Qdrant
    qdrant_client.upsert(
        collection_name="prism_chunks",
        points=[PointStruct(id=i, vector=embedding, payload={"text": text})]
    )

print("✅ All embeddings generated and stored in Qdrant!")

