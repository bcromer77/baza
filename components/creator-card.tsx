"use client";

import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreatorCardProps {
  name: string;
  quote: string;
  topic: string;
  region: string;
  deal: string;
  payout: number;
  nsfwScore?: number;
  fitScore?: number;
  blur?: boolean;
  canBook?: boolean;
}

export default function CreatorCard({
  name,
  quote,
  topic,
  region,
  deal,
  payout,
  nsfwScore = 0.05,
  fitScore = 9.2,
  blur = false,
  canBook = false,
}: CreatorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative bg-white text-black rounded-2xl p-5 shadow-xl border border-zinc-200 flex flex-col justify-between ${
        blur ? "bg-opacity-70 backdrop-blur-sm" : ""
      }`}
    >
      <div className="mb-3">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className={`text-sm italic text-zinc-600 mt-2 ${blur ? "blur-sm" : ""}`}>
          “{quote}”
        </p>
        <p className={`text-sm text-zinc-700 mt-2 ${blur ? "blur-sm" : ""}`}>
          🗣️ Talking about: <strong>{topic}</strong>
        </p>
        <p className={`text-sm text-amber-600 mt-1 ${blur ? "blur-sm" : ""}`}>
          📍 Heard in: {region}
        </p>
      </div>

      <div className="text-sm text-zinc-700 space-y-1 mt-2">
        <p className={`${blur ? "blur-sm" : ""}`}>💼 Suggested Deal: {deal}</p>
        <p className={`${blur ? "blur-sm" : ""}`}>
          💸 Projected Payout: <strong>€{payout}</strong>
        </p>
        <p className="text-xs text-green-700 mt-1">✨ Fit Score: {fitScore}/10</p>
        <p className="text-xs text-zinc-500">
          🔐 NSFW Risk Score: {Math.round((nsfwScore + Number.EPSILON) * 100)}%
        </p>
      </div>

      <div className="mt-5">
        {canBook ? (
          <Button className="w-full bg-gradient-to-r from-amber-400 to-pink-500 text-black hover:opacity-90">
            Book This Creator <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button variant="secondary" className="w-full text-zinc-500" disabled>
            <Lock className="h-4 w-4 mr-2" /> Upgrade to Unlock
          </Button>
        )}
      </div>
    </motion.div>
  );
}

