"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function JoinPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Simulate Stripe onboarding or success flag
    const timer = setTimeout(() => {
      setIsSuccess(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {isSuccess ? (
          <Card className="w-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
            <CardContent className="p-8 space-y-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center"
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </motion.div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Welcome to Audiantix!</h1>
                <p className="text-zinc-400">Your creator account has been created successfully.</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-zinc-300">
                  We've opened Stripe Connect in a new tab to set up your payments.
                </p>
                <p className="text-sm text-zinc-300">You'll be redirected to your Creator Studio in a moment...</p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => router.push("/creator-studio")}
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-90 text-black font-medium"
                >
                  Go to Creator Studio <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-amber-400 to-pink-500" />
            <CardContent className="p-8 text-center">
              <h1 className="text-xl font-semibold mb-4">Join Audiantix</h1>
              <p className="text-zinc-400 text-sm">Complete your setup to begin discovering opportunities.</p>
              {/* Placeholder for sign-up form, OAuth, etc. */}
            </CardContent>
          </Card>
        )}
      </motion.div>

      <div className="w-full max-w-md mt-8 flex justify-between text-xs text-zinc-600">
        <Link href="/terms" className="hover:text-zinc-400">
          Terms of Service
        </Link>
        <Link href="/privacy" className="hover:text-zinc-400">
          Privacy Policy
        </Link>
        <Link href="/help" className="hover:text-zinc-400">
          Help Center
        </Link>
      </div>
    </main>
  );
}

