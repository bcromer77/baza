#!/usr/bin/env python3
import os
import sys
import time
import csv
import random
import subprocess
import whisper

# ——— CONFIG ———
MODEL_SIZE = "tiny"
OUTPUT_CSV = "whisper_flagged_segments_batch9_rerun.csv"
video_urls = [
    "https://www.youtube.com/watch?v=mgOY0Xie0Yo",
    "https://www.youtube.com/watch?v=360RpN3PsO0",
    "https://www.youtube.com/watch?v=113zYrmOyV4",
    "https://www.youtube.com/watch?v=3FcWCZ79zr0",
    "https://www.youtube.com/watch?v=jBDTpGr540s",
    "https://www.youtube.com/watch?v=tLskNSyWyfk",
    "https://www.youtube.com/watch?v=j4PD0rtPZk0",
    "https://www.youtube.com/watch?v=9rI10rWrHnc",
    "https://www.youtube.com/watch?v=LUbfYKk2v-U",
    "https://www.youtube.com/watch?v=Xmx_Z8igRbg",
    "https://www.youtube.com/watch?v=8AaDJqIxjBE",
    "https://www.youtube.com/watch?v=tEkFrzKpU1k",
    "https://www.youtube.com/watch?v=4k-ie1Eu7MM",
    "https://www.youtube.com/watch?v=8D1lEB5nLVk",
    "https://www.youtube.com/watch?v=ZklsqkFMvCU",
    "https://www.youtube.com/watch?v=L16FUJOYvJQ",
    "https://www.youtube.com/watch?v=nHFHCnKyIFs",
    "https://www.youtube.com/watch?v=aeFuDJdHD3U",
    "https://www.youtube.com/watch?v=i0D3RJXwz2M",
    "https://www.youtube.com/watch?v=-yUyNgSxgNU",
    "https://www.youtube.com/watch?v=_xlnYzfl1fw",
    "https://www.youtube.com/watch?v=xNrIxCvqXLY",
    "https://www.youtube.com/watch?v=x0ZsfkY0OE4",
    "https://www.youtube.com/watch?v=RnT_R1YR4hE",
    "https://www.youtube.com/watch?v=HOUZTu5QrBQ",
    "https://www.youtube.com/watch?v=1GJo_A-KS4o",
    "https://www.youtube.com/watch?v=9HWlNCFvCYY",
    "https://www.youtube.com/watch?v=FrEhqudcP_E",
    "https://www.youtube.com/watch?v=kZrhtzxHeKY",
    "https://www.youtube.com/watch?v=mMK2Qj5HNN4"
]
# ——— END CONFIG ———

def download_audio(url, filename="temp_audio.webm"):
    cmd = [
        "yt-dlp",
        "--no-playlist",
        "-f", "bestaudio[ext=webm]/bestaudio",
        "-o", filename,
        url
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    return proc.returncode, proc.stdout + proc.stderr

def transcribe_and_flag(model, audio_path):
    result = model.transcribe(audio_path, word_timestamps=True)
    flags = []
    for segment in result.get("segments", []):
        flags.append({
            "start": segment["start"],
            "end": segment["end"],
            "text": segment["text"].strip(),
            "no_speech_prob": segment["no_speech_prob"],
        })
    return flags

def main():
    model = whisper.load_model(MODEL_SIZE)
    rows = []

    for url in video_urls:
        print(f"🎧 Downloading: {url}")
        code, out = download_audio(url)
        if code != 0 or not os.path.exists("temp_audio.webm"):
            rows.append({
                "url": url,
                "error": out.replace("\n", " "),
                "flagged_segments": "",
            })
            continue

        print("📝 Transcribing …")
        try:
            flags = transcribe_and_flag(model, "temp_audio.webm")
            rows.append({
                "url": url,
                "error": "",
                "flagged_segments": " | ".join(
                    f"[{f['start']:.1f}-{f['end']:.1f}s]{f['text']}"
                    for f in flags
                ),
            })
        except Exception as e:
            rows.append({
                "url": url,
                "error": str(e),
                "flagged_segments": "",
            })

        os.remove("temp_audio.webm")
        sleep_time = 30 + 5 * random.random()
        print(f"⏱️  Sleeping {sleep_time:.1f}s …")
        time.sleep(sleep_time)

    with open(OUTPUT_CSV, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["url", "error", "flagged_segments"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"✅ Done → {OUTPUT_CSV}")

if __name__ == "__main__":
    main()

