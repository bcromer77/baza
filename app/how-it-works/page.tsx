// File: app/how-it-works/page.tsx

import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "How It Works | Audiantix",
  description: "Learn how Audiantix listens to creators and matches them with brands and agencies using audio AI."
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-5xl font-bold">How Audiantix Works</h1>

        <p className="text-zinc-400 text-lg">
          Audiantix is the world’s first listening search engine. We transcribe what creators say, analyze the tone, topics, and intent, and match them with brands and agencies through audio-first 
RAG-powered AI.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-1">🎧 Step 1: Whisper-Driven Transcription</h2>
            <p className="text-zinc-400">Creators connect their content and Audiantix listens using Whisper AI to convert speech into searchable transcripts.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-1">🧠 Step 2: Prism & Vision Matching</h2>
            <p className="text-zinc-400">We analyze sentiment, emotion, and commercial themes. Visual search lets brands match by vibe, not just tags.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-1">🤝 Step 3: Precision Matchmaking</h2>
            <p className="text-zinc-400">Agencies and brands search naturally (“Lisbon retreats”) and Audiantix shows the best creator matches — with intelligent, explainable results.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-1">💸 Step 4: Stripe-Powered Booking</h2>
            <p className="text-zinc-400">Creators receive offers. Brands book instantly. Stripe Connect handles the payment — and Audiantix earns a micro-margin.</p>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/join">
            <Button className="bg-gradient-to-r from-amber-400 to-pink-500 text-black px-6 py-3 rounded-full text-lg">
              Get Started →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

