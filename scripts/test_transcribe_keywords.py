import whisper
import yt_dlp
import os
import re

# Step 1: Download audio
def download_audio(url, output_path="downloads/audio.mp3"):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output_path,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'quiet': False,
        'noplaylist': True,
    }

    print(f"⬇️ Downloading from {url} to {output_path}")
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

    if not os.path.exists(output_path):
        raise FileNotFoundError(f"❌ Audio not downloaded: {output_path}")

    print(f"✅ Download complete: {output_path}")
    return output_path

# Step 2: Transcribe
def transcribe_audio(path):
    print("🔍 Transcribing...")
    model = whisper.load_model("base")
    result = model.transcribe(path)
    text = result.get("text", "")
    print("📝 Transcript (first 300 chars):")
    print(text[:300])
    return text

# Step 3: Keyword Matching
def match_keywords(text, keywords):
    text_lower = text.lower()
    matched = [kw for kw in keywords if kw.lower() in text_lower]
    print("🔎 Matched Keywords:", matched)
    if not matched:
        print("⚠️ No exact keyword matches found. Try expanding or checking casing.")
    return matched

# === MAIN RUN ===
if __name__ == "__main__":
    url = "https://www.youtube.com/watch?v=GemiO6C-J6w"
    keywords = [
        "HIV", "PReP", "Type 1 diabetes", "Dexcom", "Insulin", 
        "FreeStyle Libre", "Novo Nordisk", "Abbott", "T1D"
    ]

    os.makedirs("downloads", exist_ok=True)
    audio_path = download_audio(url)
    transcript = transcribe_audio(audio_path)
    print("\n📄 Full Transcript:")
    print(transcript)
    print("\n🧠 Keyword Analysis:")
    match_keywords(transcript, keywords)

