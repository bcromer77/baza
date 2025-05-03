import whisper
from keybert import KeyBERT
import subprocess
import os
import sys
from dotenv import load_dotenv

load_dotenv()

def download_youtube_audio(youtube_url, output_path="youtube_audio.mp3"):
    print("🎬 Downloading YouTube audio...")
    try:
        subprocess.run([
            "yt-dlp",
            "-f", "bestaudio",
            "--extract-audio",
            "--audio-format", "mp3",
            "-o", output_path,
            youtube_url
        ], check=True)
        print(f"✅ Downloaded to {output_path}")
        return output_path
    except subprocess.CalledProcessError as e:
        print("❌ Failed to download audio:", e)
        sys.exit(1)

def transcribe_and_extract(audio_path):
    print("🧠 Loading models...")
    model = whisper.load_model("base")
    kw_model = KeyBERT()

    print("📝 Transcribing...")
    result = model.transcribe(audio_path)
    transcript = result["text"].strip()
    print("\n📝 Transcript:\n", transcript)

    print("\n🔍 Extracting keywords...")
    keywords = kw_model.extract_keywords(transcript, keyphrase_ngram_range=(1, 2), stop_words="english", top_n=10)
    print("\n🏷 Keywords:\n", [kw[0] for kw in keywords])

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python transcribe_youtube.py <YouTube URL>")
        sys.exit(1)

    youtube_url = sys.argv[1]
    audio_path = download_youtube_audio(youtube_url)
    transcribe_and_extract(audio_path)

