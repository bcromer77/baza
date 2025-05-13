'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function DropUrls() {
  const [urls, setUrls] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setResult('');
    try {
      const response = await fetch('/api/transcribe-urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urls: urls.split('\n').map(u => u.trim()).filter(Boolean),
        }),
      });
      const data = await response.json();
      setResult(data.message || '✅ Transcription triggered successfully');
    } catch (err) {
      console.error(err);
      setResult('❌ Failed to trigger transcription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl shadow-xl text-white w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🎥 Drop or Paste Video URLs</h2>
      <Textarea
        rows={6}
        placeholder="Paste YouTube, TikTok or IG URLs here, one per line"
        className="mb-4 text-black"
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : '🎙️ Start Transcription'}
      </Button>
      {result && <p className="mt-4 text-sm text-green-400">{result}</p>}
    </div>
  );
}

