'use client';

import { useEffect, useState } from 'react';

export default function BrainInsights() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const res = await fetch('/api/brain');
    const data = await res.json();
    setInsights(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  if (loading) return <p>🧠 Thinking...</p>;

  if (!insights) return <p>⚠️ No insights found.</p>;

  return (
    <div className="p-4 rounded-xl border shadow-xl bg-white text-black 
mt-4 space-y-2">
      <h2 className="text-xl font-bold">🧠 Brain Insights</h2>
      <p><strong>Event Idea:</strong> {insights.eventIdea}</p>
      <p><strong>Audience Geo:</strong> {insights.geoHotspot}</p>
      <p><strong>Emotional Hook:</strong> {insights.emotionalAngle}</p>
      <p><strong>Monetization Prompt:</strong> 
{insights.monetizationPrompt}</p>
    </div>
  );
}

