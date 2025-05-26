"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CreatorCard from "@/components/creator-card";

const mockCreators = [
  {
    id: "c1",
    name: "Big Drop Mama",
    sentiment: "inspiring",
    quote: "When I first touched Lisbon sand, I knew I'd never leave.",
    deal: "3-night collab with Surftide Portugal",
    region: "Lisbon",
    payout: 1200,
  },
  {
    id: "c2",
    name: "Glow Meditate",
    sentiment: "soothing",
    quote: "Breathwork saved my life. Bali amplified it.",
    deal: "Retreat partner with BaliMind",
    region: "Ubud",
    payout: 890,
  },
  // Add 4 more mock creators...
];

export default function BrandStudio() {
  const [userTier, setUserTier] = useState<"basic" | "pro" | "premium">("basic");

  useEffect(() => {
    // Eventually set from user login
    const storedTier = localStorage.getItem("brand_tier") || "basic";
    setUserTier(storedTier as any);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">🎯 Brand Studio</h1>
      <p className="text-zinc-400 mb-8">Your creator radar — powered by what they *say*, not just what they tag.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCreators.map((creator, index) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CreatorCard
              name={creator.name}
              sentiment={creator.sentiment}
              quote={creator.quote}
              deal={creator.deal}
              region={creator.region}
              payout={creator.payout}
              blur={userTier !== "premium"}
              canBook={userTier === "premium"}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

