"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Headphones, ArrowRight, CheckCircle, Globe } from "lucide-react"
import Link from "next/link"

export default function BrandSignup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleSignup = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, accountType: "brand" }),
      })
      const data = await res.json()
      if (data.success) {
        setStep(2)
        setTimeout(() => {
          router.push("/brand-studio")
        }, 3000)
      }
    } catch (error) {
      console.error("Signup error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="w-full max-w-md mb-8">
        <Link href="/" className="flex items-center gap-2 mb-12">
          <Headphones className="h-8 w-8 text-pink-500" />
          <span className="text-2xl font-bold tracking-tight">Audiantix</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {step === 1 ? (
          <Card className="w-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-cyan-500" />
                  <h1 className="text-3xl font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                      Travel Brand Sign-Up
                    </span>
                  </h1>
                </div>
                <p className="text-zinc-400">
                  Find creators already planning the trips your audience wants and create co-branded packages.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-zinc-400">
                    Company Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your company name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-zinc-400">
                    Business Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>

                <Button
                  onClick={handleSignup}
                  disabled={loading || !name || !email}
                  className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-black font-medium h-11"
                >
                  {loading ? "Creating Your Account..." : "Join the Platform"}
                </Button>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <p className="text-sm text-zinc-500">
                  Already have an account?{" "}
                  <Link href="/login" className="text-cyan-500 hover:text-cyan-400">
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="text-xs text-zinc-500 space-y-2">
                <p>
                  By joining, you'll get access to our creator discovery tools, partnership opportunities, and
                  analytics.
                </p>
                <p>Audiantix connects you to creators already shaping travel demand.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
            <CardContent className="p-8 space-y-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center"
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </motion.div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Welcome to Audiantix!</h1>
                <p className="text-zinc-400">Your brand account has been created successfully.</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-zinc-300">
                  You're now ready to discover creators and build travel partnerships.
                </p>
                <p className="text-sm text-zinc-300">You'll be redirected to your Brand Studio in a moment...</p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => router.push("/brand-studio")}
                  className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-black font-medium"
                >
                  Go to Brand Studio <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
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
  )
}
