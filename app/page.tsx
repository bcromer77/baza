'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function promptToQuery(prompt: string) {
  if (prompt.toLowerCase().includes("portugal") && 
prompt.toLowerCase().includes("ozempic")) {
    return {
      topics: ["Ozempic"],
      location: "Portugal",
      budget: 5000,
      audienceSizeMin: 20000
    };
  }
  return {
    topics: [],
    location: "",
    budget: 0,
    audienceSizeMin: 0
  };
}

type Insight = {
  geography: Record<string, number>;
  intent: Record<string, number>;
  behavior: Record<string, number>;
  engagementTimes: Record<string, string>;
  sentiment: Record<string, { sentiment: string; score: number }>;
};

type Prompt = { text: string };

type DashboardData = {
  audienceInsights: Insight[];
  monetizationPrompts: Prompt[];
  brandOffers: { id: number; brand: string; offer: string }[];
};

export default function CreatorDashboard() {
  const searchParams = useSearchParams();
  const creatorId = searchParams.get('id');

  const [dashboardData, setDashboardData] = useState<DashboardData | 
null>(null);
  const [query, setQuery] = useState({ location: '', topic: '', sentiment: 
'', minEngagement: '' });
  const [queryResult, setQueryResult] = useState<any>(null);
  const [prompt, setPrompt] = useState('');
  const [brandResults, setBrandResults] = useState<any[]>([]);

  useEffect(() => {
    if (!creatorId) return;
    fetch(`http://localhost:5000/api/creators/${creatorId}/dashboard`)
      .then(res => res.json())
      .then(data => setDashboardData(data))
      .catch(err => console.error('Dashboard Error:', err));
  }, [creatorId]);

  const handleQuerySubmit = async (e: any) => {
    e.preventDefault();
    const response = await 
fetch(`http://localhost:5000/api/creators/${creatorId}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    });
    const data = await response.json();
    setQueryResult(data);
  };

  const runBrandSearch = async () => {
    const searchQuery = promptToQuery(prompt);
    const response = await 
fetch('http://localhost:5000/api/brands/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(searchQuery)
    });
    const data = await response.json();
    setBrandResults(data);
  };

  if (!dashboardData) return <div className="text-white p-10">Loading 
dashboard...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400 
text-center">Your Creator Dashboard</h1>

      {/* 🔍 Audience Insights */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Audience Insights</h2>
        {dashboardData.audienceInsights.map((insight, index) => (
          <div key={index} className="bg-gray-900 p-4 rounded-lg mb-4">
            <p>📍 Location: {Object.entries(insight.geography)[0]?.join(': 
')}%</p>
            <p>🎯 Intent: {Object.entries(insight.intent)[0]?.join(': 
')}%</p>
            <p>📊 Behavior: {Object.entries(insight.behavior)[0]?.join(': 
')}%</p>
            <p>⏰ Engagement: {insight.engagementTimes.peak}</p>
            <p>🧠 Sentiment:</p>
            <ul className="ml-4">
              {Object.entries(insight.sentiment).map(([topic, data]) => (
                <li key={topic}>
                  {topic}: {data.sentiment} (score {data.score})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 🔥 Hot Opportunities */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔥 Hot 
Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Lisbon Brunch Collab', desc: 'Sponsored by Lumi' },
            { title: 'Ozempic Trend Series', desc: '3 creators, €7K' },
            { title: 'Galway Eco Routine', desc: '€3K, Zero-Waste theme' 
},
          ].map((item, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-lg">
              <p className="font-bold">{item.title}</p>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 Query Your Audience */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Run a Query</h2>
        <form onSubmit={handleQuerySubmit} className="space-y-4 max-w-md">
          <input
            type="text"
            placeholder="Location (e.g. Dublin)"
            className="w-full p-2 rounded text-black"
            value={query.location}
            onChange={e => setQuery({ ...query, location: e.target.value 
})}
          />
          <input
            type="text"
            placeholder="Topic (e.g. Ozempic)"
            className="w-full p-2 rounded text-black"
            value={query.topic}
            onChange={e => setQuery({ ...query, topic: e.target.value })}
          />
          <select
            className="w-full p-2 rounded text-black"
            value={query.sentiment}
            onChange={e => setQuery({ ...query, sentiment: e.target.value 
})}
          >
            <option value="">Select Sentiment</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
          <input
            type="number"
            placeholder="Min Engagement %"
            className="w-full p-2 rounded text-black"
            value={query.minEngagement}
            onChange={e => setQuery({ ...query, minEngagement: 
e.target.value })}
          />
          <button type="submit" className="w-full bg-yellow-400 text-black 
p-2 rounded">
            Run Query
          </button>
        </form>
        {queryResult && (
          <div className="mt-4 bg-gray-900 p-4 rounded-lg">
            <p>
              🎯 <strong>{queryResult.matches}</strong> out of 
<strong>{queryResult.totalAudience}</strong> followers matched
            </p>
          </div>
        )}
      </section>

      {/* 🧠 Smart Brand Search */}
      <section>
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🧠 
Smart Brand Search</h2>
        <input
          type="text"
          placeholder="Show me creators in Portugal talking about Ozempic"
          className="w-full p-2 rounded text-black"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="mt-2 bg-yellow-400 text-black px-4 py-2 rounded"
          onClick={runBrandSearch}
        >
          Search
        </button>
        {brandResults.length > 0 && (
          <div className="mt-4">
            {brandResults.map((result, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded mb-2">
                <p>👤 {result.handle}</p>
                <p>📍 {result.location}</p>
                <p>📣 Followers: {result.audienceSize}</p>
                <p>📈 Match Score: {result.matchPercentage}%</p>
                <p>🧠 Sentiment: 
{result.sentiment?.Ozempic?.sentiment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
