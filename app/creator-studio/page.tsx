"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

import topMentions from "@/prism/promptEngine/topMentions";
import { generateBehavioralPrompt } from "@/prism/promptEngine/generateBehavioralPrompt";

export default function CreatorStudioPage() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [creator, setCreator] = useState<any>(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set userId from search params or localStorage
  useEffect(() => {
    const returnedUserId = searchParams.get("user_id");
    const localUserId = localStorage.getItem("phyllo_user_id");
    const finalUserId = returnedUserId || localUserId || "demo123";
    localStorage.setItem("phyllo_user_id", finalUserId);
    setUserId(finalUserId);
  }, [searchParams]);

  // Fetch creator and match data
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;

      try {
        const res = await fetch(`/api/creators/${userId}`);
        const creatorData = await res.json();
        console.log("🧠 Creator data:", creatorData);

        if (!res.ok || !creatorData) {
          setCreator(null);
          setLoading(false);
          return;
        }

        setCreator(creatorData);

        const matchRes = await fetch(`/api/matches/${userId}`);
        const matchData = await matchRes.json();
        setMatches(matchData);

        setLoading(false);
      } catch (err) {
        console.error("Error loading studio:", err);
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  if (loading) {
    return <div className="p-10 text-lg text-white">Loading your studio...</div>;
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Creator not found</h1>
        <p className="text-zinc-400 mb-6">
          We couldn’t load your profile. Try signing up again.
        </p>
        <a href="/join">
          <button className="bg-gradient-to-r from-amber-400 to-pink-500 text-black px-6 py-3 rounded-full">
            Back to Join
          </button>
        </a>
      </div>
    );
  }

  const insights = topMentions.map((mention) =>
    generateBehavioralPrompt({
      keyword: mention.keyword,
      frequency: mention.frequency,
      quote: mention.quote
    })
  );

  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6">Your Creator HQ</h1>

      <p className="text-sm text-zinc-400 mb-6">
        Logged in as <strong>{creator.name}</strong> ({creator.persona})
      </p>

      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl mb-8 space-y-4 shadow-lg">
        <h2 className="text-2xl font-semibold">✨ Today’s Highlights</h2>
        <p className="text-sm text-zinc-400">
          🎙️ You’ve mentioned <strong>"moisturizer"</strong> 23 times this month — that’s more than repetition. That’s a rhythm.
        </p>
        <p className="text-sm text-zinc-400">
          🧖 Consider turning that into a ritual others can follow. The right brands are listening.
        </p>
        <p className="text-sm text-zinc-400">
          💼 Right now, brands are browsing voices like yours.
        </p>
        <p className="text-sm text-zinc-400">
          💡 You’ve made yourself discoverable — and possibly valuable — simply by being consistent.
        </p>
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-white">🎯 Your Symbolic Signals</h2>
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="bg-white text-black p-6 rounded-2xl shadow-xl mb-4"
          >
            <h3 className="text-xl font-semibold mb-1">🔎 {insight.prompt}</h3>
            {insight.quote && (
              <p className="italic text-sm text-gray-600 mb-1">“{insight.quote}”</p>
            )}
            <p className="text-sm text-blue-700">{insight.suggestion}</p>
          </div>
        ))}
      </div>

      <div className="bg-white text-black p-6 rounded-2xl mb-10 shadow-xl space-y-3">
        <h2 className="text-2xl font-bold">Get Paid for Being You</h2>
        <p className="text-sm text-zinc-600">
          You’ve done the meaningful part — you’ve shared your voice. Audiantix listens to help the right ears find you.
        </p>
        <p className="text-sm text-zinc-500 italic">
          Connect Stripe to unlock bookings, retreats, and 1:1 collaborations — we handle the friction.
        </p>
        <p className="text-xs text-zinc-400">
          You focus on resonance. We’ll cover the rest.
        </p>
        <button
          onClick={() => alert("Stripe onboarding redirect coming soon!")}
          className="mt-2 px-5 py-2 rounded-xl bg-black text-white hover:bg-zinc-800"
        >
          Connect Stripe →
        </button>
      </div>

      <Tabs defaultValue="opportunities">
        <TabsList className="mb-6">
          <TabsTrigger value="opportunities">My Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities">
          {matches.length === 0 ? (
            <p className="text-zinc-300">
              No opportunities yet. Keep creating — someone’s always listening.
            </p>
          ) : (
            matches.map((match, index) => {
              const platformFee = Math.round(match.basePayout * 0.07);
              const creatorEarnings = match.basePayout - platformFee;

              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white text-black rounded-2xl shadow-xl border border-zinc-200 p-5 flex flex-col items-start justify-between"
                >
                  <div className="w-full h-40 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl mb-4" />
                  <h3 className="text-xl font-bold">{match.title}</h3>
                  <p className="text-sm text-zinc-500 mb-1">{match.location}</p>
                  <p className="text-sm text-zinc-600 italic mb-1">
                    This match is based on what you said — not just how you tagged.
                  </p>
                  <p className="text-xs text-amber-500 mb-3">✨ Fit Score: {match.score}/10</p>
                  <button
                    onClick={() =>
                      alert(`We've flagged your interest in ${match.title}. We’ll handle the outreach.`)
                    }
                    className="mt-auto px-4 py-2 rounded-xl bg-black text-white hover:bg-zinc-800 transition"
                  >
                    View Deal
                  </button>
                </motion.div>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

