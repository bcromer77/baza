"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function CreatorStudioPage() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const returnedUserId = searchParams.get("user_id");
    const localUserId = localStorage.getItem("phyllo_user_id");
    const finalUserId = returnedUserId || localUserId || "demo123";
    localStorage.setItem("phyllo_user_id", finalUserId);
    setUserId(finalUserId);
    setLoading(false);
  }, [searchParams]);

  useEffect(() => {
    async function fetchMatches() {
      const res = await fetch("/api/matches/demo123");
      const data = await res.json();
      setMatches(data);
    }
    fetchMatches();
  }, []);

  if (loading)
    return <div className="p-10 text-lg text-white">Loading your studio...</div>;

  if (!userId) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
        <p className="text-zinc-400 mb-6">
          We couldn’t detect your creator ID. Please go through the onboarding flow again.
        </p>
        <a href="/">
          <button className="bg-gradient-to-r from-amber-400 to-pink-500 text-black px-6 py-3 rounded-full">
            Go Back Home
          </button>
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6">Your Creator HQ</h1>

      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl mb-8 space-y-4 shadow-lg">
        <h2 className="text-2xl font-semibold">✨ Today’s Highlights</h2>
        <p className="text-sm text-zinc-400">
          🎙️ You’ve mentioned <strong>"moisturizer"</strong> 23 times this month — that’s a signal.
        </p>
        <p className="text-sm text-zinc-400">
          🧖 Consider hosting a “Glow Weekend” retreat at our Algarve partner resort. We’ll help.
        </p>
        <p className="text-sm text-zinc-400">
          💼 2 brands are browsing profiles like yours right now.
        </p>
        <p className="text-sm text-zinc-400">
          💸 You’re eligible for €400–€2200 bookings — Stripe connects it all.
        </p>
      </div>

      <div className="bg-white text-black p-6 rounded-2xl mb-10 shadow-xl space-y-3">
        <h2 className="text-2xl font-bold">Get Paid for Being You</h2>
        <p className="text-sm text-zinc-600">
          You’ve done the hard part — you spoke, they listened. Now let Audiantix handle the rest.
        </p>
        <p className="text-sm text-zinc-500 italic">
          Connect Stripe to enable instant brand payments, retreat bookings, and 1:1 offerings.
        </p>
        <p className="text-xs text-zinc-400">
          We cover the boring bits. You focus on the spark.
        </p>
        <button
          onClick={() => alert("Stripe onboarding redirect coming soon!")}
          className="mt-2 px-5 py-2 rounded-xl bg-black text-white hover:bg-zinc-800"
        >
          Connect Stripe →
        </button>
      </div>

      <Tabs defaultValue="opportunities" className="text-white">
        <TabsList className="mb-6">
          <TabsTrigger value="opportunities">My Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities">
          <p className="text-sm text-zinc-400 italic mb-4">
            These offers are based on what you actually say. Audiantix listens and brings the right bookings to you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.length === 0 ? (
              <p className="text-zinc-300">No opportunities yet. Keep creating — magic is listening.</p>
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
                    <p className="text-sm">
                      You earn: <span className="text-green-600 font-semibold">€{creatorEarnings}</span>
                    </p>
                    <p className="text-xs text-zinc-400 mb-1">
                      Audiantix fee: €{platformFee} (includes matching + support)
                    </p>
                    <p className="text-xs text-amber-500 mb-3">✨ Fit Score: {match.score}/10</p>
                    <button
                      onClick={() => alert(`We've flagged your interest in ${match.title}. We’ll handle the outreach.`)}
                      className="mt-auto px-4 py-2 rounded-xl bg-black text-white hover:bg-zinc-800 transition"
                    >
                      View Deal
                    </button>
                  </motion.div>
                );
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

