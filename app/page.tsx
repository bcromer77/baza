// File: app/page.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Search, Headphones, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import Head from "next/head"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const placeholders = [
    "Find creators talking about: Tulum villas",
    "Find creators talking about: Marrakech retreats",
    "Find creators talking about: Lisbon surf houses",
    "Find creators talking about: Bali wellness escapes",
    "Find creators talking about: Tokyo food tours",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  const simulateVoiceSearch = () => {
    setIsListening(true)
    setTimeout(() => {
      setSearchQuery("Bali wellness retreats")
      setIsListening(false)
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>Audiantix – The Listening Search Engine</title>
        <meta name="description" content="Discover emotionally matched creators, campaigns, and insights through the world's first voice-powered discovery engine." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-black text-white overflow-hidden">
        <audio ref={audioRef} className="hidden" />

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
          <div className="container mx-auto py-6 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones className="h-8 w-8 text-amber-400" />
              <span className="text-2xl font-bold tracking-tight">Audiantix</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
              <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/join?persona=creator" className="hover:text-white transition-colors">Creator Sign Up</Link>
              <Link href="/join?persona=brand" className="hover:text-white transition-colors">Brand Sign Up</Link>
              <Link href="/join?persona=agency" className="hover:text-white transition-colors">Agency Sign Up</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/join"><Button variant="ghost" className="text-zinc-400 hover:text-white">Sign In</Button></Link>
              <Link href="/join"><Button className="bg-gradient-to-r from-amber-400 to-pink-500 text-black hover:opacity-90 transition-opacity">Get Started</Button></Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Oh, I hear you. <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500">The Listening Search Engine</span>
              </motion.h1>
              <motion.p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto">
                Before you spend a cent on marketing, hear what creators are already saying. Audiantix listens — and helps you act.
              </motion.p>

              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-4">
                <div className={`bg-zinc-900/80 border-zinc-700 border h-16 pl-12 pr-32 text-lg rounded-full shadow-md ${isSearchFocused ? 'ring-2 ring-amber-400' : ''}`}>
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isListening ? "Listening..." : placeholders[placeholderIndex]}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="bg-transparent text-white placeholder-zinc-500 w-full h-full focus:outline-none"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <Button type="button" onClick={simulateVoiceSearch} variant="ghost" size="icon" className={`rounded-full ${isListening ? "text-amber-400 animate-pulse" : "text-zinc-400"}`}>
                      <Mic className="h-5 w-5" />
                      <span className="sr-only">Voice Search</span>
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-amber-400 to-pink-500 text-black rounded-full px-6">
                      Search
                    </Button>
                  </div>
                </div>
              </form>
              <p className="text-sm text-zinc-500 text-center mt-2">
                Try: “Wellness retreats in Portugal” or “Skincare influencers in Berlin”
              </p>
              <div className="flex justify-center gap-6 text-sm text-zinc-400 mt-6">
                <Link href="/creator-studio" className="hover:text-white">📣 I’m a Creator</Link>
                <Link href="/brand-studio" className="hover:text-white">🧠 I’m a Brand</Link>
                <Link href="/agency-hq" className="hover:text-white">🤝 I’m an Agency</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="relative h-[600px] w-full bg-black text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1504610926078-a1611febcad3"
              alt="World map with creator hotspots"
              fill
              className="object-cover opacity-10"
            />
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center text-center h-full">
            <h2 className="text-3xl font-bold mb-4">Global Creator Hotspots</h2>
            <p className="text-zinc-400 mb-8 max-w-xl">Discover trending destinations and the creators talking about them</p>
            <Link href="/destinations">
              <Button className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20">
                Explore All Destinations
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-xs text-zinc-500 text-center py-6">
          <p>
            © 2025 Audiantix. All rights reserved. GDPR-compliant.{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link> |{" "}
            <Link href="/terms" className="underline">Terms of Service</Link>
          </p>
        </footer>
      </div>
    </>
  )
}
