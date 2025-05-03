"use client";

export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MCPPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-6 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          className="text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Monetization Control Panel 💸
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Connect Stripe, manage payouts, and track your creator performance.
        </motion.p>

        <motion.div
          className="bg-white shadow-xl rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Step 1 of 3: Connect your Stripe Account
          </h2>
          <p className="text-gray-600 mb-6">
            You’ll be able to receive payouts directly to your bank.
          </p>
          <button
            className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-all"
            onClick={() => alert("Stripe Connect flow would trigger here")}
          >
            Connect Stripe ✨
          </button>
        </motion.div>

        <motion.div
          className="text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/" className="underline text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
