import whisper
from keybert import KeyBERT
import sys
import os
import time
from pymongo import MongoClient
import logging
from dotenv import load_dotenv
from dotenv import load_dotenv
load_dotenv()
import whisper
from keybert import KeyBERT
import sys
import os
import time
import logging
from pymongo import MongoClient
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Connect to MongoDB Atlas
try:
    mongo_uri = os.getenv("MONGODB_URI")
    if not mongo_uri:
        raise Exception("MONGODB_URI is missing from .env")

    client = MongoClient(mongo_uri)
    db = client["creator-torch"]
    collection = db["transcripts"]
except Exception as e:
    logging.error("MongoDB connection failed: %s", e)
    collection = None

# Load Whisper model
model = whisper.load_model("base")
logging.info("Use pytorch device_name: cpu")

# Load KeyBERT
kw_model = KeyBERT(model="all-MiniLM-L6-v2")

# Get video path from command line
if len(sys.argv) < 2:
    print("Usage: python transcribe_and_extract.py path_to_video")
    sys.exit(1)

video_path = sys.argv[1]

# Start transcription
print("⏱ Transcribing with Whisper...")
result = model.transcribe(video_path)
transcript = result["text"]

# Output transcript
print("\n📝 Transcript:\n ", transcript)

# Keyword extraction
print("\n🔍 Extracting keywords...\n")
keywords = kw_model.extract_keywords(transcript, keyphrase_ngram_range=(1, 2), stop_words="english", top_n=10)
keyword_list = [kw for kw, _ in keywords]

# Output keywords
print("🏷 Keywords:\n", keyword_list)

# Attempt to cache results in MongoDB
if collection:
    try:
        doc = {
            "timestamp": time.time(),
            "filename": os.path.basename(video_path),
            "transcript": transcript,
            "keywords": keyword_list,
        }
        collection.insert_one(doc)
        print("✅ Cached to MongoDB")
    except Exception as e:
        logging.error("Failed to cache transcription: %s", e)
else:
    logging.warning("⚠️ Skipped MongoDB cache — no connection.")


# Load environment variables from .env
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Load Whisper and KeyBERT models
try:
    model = whisper.load_model("base")
    kw_model = KeyBERT()
except Exception as e:
    logger.error(f"Failed to load models: {e}")
    sys.exit(1)

# MongoDB Atlas connection
mongo_client = MongoClient(os.getenv("MONGODB_URI"))
db = mongo_client["creator_studio"]
cache_collection = db["cache"]

# Keyword extraction
def extract_keywords(text, top_n=10):
    try:
        keywords = kw_model.extract_keywords(
            text, keyphrase_ngram_range=(1, 2), stop_words="english", top_n=top_n
        )
        return [kw[0] for kw in keywords]
    except Exception as e:
        logger.error(f"Keyword extraction failed: {e}")
        return []

# Cache in MongoDB
def cache_transcription(video_id, transcript, keywords):
    try:
        cache_collection.insert_one({
            "video_id": video_id,
            "type": "transcriptions",
            "transcript": transcript,
            "keywords": keywords,
            "cacheExpires": int(time.time()) + 7 * 24 * 60 * 60  # 7-day TTL
        })
        logger.info(f"Cached transcription for video {video_id}")
    except Exception as e:
        logger.error(f"Failed to cache transcription: {e}")

# Check cache
def get_cached_transcription(video_id):
    try:
        cached = cache_collection.find_one({
            "video_id": video_id,
            "type": "transcriptions",
            "cacheExpires": {"$gt": int(time.time())}
        })
        return cached if cached else None
    except Exception as e:
        logger.error(f"Failed to check cache: {e}")
        return None

# Main
def main():
    if len(sys.argv) < 2:
        logger.error("No file path provided")
        print("Usage: python transcribe_and_extract.py <path_to_video_or_audio_file>")
        sys.exit(1)

    file_path = sys.argv[1]

    if not os.path.exists(file_path):
        logger.error(f"File '{file_path}' does not exist")
        print(f"Error: File '{file_path}' does not exist")
        sys.exit(1)

    valid_extensions = [".mp3", ".mp4", ".wav", ".m4a"]
    if not any(file_path.lower().endswith(ext) for ext in valid_extensions):
        logger.error(f"Unsupported file format: {file_path}")
        print(f"Error: File must be one of {valid_extensions}")
        sys.exit(1)

    video_id = os.path.basename(file_path)

    cached = get_cached_transcription(video_id)
    if cached:
        logger.info(f"Using cached transcription for {video_id}")
        print("\n📝 Transcript:\n", cached["transcript"])
        print("\n🏷 Keywords:\n", cached["keywords"])
        return

    logger.info("⏱ Transcribing with Whisper...")
    try:
        result = model.transcribe(file_path)
        transcript = result["text"]
        print("\n📝 Transcript:\n", transcript)
    except Exception as e:
        logger.error(f"Transcription failed: {e}")
        sys.exit(1)

    logger.info("🔍 Extracting keywords...")
    keywords = extract_keywords(transcript)
    print("\n🏷 Keywords:\n", keywords)

    cache_transcription(video_id, transcript, keywords)

