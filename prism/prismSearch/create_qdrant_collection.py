from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

client = QdrantClient(host="localhost", port=6333)

collection_name = "prism_chunks"

# Delete if exists
if client.collection_exists(collection_name):
    client.delete_collection(collection_name)

# Create
client.create_collection(
    collection_name=collection_name,
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
)

print("✅ Collection created (no deprecation warning!)")

