# scripts/transcribe.py
import sys
import os
import whisper
import json

def transcribe(file_path):
    if not os.path.exists(file_path):
        print(json.dumps({ "error": f"File not found: {file_path}" }))
        sys.exit(1)

    try:
        model = whisper.load_model("base")
        result = model.transcribe(file_path)

        segments = []
        for segment in result.get("segments", []):
            segments.append({
                "text": segment["text"].strip(),
                "start": segment["start"],
                "end": segment["end"],
                "confidence": segment.get("avg_logprob", 0)
            })

        print(json.dumps(segments))

    except Exception as e:
        print(json.dumps({ "error": str(e) }))
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({ "error": "Usage: python3 transcribe.py path/to/audio.mp3" }))
        sys.exit(1)

    audio_path = sys.argv[1]
    transcribe(audio_path)