if __name__ == "__main__":
    main()
import whisper
from keybert import KeyBERT
import sys
import os
import time
from pymongo import MongoClient
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Load Whisper and KeyBERT models
try:
    model = whisper.load_model("base")
    kw_model = KeyBERT()
except Exception as e:
    logger.error(f"Failed to load models: {e}")
    sys.exit(1)

# MongoDB setup
mongo_client = MongoClient(os.getenv("MONGO_URI"))
import whisper
from keybert import KeyBERT
import sys
import os
import time
from pymongo import MongoClient
import logging
from dotenv import load_dotenv

# ✅ Load environment variables from .env
load_dotenv()

# 📜 Set up logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# 🤖 Load Whisper and KeyBERT models
try:
    model = whisper.load_model("base")
    kw_model = KeyBERT()
except Exception as e:
    logger.error(f"Failed to load models: {e}")
    sys.exit(1)

# 🧠 MongoDB setup
mongo_client = MongoClient(os.getenv("MONGO_URI"))
db = mongo_client["creator_studio"]
cache_collection = db["cache"]

# 🔍 Extract keywords from transcript
def extract_keywords(text, top_n=10):
    try:
        keywords = kw_model.extract_keywords(
            text,
            keyphrase_ngram_range=(1, 2),
            stop_words="english",
            top_n=top_n
        )
        return [kw[0] for kw in keywords]
    except Exception as e:
        logger.error(f"Keyword extraction failed: {e}")
        return []
db = mongo_client["creator_studio"]
cache_collection = db["cache"]

# Extract keywords from transcript
def extract_keywords(text, top_n=10):
    try:
        keywords = kw_model.extract_keywords(
            text,
            keyphrase_ngram_range=(1, 2),
            stop_words="english",
            top_n=top_n
        )
        return [kw[0] for kw in keywords]
    except Exception as e:
        logger.error(f"Keyword extraction failed: {e}")
        return []

# Cache results to MongoDB
def cache_transcription(video_id, transcript, keywords):
    try:
        cache_collection.insert_one({
            "video_id": video_id,
            "type": "transcriptions",
            "transcript": transcript,
            "keywords": keywords,
            "cacheExpires": int(time.time()) + 7 * 24 * 60 * 60  # 7-day TTL
        })
        logger.info(f"Cached transcription for video {video_id}")
    except Exception as e:
        logger.error(f"Failed to cache transcription: {e}")

# Retrieve cached results
def get_cached_transcription(video_id):
    try:
        return cache_collection.find_one({
            "video_id": video_id,
            "type": "transcriptions",
            "cacheExpires": { "$gt": int(time.time()) }
        })
    except Exception as e:
        logger.error(f"Failed to check cache: {e}")
        return None

# Main function
def main():
    if len(sys.argv) < 2:
        print("Usage: python transcribe_and_extract.py <path_to_video_or_audio_file>")
        sys.exit(1)

    file_path = sys.argv[1]

    if not os.path.exists(file_path):
        print(f"❌ File does not exist: {file_path}")
        sys.exit(1)

    video_id = os.path.basename(file_path)
    cached = get_cached_transcription(video_id)

    if cached:
        print("\n📝 Transcript (from cache):\n", cached["transcript"])
        print("\n🏷 Keywords (from cache):\n", cached["keywords"])
        return

    print("⏱ Transcribing with Whisper...")
    try:
        result = model.transcribe(file_path)
        transcript = result["text"]
        print("\n📝 Transcript:\n", transcript)
    except Exception as e:
        logger.error(f"Transcription failed: {e}")
        sys.exit(1)

    print("\n🔍 Extracting keywords...")
    keywords = extract_keywords(transcript)
    print("\n🏷 Keywords:\n", keywords)

    cache_transcription(video_id, transcript, keywords)

if __name__ == "__main__":
    main()

