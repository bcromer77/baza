// File: app/pricing/page.tsx

import { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Pricing | Audiantix",
  description: "Choose a plan that fits your creator, brand, or agency needs."
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h1 className="text-5xl font-bold">Pricing</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Start free. Upgrade only when you’re ready to book creators, analyze sentiment, or launch agency campaigns.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Basic Tier */}
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 space-y-4 shadow-xl">
            <h2 className="text-2xl font-semibold">Basic</h2>
            <p className="text-zinc-400">View up to 3 creator profiles/month. No bookings.</p>
            <p className="text-3xl font-bold">$99</p>
            <p className="text-sm text-zinc-500">per month</p>
            <ul className="text-left text-sm text-zinc-400 space-y-2 mt-4">
              <li>🔍 Limited search access</li>
              <li>👀 Blurred insights</li>
              <li>💸 No bookings</li>
            </ul>
            <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white mt-4">Start Basic</Button>
          </div>

          {/* Pro Tier */}
          <div className="bg-zinc-900 border border-pink-500 rounded-xl p-6 space-y-4 shadow-xl">
            <h2 className="text-2xl font-semibold">Pro</h2>
            <p className="text-zinc-400">Get 10 creator views/month + express interest.</p>
            <p className="text-3xl font-bold">$399</p>
            <p className="text-sm text-zinc-500">per month</p>
            <ul className="text-left text-sm text-zinc-400 space-y-2 mt-4">
              <li>✨ Detailed insights</li>
              <li>🧠 Prism match access</li>
              <li>🚀 Express interest on creator cards</li>
            </ul>
            <Button className="w-full bg-pink-500 text-black hover:opacity-90 mt-4">Upgrade to Pro</Button>
          </div>

          {/* Premium Tier */}
          <div className="bg-zinc-900 border border-amber-500 rounded-xl p-6 space-y-4 shadow-xl">
            <h2 className="text-2xl font-semibold">Premium</h2>
            <p className="text-zinc-400">Unlimited access + booking rights.</p>
            <p className="text-3xl font-bold">$999</p>
            <p className="text-sm text-zinc-500">per month</p>
            <ul className="text-left text-sm text-zinc-400 space-y-2 mt-4">
              <li>🔓 Unlimited creator discovery</li>
              <li>💬 AI-powered visual & voice search</li>
              <li>📩 Book directly with Stripe integration</li>
            </ul>
            <Button className="w-full bg-amber-500 text-black hover:opacity-90 mt-4">Go Premium</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

