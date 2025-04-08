'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';

// Load the Inter font
const inter = Inter({ subsets: ['latin'] });

interface SearchQuery {
  topics: string[];
  location: string;
  budget: number;
  audienceSizeMin: number;
}

function promptToQuery(prompt: string): SearchQuery {
  if (prompt.toLowerCase().includes("portugal") && prompt.toLowerCase().includes("ozempic")) {
    return {
      topics: ["Ozempic"],
      location: "Portugal",
      budget: 5000,
      audienceSizeMin: 20000,
    };
  }
  return {
    topics: [],
    location: "",
    budget: 0,
    audienceSizeMin: 0,
  };
}

interface Insight {
  geography: Record<string, number>;
  intent: Record<string, number>;
  behavior: Record<string, number>;
  engagementTimes: Record<string, string>;
  sentiment: Record<string, { sentiment: string; score: number }>;
}

interface Prompt {
  text: string;
}

interface BrandOffer {
  id: number;
  brand: string;
  offer: string;
}

interface DashboardData {
  audienceInsights: Insight[];
  monetizationPrompts: Prompt[];
  brandOffers: BrandOffer[];
}

export default function CreatorDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const creatorId = searchParams.get('id');

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [query, setQuery] = useState({
    location: '',
    topic: '',
    sentiment: '',
    minEngagement: '',
  });
  const [queryResult, setQueryResult] = useState<any>(null);
  const [prompt, setPrompt] = useState('');
  const [brandResults, setBrandResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isQueryLoading, setIsQueryLoading] = useState(false);
  const [isBrandSearchLoading, setIsBrandSearchLoading] = useState(false);

  useEffect(() => {
    // Redirect to a default ID if none is provided
    if (!creatorId) {
      router.push('/?id=123');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/creators/${creatorId}/dashboard`);
        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
        }
        const data = await response.json();
        setDashboardData(data);
        setError(null);
      } catch (err: any) {
        console.error('Dashboard Error:', err);
        setError('Failed to load dashboard data. Please check if the backend server is running on port 5000.');
      }
    };

    fetchDashboardData();
  }, [creatorId, router]);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorId) {
      setError('Cannot run query: Creator ID is missing.');
      return;
    }

    setIsQueryLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/creators/${creatorId}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query),
      });
      if (!response.ok) throw new Error('Query failed');
      const data = await response.json();
      setQueryResult(data);
      setError(null);
    } catch (err: any) {
      console.error('Query Error:', err);
      setError('Failed to run query. Please try again.');
    } finally {
      setIsQueryLoading(false);
    }
  };

  const runBrandSearch = async () => {
    const searchQuery = promptToQuery(prompt);
    setIsBrandSearchLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/brands/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchQuery),
      });
      if (!response.ok) throw new Error('Brand search failed');
      const data = await response.json();
      setBrandResults(data);
      setError(null);
    } catch (err: any) {
      console.error('Brand Search Error:', err);
      setError('Failed to run brand search. Please try again.');
    } finally {
      setIsBrandSearchLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500 p-10">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="text-gray-200 p-10">Loading dashboard...</div>;
  }

  return (
    <div className="font-inter min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200">
      {/* Hero Section */}
      <div className="text-center py-16 px-6">
        <h1 className="text-5xl font-bold text-yellow-300 mb-4">Welcome to CreatorTorch</h1>
        <p className="text-xl text-gray-400 mb-6">
          Empowering creators to grow their audience and income in the $100B creator economy.
        </p>
        <p className="text-lg text-gray-500">
          Understand your audience and find the best brand collaborations with ease.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Dashboard Title */}
        <h1 className="text-4xl font-bold mb-8 text-yellow-300 text-center">
          Your Creator Dashboard
        </h1>

        {/* Audience Insights */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Audience Insights</h2>
          {dashboardData.audienceInsights.map((insight, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg mb-4 shadow-lg">
              <p>📍 Location: {Object.entries(insight.geography)[0]?.join(': ') || 'N/A'}%</p>
              <p>🎯 Intent: {Object.entries(insight.intent)[0]?.join(': ') || 'N/A'}%</p>
              <p>📊 Behavior: {Object.entries(insight.behavior)[0]?.join(': ') || 'N/A'}%</p>
              <p>⏰ Engagement: {insight.engagementTimes.peak || 'N/A'}</p>
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

        {/* Hot Opportunities */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">🔥 Hot Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardData.brandOffers
              ? dashboardData.brandOffers.map((offer, i) => (
                  <div key={i} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <p className="font-bold text-gray-100">{offer.brand}</p>
                    <p className="text-gray-400">{offer.offer}</p>
                  </div>
                ))
              : [
                  { title: 'Lisbon Brunch Collab', desc: 'Sponsored by Lumi' },
                  { title: 'Ozempic Trend Series', desc: '3 creators, €7K' },
                  { title: 'Galway Eco Routine', desc: '€3K, Zero-Waste theme' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <p className="font-bold text-gray-100">{item.title}</p>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                ))}
          </div>
        </section>

        {/* Query Your Audience */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Run a Query</h2>
          <form onSubmit={handleQuerySubmit} className="space-y-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Location (e.g. Dublin)"
              className="w-full p-3 rounded bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-yellow-300"
              value={query.location}
              onChange={(e) => setQuery({ ...query, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="Topic (e.g. Ozempic)"
              className="w-full p-3 rounded bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-yellow-300"
              value={query.topic}
              onChange={(e) => setQuery({ ...query, topic: e.target.value })}
            />
            <select
              className="w-full p-3 rounded bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-yellow-300"
              value={query.sentiment}
              onChange={(e) => setQuery({ ...query, sentiment: e.target.value })}
            >
              <option value="">Select Sentiment</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
            <input
              type="number"
              placeholder="Min Engagement %"
              className="w-full p-3 rounded bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-yellow-300"
              value={query.minEngagement}
              onChange={(e) => setQuery({ ...query, minEngagement: e.target.value })}
            />
            <button
              type="submit"
              className="w-full bg-yellow-300 text-black p-3 rounded hover:bg-yellow-400 transition"
              disabled={isQueryLoading}
            >
              {isQueryLoading ? 'Running Query...' : 'Run Query'}
            </button>
          </form>
          {queryResult && (
            <div className="mt-4 bg-gray-800 p-6 rounded-lg shadow-lg">
              <p>
                🎯 <strong>{queryResult.matches}</strong> out of{' '}
                <strong>{queryResult.totalAudience}</strong> followers matched
              </p>
            </div>
          )}
        </section>

        {/* Smart Brand Search */}
        <section>
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">🧠 Smart Brand Search</h2>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Show me creators in Portugal talking about Ozempic"
              className="w-full p-3 rounded bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-yellow-300 mb-4"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              className="w-full bg-yellow-300 text-black p-3 rounded hover:bg-yellow-400 transition"
              onClick={runBrandSearch}
              disabled={isBrandSearchLoading}
            >
              {isBrandSearchLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {brandResults.length > 0 && (
            <div className="mt-4">
              {brandResults.map((result, i) => (
                <div key={i} className="bg-gray-800 p-6 rounded-lg mb-4 shadow-lg">
                  <p>👤 {result.handle || 'N/A'}</p>
                  <p>📍 {result.location || 'N/A'}</p>
                  <p>📣 Followers: {result.audienceSize || 'N/A'}</p>
                  <p>📈 Match Score: {result.matchPercentage || 'N/A'}%</p>
                  <p>🧠 Sentiment: {result.sentiment?.Ozempic?.sentiment || 'N/A'}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Testimonials */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-4">What Creators Say</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-200">
              "CreatorTorch helped me find a $5K brand deal in just a week!"
            </p>
            <p className="text-gray-400 mt-2">- Jane Doe, Lifestyle Creator</p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gray-400">
        <p>&copy; 2025 CreatorTorch. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="text-yellow-300 hover:underline mx-2">About</a>
          <a href="#" className="text-yellow-300 hover:underline mx-2">Contact</a>
          <a href="#" className="text-yellow-300 hover:underline mx-2">Terms</a>
        </div>
      </footer>
    </div>
  );
}