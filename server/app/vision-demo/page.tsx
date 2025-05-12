'use client';
import { useState } from 'react';
import { VisionSearchCard } from '@/components/vision/VisionSearchCard';

export default function VisionDemoPage() {
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const res = await fetch('/api/vision-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-8 space-y-6">
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type your campaign idea..."
        className="w-full border rounded p-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Find Matching Creator
      </button>
      {result && <VisionSearchCard {...result} />}
    </div>
  );
}

