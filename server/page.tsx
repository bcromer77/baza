const runTranscription = async () => {
  const response = await fetch('http://localhost:5000/api/transcribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: 'https://youtube.com/watch?v=example1'
    })
  });

  const data = await response.json();
  console.log('🎙️ Transcription Result:', data);
};

// Add this button to the JSX (inside return)
<button onClick={runTranscription} className="bg-amber-500 text-white px-4 
py-2 rounded mt-4">
  Run Whisper Demo
</button>

