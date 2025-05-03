"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, ArrowRight, Headphones, Mic, AudioWaveformIcon as Waveform, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CreatorCard from "@/components/creator-card"
import TestimonialSlider from "@/components/testimonial-slider"
import TimelineStep from "@/components/timeline-step"
import Link from "next/link"
import WaveformAnimation from "@/components/waveform-animation"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto py-6 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headphones className="h-8 w-8 text-amber-400" />
            <span className="text-2xl font-bold tracking-tight">Audiantix</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#creators" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Creators
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Testimonials
            </Link>
            <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-amber-400 to-pink-500 text-black hover:opacity-90 transition-opacity">
              Get Started
            </Button>
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
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Listen.{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500">
                  Don't Guess.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto">
                Before you spend a cent on marketing, see what creators are already talking about. Audiantix listens —
                and helps you act.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative max-w-3xl mx-auto mb-12"
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-pink-500 rounded-lg blur ${
                  isSearchFocused ? "opacity-100" : "opacity-70"
                } transition-opacity duration-300`}
              ></div>
              <div className="relative bg-black rounded-lg p-1">
                <form onSubmit={handleSearch} className="flex items-center bg-zinc-900/80 rounded-lg overflow-hidden">
                  <Search className="ml-4 h-6 w-6 text-amber-400" />
                  <Input
                    type="text"
                    placeholder={placeholders[placeholderIndex]}
                    className="border-0 bg-transparent focus-visible:ring-0 text-white placeholder:text-zinc-500 h-14 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <Button
                    type="submit"
                    className="mr-1 bg-gradient-to-r from-amber-400 to-pink-500 text-black hover:opacity-90 transition-opacity h-12 px-6 rounded-md"
                  >
                    Reveal Creators
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex justify-center"
            >
              <WaveformAnimation />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
            <ArrowRight className="h-6 w-6 text-zinc-500 rotate-90" />
          </motion.div>
          <span className="text-xs text-zinc-500 mt-2">Scroll to explore</span>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              How{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500">
                It Works
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Turn creator conversations into travel campaigns with three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TimelineStep
              number={1}
              title="A creator casually mentions their dream trip"
              description="Our AI listens to podcasts, videos, and social media for authentic travel mentions"
              icon={<Mic className="h-8 w-8" />}
              color="from-amber-400 to-amber-500"
              delay={0}
            />

            <TimelineStep
              number={2}
              title="Audiantix analyzes the tone, topic, sentiment"
              description="Our platform identifies commercial opportunities in creator conversations"
              icon={<Waveform className="h-8 w-8" />}
              color="from-amber-500 to-pink-400"
              delay={0.2}
            />

            <TimelineStep
              number={3}
              title="You turn it into a package. They post. You earn."
              description="Create co-branded travel experiences based on authentic creator interests"
              icon={<Sparkles className="h-8 w-8" />}
              color="from-pink-400 to-pink-500"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Creator Cards Grid */}
      <section id="creators" className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Creator{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500">
                Conversations
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Real creators talking about real travel experiences — ready to become your next campaign
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CreatorCard
              quote="I'm planning a 5-day escape to Portugal with a focus on local cuisine and wine"
              tone="Excited"
              topic="Food Tourism"
              sentiment="Anticipatory"
              image="/portugal-vineyard-sunset.png"
              delay={0}
            />

            <CreatorCard
              quote="We should do a wellness retreat in Bali with morning yoga and cooking classes"
              tone="Thoughtful"
              topic="Wellness Travel"
              sentiment="Inspired"
              image="/bali-yoga-sunrise.png"
              delay={0.1}
            />

            <CreatorCard
              quote="I'm thinking about renting a villa in Tulum for a month to work remotely"
              tone="Contemplative"
              topic="Remote Work"
              sentiment="Curious"
              image="/tulum-beach-villa-sunset.png"
              delay={0.2}
            />

            <CreatorCard
              quote="Anyone else want to explore the hidden food markets in Marrakech?"
              tone="Enthusiastic"
              topic="Cultural Exploration"
              sentiment="Adventurous"
              image="/placeholder.svg?key=tx7rd"
              delay={0.3}
            />

            <CreatorCard
              quote="I need to find the perfect surf house in Lisbon for a week of waves and work"
              tone="Determined"
              topic="Adventure Travel"
              sentiment="Focused"
              image="/lisbon-surf-sunset.png"
              delay={0.4}
            />

            <CreatorCard
              quote="Tokyo food tour is definitely happening this fall - looking for the best ramen spots"
              tone="Decisive"
              topic="Culinary Tourism"
              sentiment="Excited"
              image="/placeholder.svg?height=400&width=600&query=tokyo ramen shop night lights"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              What Brands{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500">
                Are Saying
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Travel brands that transformed their marketing through listening
            </p>
          </motion.div>

          <TestimonialSlider />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 w-80 h-80 bg-gradient-to-r from-amber-500/30 to-pink-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/30 to-amber-500/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Your audience already believes in the campaign.{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500">
                  They just haven't booked it yet.
                </span>
              </h2>
              <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
                Stop guessing what creators want. Start listening to what they're already saying.
              </p>

              <Button className="bg-gradient-to-r from-amber-400 to-pink-500 text-black hover:opacity-90 transition-opacity text-lg px-8 py-6 h-auto rounded-md">
                Launch the Listening Engine
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Headphones className="h-6 w-6 text-amber-400" />
                <span className="text-xl font-bold tracking-tight">Audiantix</span>
              </div>
              <p className="text-zinc-400 max-w-md mb-4">
                The world's first listening engine that discovers creators talking about travel experiences you can
                package, sell, and launch.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-zinc-500 hover:text-amber-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-zinc-500 hover:text-amber-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-zinc-500 hover:text-amber-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-800">
            <p className="text-sm text-zinc-500 mb-4 md:mb-0">© 2023 Audiantix. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
