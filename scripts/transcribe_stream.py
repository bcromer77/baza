import sys
import subprocess
import json
import whisper
import os

youtube_url = sys.argv[1]
model = whisper.load_model("base")

# Set manual temp filename
temp_filename = "temp_audio.m4a"

# Download best audio to that file
download_cmd = [
    "yt-dlp",
    "-f", "bestaudio[ext=m4a]/bestaudio",
    "-o", temp_filename,
    youtube_url
]

print("📥 Downloading audio from YouTube...")
result = subprocess.run(download_cmd, capture_output=True)
if result.returncode != 0:
    print("❌ yt-dlp failed:")
    print(result.stderr.decode())
    sys.exit(1)

# Validate the file
if not os.path.exists(temp_filename) or os.path.getsize(temp_filename) < 1000:
    print("❌ Audio file missing or too small.")
    sys.exit(1)

# Transcribe using Whisper
print("🧠 Transcribing with Whisper...")
try:
    audio = whisper.load_audio(temp_filename)
    result = model.transcribe(audio, fp16=False)
    os.remove(temp_filename)
except Exception as e:
    os.remove(temp_filename)
    print("❌ Whisper failed:")
    raise e

# Print results
output = {
    "text": result["text"],
    "segments": [
        {"start": seg["start"], "end": seg["end"], "text": seg["text"]}
        for seg in result["segments"]
    ]
}

print(json.dumps(output))

