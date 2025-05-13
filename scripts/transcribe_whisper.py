import sys
import whisper

if len(sys.argv) < 2:
    print("❌ Usage: python3 transcribe_whisper.py <audio_path>")
    sys.exit(1)

audio_path = sys.argv[1]

try:
    model = whisper.load_model("base")  # or "small" / "medium"
    result = model.transcribe(audio_path)
    print(result['text'])
except Exception as e:
    print(f"❌ Transcription failed: {str(e)}")
    sys.exit(1)

