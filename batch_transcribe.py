import subprocess

video_urls = [
    "https://www.youtube.com/watch?v=cNd_mEIuICk",
    "https://www.youtube.com/watch?v=bq4n6eVz_q8",
    "https://www.youtube.com/watch?v=6EwA5rB8vVA",
    "https://www.youtube.com/watch?v=oy2aOCzhMpc",
    "https://www.youtube.com/watch?v=-WMDXVIdQc0",
    "https://www.youtube.com/watch?v=VZuehKIBcpE",
    "https://www.youtube.com/watch?v=AD0ZYoQWBEs",
    "https://www.youtube.com/watch?v=LptUXXI8D5g",
    "https://www.youtube.com/watch?v=o8v-rCx7Kgc",
    "https://www.youtube.com/watch?v=Lqfe9UMdFJE",
    "https://www.youtube.com/watch?v=JJrtcPZrOZU",
    "https://www.youtube.com/watch?v=oioDHwkr3HE",
    "https://www.youtube.com/watch?v=pteShCwr_5w",
    "https://www.youtube.com/watch?v=44JM2Qiu2jc"
]

for url in video_urls:
    print(f"\n🔁 Transcribing: {url}")
    subprocess.run(["python3", "scripts/transcribe.py", url])

