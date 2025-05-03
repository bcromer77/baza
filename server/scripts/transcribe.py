import whisper

def transcribe(audio_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_path, language=None)  # Auto-detect language

    return {
        "transcript": result["text"],
        "language": result["language"],
        "segments": result.get("segments", [])
    }

