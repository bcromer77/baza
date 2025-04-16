import sys
import whisper

video_url = sys.argv[1]
model = whisper.load_model("base")

result = model.transcribe(video_url)
for line in result["text"].split('. '):
    print(line.strip())

