"use client";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import VideoTrendIntelligence from "../../video-trend-intelligence/page";
import { PremiumContextualSentiment } from "@/components/PremiumContextualSentiment";
import UpsellCard from "@/components/premium/UpsellCard";
import { AuthContext } from "@/context/AuthContext";

const dummyCreators = [
  {
    name: "Elena",
    summary: "Frequently mentions Lisbon, confidence, retreats",
    opportunities: 5,
    image: "/elena.jpg",
  },
  {
    name: "Maya",
    summary: "Focused on Bali, wellness, self-love",
    opportunities: 3,
    image: "/maya.jpg",
  },
  {
    name: "Kai",
    summary: "Talks about food, Portugal, and community events",
    opportunities: 4,
    image: "/kai.jpg",
  },
];

export default function AgencyStudioPage() {
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [tab, setTab] = useState<'overview' | 'intelligence'>('overview');
  const [showSentiment, setShowSentiment] = useState(false);

  const { user } = useContext(AuthContext);
  const premium = user?.tier === 'premium';

  const proximityResults = [
    {
      timestamp: 14,
      word: "confidence",
      proximity_window: "this really boosted my confidence going into the talk",
      sentiment: 0.72,
    },
    {
      timestamp: 55,
      word: "boring",
      proximity_window: "I thought it was boring at first, but then...",
      sentiment: -0.6,
    },
  ];

  const chronemics = [
    { time: 0, sentiment: -0.2 },
    { time: 10, sentiment: 0.1 },
    { time: 20, sentiment: 0.4 },
    { time: 30, sentiment: 0.6 },
    { time: 40, sentiment: 0.3 },
    { time: 50, sentiment: -0.1 },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">Agency Studio</h1>

      <div className="flex gap-4 mb-6">
        <Button onClick={() => setTab('overview')} variant={tab === 'overview' ? 'default' : 'outline'}>
          Overview
        </Button>
        <Button onClick={() => setTab('intelligence')} variant={tab === 'intelligence' ? 'default' : 'outline'}>
          Intelligence
        </Button>
      </div>

      {tab === 'overview' && (
        <>
          <div className="flex gap-4 mb-8">
            <Button onClick={() => setShowCreatorModal(true)} className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black">
              + Add New Creator
            </Button>
            <Button onClick={() => setShowTeamModal(true)} className="bg-gradient-to-r from-teal-400 to-green-500 text-black">
              + Add Team Member
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {dummyCreators.map((creator, idx) => (
              <Card key={idx} className="bg-zinc-900 p-4 rounded-xl">
                <img src={creator.image} alt={creator.name} className="rounded-lg mb-3 w-full h-48 object-cover" />
                <h3 className="text-xl font-semibold mb-1">{creator.name}</h3>
                <p className="text-sm text-zinc-300 mb-2">{creator.summary}</p>
                <p className="text-sm text-zinc-400">Opportunities: {creator.opportunities}</p>
              </Card>
            ))}
          </div>
        </>
      )}

      {tab === 'intelligence' && (
        <div className="mt-6 space-y-10">
          <VideoTrendIntelligence />

          <div className="mt-4">
            <Button onClick={() => setShowSentiment(prev => !prev)} variant="outline">
              {showSentiment ? 'Hide' : 'Show'} Contextual Sentiment Analysis
            </Button>
          </div>

          {showSentiment && (
            premium ? (
              <PremiumContextualSentiment
                proximityResults={proximityResults}
                chronemics={chronemics}
                premium={true}
              />
            ) : (
              <UpsellCard />
            )
          )}
        </div>
      )}

      {showCreatorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add a New Creator</h2>
            <Input placeholder="Creator Name" className="mb-3" />
            <Input placeholder="Instagram / TikTok Link" className="mb-3" />
            <Input placeholder="Niche or Tags" className="mb-3" />
            <div className="flex justify-end gap-2">
              <Button onClick={() => setShowCreatorModal(false)} variant="outline">Cancel</Button>
              <Button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black">Add Creator</Button>
            </div>
          </div>
        </div>
      )}

      {showTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Team Member</h2>
            <Input placeholder="Email Address" className="mb-3" />
            <select className="w-full bg-zinc-900 text-white p-2 rounded mb-3">
              <option value="admin">Admin</option>
              <option value="campaign">Campaign Manager</option>
              <option value="viewer">Brand Liaison (View Only)</option>
            </select>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setShowTeamModal(false)} variant="outline">Cancel</Button>
              <Button className="bg-gradient-to-r from-teal-400 to-green-500 text-black">Send Invite</Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

