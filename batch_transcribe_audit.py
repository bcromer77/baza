#!/usr/bin/env python3
import os
import sys
import time
import csv
import random
import subprocess
import whisper

# ——— CONFIG ———
# 1) Pick your model size (“tiny”, “base”, “small”, “medium”, “large”)
MODEL_SIZE = "tiny"  # switch to tiny for speed
# 2) Where to put your output CSV:
OUTPUT_CSV = "whisper_flagged_segments_batch80.csv"
# 3) Your list of YouTube URLs to process:
video_urls = [
    "https://www.youtube.com/watch?v=dc1ygaB5oZ0",
    "https://www.youtube.com/watch?v=AAyy9AEqhzw",
    "https://www.youtube.com/watch?v=Fr8nrPtIf74",
    "https://www.youtube.com/watch?v=uM9RuLUpSUc",
    "https://www.youtube.com/watch?v=o1c18NWzk-Y",
    "https://www.youtube.com/watch?v=nXebe0YgUOg",
    "https://www.youtube.com/watch?v=kgsmpkiBXI0",
    "https://www.youtube.com/watch?v=O8TT5OWH3RI",
    "https://www.youtube.com/watch?v=cbvyoXrAZQk",
    "https://www.youtube.com/watch?v=8DVYhYuUYII",
    "https://www.youtube.com/watch?v=NqP4Vv8sspo",
    "https://www.youtube.com/watch?v=A7555NDsk8M",
    "https://www.youtube.com/watch?v=4Hrzt_EId_M",
    "https://www.youtube.com/watch?v=SR0E5A6i_ss",
    "https://www.youtube.com/watch?v=ByEFKoRiVlI",
    "https://www.youtube.com/watch?v=s7nyL0WHQjs",
    "https://www.youtube.com/watch?v=oEHaXD4AHFo",
    "https://www.youtube.com/watch?v=kIfCqmt5svI",
    "https://www.youtube.com/watch?v=YDXNal_dUuY",
    "https://www.youtube.com/watch?v=NFliPZGjNLo",
    "https://www.youtube.com/watch?v=cE77qY0R-g0",
    "https://www.youtube.com/watch?v=WEsE1He9MjY",
    "https://www.youtube.com/watch?v=nj5BQ0gFuXw",
    "https://www.youtube.com/watch?v=Lm6CO424iT4",
    "https://www.youtube.com/watch?v=0EytX4DQtHQ",
    "https://www.youtube.com/watch?v=X5lBVCZslQo",
    "https://www.youtube.com/watch?v=ktjNPDx99is",
    "https://www.youtube.com/watch?v=0ef5qoZ7_qg",
    "https://www.youtube.com/watch?v=chXI1C4AG5A",
    "https://www.youtube.com/watch?v=Rcxf6ZsX7G0",
    "https://www.youtube.com/watch?v=FzztycIIXsA",
    "https://www.youtube.com/watch?v=3O1ZyfRVMjU",
    "https://www.youtube.com/watch?v=9rJyTapmGpo",
    "https://www.youtube.com/watch?v=-5asmwXqEfQ",
    "https://www.youtube.com/watch?v=m30ijGGpw8Q",
    "https://www.youtube.com/watch?v=CLyh8iQ9sRM",
    "https://www.youtube.com/watch?v=8fHtmxbsVrA",
    "https://www.youtube.com/watch?v=BjVd49owWII",
    "https://www.youtube.com/watch?v=uL2CQU9OrF0",
    "https://www.youtube.com/watch?v=-X6W3K2jHsU",
    "https://www.youtube.com/watch?v=T1CzqAZScms",
    "https://www.youtube.com/watch?v=WXMIyWdS5Cg",
    "https://www.youtube.com/watch?v=tSoL2Su9T6w",
    "https://www.youtube.com/watch?v=WKJidPq4c2c",
    "https://www.youtube.com/watch?v=wKZRFiRgYbo",
    "https://www.youtube.com/watch?v=tJagAb7esBM",
    "https://www.youtube.com/watch?v=b2zFF7bPtHk",
    "https://www.youtube.com/watch?v=bJX87GWgV1Y",
    "https://www.youtube.com/watch?v=aa1ph6wgCpI",
    "https://www.youtube.com/watch?v=p3988PncLHk",
]
# ——— END CONFIG ———

def download_audio(url, filename="temp_audio.webm"):
    """Use yt-dlp to download only the audio to a temporary file."""
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
    """Run whisper transcription and return any flagged segments."""
    result = model.transcribe(audio_path, word_timestamps=True)
    flags = []
    for segment in result.get("segments", []):
        if segment["no_speech_prob"] > 0.5:
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
        print(f"✅ Downloading {url} …")
        code, out = download_audio(url)
        if code != 0 or not os.path.exists("temp_audio.webm"):
            rows.append({"url": url, "error": out.replace("\n"," "), "flagged_segments": ""})
            continue

        print("📝 Transcribing …")
        try:
            flags = transcribe_and_flag(model, "temp_audio.webm")
            rows.append({
                "url": url,
                "error": "",
                "flagged_segments": " | ".join(
                    f"[{f['start']:.1f}-{f['end']:.1f}s]{f['text']}" for f in flags
                ),
            })
        except Exception as e:
            rows.append({"url": url, "error": str(e), "flagged_segments": ""})

        os.remove("temp_audio.webm")
        sleep_time = 30 + 5 * random.random()
        print(f"⏱️  Sleeping {sleep_time:.1f}s …")
        time.sleep(sleep_time)

    # write CSV
    with open(OUTPUT_CSV, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["url", "error", "flagged_segments"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"✅ Done → {OUTPUT_CSV}")

if __name__ == "__main__":
    main()

