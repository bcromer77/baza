// app/brand-dashboard/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

interface PolaroidCard {
  imageUrl: string;
  quote: string;
  metadata: {
    creator: string;
    platform: string;
    eventId: string;
    collabLink?: string;
  };
}

interface Subscription {
  plan: string;
  amount: number;
  currency: string;
  features: string[];
}

const BrandDashboardPage: React.FC = () => {
  const { data: session } = useSession();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PolaroidCard[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!session?.user?.id) return;
      try {
        const { data } = await axios.get(`/api/subscriptions/${session.user.id}`, {
          headers: { Authorization: `Bearer ${session.accessToken}` }
        });
        setSubscription(data.subscription);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };
    fetchSubscription();
  }, [session]);

  const handleSearch = async () => {
    if (!session?.user?.id || !query) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(
        '/api/prism/search',
        {
          queryInput: query,
          userId: session.user.id,
          role: 'brand',
          userLanguage: 'en',
          eventId: null
        },
        { headers: { Authorization: `Bearer ${session.accessToken}` } }
      );
      setResults(data.results);
    } catch (err) {
      setError('Failed to find creators. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!session) return <div className="text-center py-10">Please log in</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Brand Dashboard</h1>

      {/* Search Bar */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Find Creators for Events</h2>
        <div className="flex items-center max-w-2xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., supper club chef, morning master class yoga..."
            className="w-full py-2 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Creator Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((card, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-md">
                <Image src={card.imageUrl} alt="Polaroid Card" width={200} height={250} className="mx-auto" />
                <p className="mt-2 text-sm italic">"{card.quote}"</p>
                <p className="text-gray-600">Creator: {card.metadata.creator}</p>
                <p className="text-gray-600">Platform: {card.metadata.platform}</p>
                {card.metadata.collabLink && (
                  <Link
                    href={card.metadata.collabLink}
                    className="mt-2 inline-block bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                  >
                    Collaborate
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subscription Status */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Subscription</h2>
        {subscription ? (
          <div className="border rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-medium capitalize">{subscription.plan} Plan</h3>
            <p className="text-gray-600">Cost: ${(subscription.amount / 100).toFixed(2)}/month</p>
            <p>Features:</p>
            <ul className="list-disc pl-5">
              {subscription.features.map((feature, index) => (
                <li key={index}>{feature.replace('_', ' ')}</li>
              ))}
            </ul>
            <Link href="/subscriptions/manage" className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Manage Subscription
            </Link>
          </div>
        ) : (
          <div>
            <p>No active subscription. Choose a plan to unlock premium creator matching:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="border rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-medium">Individual</h3>
                <p>$29/month</p>
                <p>Advanced analytics, exclusive templates</p>
                <button
                  onClick={async () => {
                    try {
                      const { data } = await axios.post('/api/subscriptions/subscribe', {
                        userId: session.user.id,
                        userType: 'brand',
                        plan: 'individual'
                      });
                      window.location.href = '/subscriptions/success';
                    } catch (error) {
                      console.error('Subscription error:', error);
                    }
                  }}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </div>
              <div className="border rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-medium">Team</h3>
                <p>$99/month</p>
                <p>Multi-user access, priority matching</p>
                <button
                  onClick={async () => {
                    try {
                      const { data } = await axios.post('/api/subscriptions/subscribe', {
                        userId: session.user.id,
                        userType: 'brand',
                        plan: 'team'
                      });
                      window.location.href = '/subscriptions/success';
                    } catch (error) {
                      console.error('Subscription error:', error);
                    }
                  }}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandDashboardPage;
