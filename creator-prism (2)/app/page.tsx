"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Instagram,
  Twitter,
  AtSign,
  Youtube,
  Facebook,
  Flame,
  ArrowRight,
  Search,
  Clock,
  DollarSign,
  BarChart,
  Users,
} from "lucide-react"

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const logoVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
}

const torchFlame = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

const gradientShift = {
  animate: {
    background: [
      "radial-gradient(circle at center, rgba(25,25,25,0.8) 0%, rgba(0,0,0,1) 70%)",
      "radial-gradient(circle at center, rgba(25,25,100,0.2) 0%, rgba(0,0,0,1) 70%)",
      "radial-gradient(circle at center, rgba(100,25,100,0.2) 0%, rgba(0,0,0,1) 70%)",
      "radial-gradient(circle at center, rgba(25,25,25,0.8) 0%, rgba(0,0,0,1) 70%)",
    ],
    transition: {
      duration: 15,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  },
}

const cardHover = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.05, rotate: 2, transition: { duration: 0.3 } },
}

export default function Home() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [userType, setUserType] = useState("creator")
  const [activeTimelineStep, setActiveTimelineStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState("white jeans in nightclubs UK")

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email")
    console.log("Sign-up submitted:", { email, userType })
    setIsSignUpOpen(false)
    // Add backend integration here
  }

  const timelineSteps = [
    {
      id: 1,
      title: "Audience Analysis",
      description: "Creator Torch analyzes comment timestamps, engagement patterns, and content performance.",
      icon: Clock,
      color: "amber",
    },
    {
      id: 2,
      title: "Insight Generation",
      description: "Our MCP engine identifies peak engagement times and topics driving the most interaction.",
      icon: BarChart,
      color: "orange",
    },
    {
      id: 3,
      title: "Brand Matching",
      description: "We match your audience insights with brands seeking those exact demographics and interests.",
      icon: Users,
      color: "yellow",
    },
    {
      id: 4,
      title: "Monetization",
      description: "Partnerships are formed based on data-driven matches, maximizing conversion and ROI.",
      icon: DollarSign,
      color: "amber",
    },
  ]

  const influencerCards = [
    {
      name: "Sophie Bennett",
      handle: "@sophiestyle",
      location: "London, UK",
      followers: "128K",
      engagement: "4.2%",
      relevance: "97%",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      name: "Marcus Wright",
      handle: "@marcusnight",
      location: "Manchester, UK",
      followers: "85K",
      engagement: "5.1%",
      relevance: "94%",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      name: "Olivia Chen",
      handle: "@livfashion",
      location: "Birmingham, UK",
      followers: "210K",
      engagement: "3.8%",
      relevance: "91%",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      name: "James Thompson",
      handle: "@jamesnightlife",
      location: "Glasgow, UK",
      followers: "76K",
      engagement: "6.2%",
      relevance: "89%",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      name: "Zara Patel",
      handle: "@zarastyle",
      location: "Leeds, UK",
      followers: "95K",
      engagement: "4.7%",
      relevance: "86%",
      image: "/placeholder.svg?height=400&width=300",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Removed the glare/flare component */}

        <motion.div variants={logoVariants} initial="hidden" animate="visible" className="relative z-10 mb-8">
          <motion.div variants={torchFlame} animate="animate" className="w-32 h-32 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Flame className="h-16 w-16 text-orange-400/80" />
            </div>
            <div className="absolute inset-0 border-2 border-orange-300/30 rounded-lg transform rotate-0" />
            <div className="absolute inset-0 border-2 border-yellow-300/30 rounded-lg transform rotate-15" />
            <div className="absolute inset-0 border-2 border-amber-300/30 rounded-lg transform rotate-30" />
            <div className="absolute inset-0 border-2 border-white/30 rounded-lg transform rotate-45" />
          </motion.div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-light tracking-widest">
            TORCH
          </div>
        </motion.div>

        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-light tracking-tight mb-6 max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200"
        >
          Be Heard, Get Found
        </motion.h1>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-xl max-w-xl mb-10 text-white/80 font-light"
        >
          Why does social media feel like a big, noisy room where no one's listening? We believe creators and brands
          deserve real connections that change their commercial lives. Creator Torch listens smart to match you
          perfectly—no guesswork, just results.
        </motion.p>

        {/* Prism Visualization */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="relative z-10 mb-12 w-full max-w-3xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-center">
            {/* Creators Side */}
            <div className="bg-gradient-to-r from-amber-950/30 to-transparent p-6 rounded-l-lg border-l border-t border-b border-amber-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-amber-400" />
                </div>
                <p className="text-amber-200 text-lg font-light">Creators</p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <span className="text-white/80">Audience Data</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <span className="text-white/80">Content Performance</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <span className="text-white/80">Engagement Patterns</span>
                </li>
              </ul>
            </div>

            {/* MCP/Prism in the Middle */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                    opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                  className="w-24 h-24 relative"
                >
                  <div className="absolute inset-0 border-2 border-orange-300/30 rounded-lg transform rotate-0" />
                  <div className="absolute inset-0 border-2 border-yellow-300/30 rounded-lg transform rotate-15" />
                  <div className="absolute inset-0 border-2 border-amber-300/30 rounded-lg transform rotate-30" />
                  <div className="absolute inset-0 border-2 border-white/30 rounded-lg transform rotate-45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Flame className="h-10 w-10 text-orange-400/80" />
                  </div>
                </motion.div>
              </div>
              <div className="bg-gradient-to-b from-orange-950/30 to-transparent p-6 rounded-lg border border-orange-500/20 backdrop-blur-sm text-center h-full flex flex-col items-center justify-center">
                <p className="text-orange-200 text-lg font-light mb-2">We Listen Smart</p>
                <p className="text-white/60 text-xs">Analyzing • Matching • Connecting</p>
              </div>
              <motion.div
                animate={{
                  x: [0, 10, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -right-3 top-1/2 transform -translate-y-1/2"
              >
                <ArrowRight className="h-6 w-6 text-orange-300/80" />
              </motion.div>
              <motion.div
                animate={{
                  x: [0, -10, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -left-3 top-1/2 transform -translate-y-1/2"
              >
                <ArrowRight className="h-6 w-6 text-orange-300/80 rotate-180" />
              </motion.div>
            </div>

            {/* Brands Side */}
            <div className="bg-gradient-to-l from-yellow-950/30 to-transparent p-6 rounded-r-lg border-r border-t border-b border-yellow-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-yellow-200 text-lg font-light">Brands & Agencies</p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                  <span className="text-white/80">Target Demographics</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                  <span className="text-white/80">Campaign Objectives</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                  <span className="text-white/80">Brand Values</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">
              The result: <span className="text-orange-200">Real matches. Bigger wins. Instant success.</span>
            </p>
          </div>
        </motion.div>

        <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
          <DialogTrigger asChild>
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-6 rounded-full text-lg font-light tracking-wide border-0">
                Experience It Now
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="bg-black/95 border border-white/20 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-light tracking-wide text-center">Join Creator Torch</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="creator" className="mt-6" onValueChange={setUserType}>
              <TabsList className="grid grid-cols-3 bg-black/50 border border-white/10">
                <TabsTrigger
                  value="creator"
                  className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-200"
                >
                  Creator
                </TabsTrigger>
                <TabsTrigger
                  value="brand"
                  className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-200"
                >
                  Brand
                </TabsTrigger>
                <TabsTrigger
                  value="agency"
                  className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-200"
                >
                  Agency
                </TabsTrigger>
              </TabsList>

              <TabsContent value="creator" className="pt-4">
                <p className="text-white/70 mb-6">
                  We'll help you understand your audience better and connect you with brands that truly resonate with
                  your followers.
                </p>
              </TabsContent>
              <TabsContent value="brand" className="pt-4">
                <p className="text-white/70 mb-6">
                  Discover creators whose audiences perfectly align with your brand values and marketing objectives.
                </p>
              </TabsContent>
              <TabsContent value="agency" className="pt-4">
                <p className="text-white/70 mb-6">
                  Optimize your clients' campaigns by matching them with creators who have the most relevant and engaged
                  audiences.
                </p>
              </TabsContent>

              <div className="space-y-4 mt-2">
                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="bg-transparent border-white/20 focus:border-white h-12"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-12 font-light border-0"
                  >
                    Continue with Email
                  </Button>
                </form>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-4 text-white/50 text-sm">or continue with</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {userType === "creator" && (
                    <>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 bg-transparent border-white/20 hover:bg-white/5 text-white"
                      >
                        <Instagram className="h-4 w-4" />
                        <span>Instagram</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 bg-transparent border-white/20 hover:bg-white/5 text-white"
                      >
                        <Twitter className="h-4 w-4" />
                        <span>Twitter</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 bg-transparent border-white/20 hover:bg-white/5 text-white"
                      >
                        <Youtube className="h-4 w-4" />
                        <span>YouTube</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 bg-transparent border-white/20 hover:bg-white/5 text-white"
                      >
                        <AtSign className="h-4 w-4" />
                        <span>TikTok</span>
                      </Button>
                    </>
                  )}

                  {userType === "brand" && (
                    <>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 bg-transparent border-white/20 hover:bg-white/5 text-white"
                      >
                        <Facebook className="h-4 w-4" />
                        <span>Facebook</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 bg-transparent border-white/20 hover:bg-white/5 text-white"
                      >
                        <Twitter className="h-4 w-4" />
                        <span>Twitter</span>
                      </Button>
                    </>
                  )}

                  {userType === "agency" && (
                    <>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 bg-transparent border-white/20 hover:bg-white/5 text-white"
                      >
                        <Facebook className="h-4 w-4" />
                        <span>Facebook</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 bg-transparent border-white/20 hover:bg-white/5 text-white"
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>
      </section>

      {/* Listen Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-200">
              We Hear You
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Why do so many creators feel unseen in the crowd? We believe your true audience is waiting to be
              discovered. We hear you and light the way to perfect matches.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            <div className="border border-amber-500/20 p-8 rounded-lg backdrop-blur-sm bg-amber-500/5 hover:bg-amber-500/10 transition-all duration-300">
              <p className="text-xl font-light mb-2 text-amber-200">Geography</p>
              <p className="text-3xl font-light">38% Lisbon</p>
            </div>
            <div className="border border-orange-500/20 p-8 rounded-lg backdrop-blur-sm bg-orange-500/5 hover:bg-orange-500/10 transition-all duration-300">
              <p className="text-xl font-light mb-2 text-orange-200">Behavior</p>
              <p className="text-3xl font-light">Surf Engagement</p>
            </div>
            <div className="border border-yellow-500/20 p-8 rounded-lg backdrop-blur-sm bg-yellow-500/5 hover:bg-yellow-500/10 transition-all duration-300">
              <p className="text-xl font-light mb-2 text-yellow-200">Intent</p>
              <p className="text-3xl font-light">Eco-conscious</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Monetization Timeline Section */}
      <section className="py-32 px-6 relative">
        <motion.div className="absolute inset-0" animate="animate" variants={gradientShift} />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200">
              How Creator Torch Drives Monetization
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Why should creators miss out on revenue their audience can unlock? We believe your voice should fuel your
              commercial success. Creator Torch listens smart to turn audience insights into real opportunities.
            </p>
          </motion.div>

          {/* Timeline Slider */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <div className="flex justify-between items-center relative mb-8">
              {/* Timeline Track */}
              <div className="absolute h-1 bg-white/10 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>

              {/* Timeline Steps */}
              {timelineSteps.map((step) => (
                <div
                  key={step.id}
                  className={`relative z-10 flex flex-col items-center cursor-pointer`}
                  onClick={() => setActiveTimelineStep(step.id)}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeTimelineStep === step.id
                        ? `bg-${step.color}-500/50 border-2 border-${step.color}-400`
                        : "bg-white/10 border border-white/30"
                    }`}
                  >
                    <step.icon
                      className={`h-5 w-5 ${
                        activeTimelineStep === step.id ? `text-${step.color}-200` : "text-white/50"
                      }`}
                    />
                  </div>
                  <p
                    className={`mt-2 text-sm font-light transition-all duration-300 ${
                      activeTimelineStep === step.id ? "text-white" : "text-white/50"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Timeline Content */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
              {timelineSteps.map((step) => (
                <div key={step.id} className={`${activeTimelineStep === step.id ? "block" : "hidden"}`}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className={`text-3xl font-light mb-4 text-${step.color}-200`}>{step.title}</h3>
                      <p className="text-white/80 mb-6">{step.description}</p>

                      {step.id === 1 && (
                        <div className="space-y-4">
                          <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-amber-200">Comment Timestamp Analysis</p>
                              <p className="text-white/60 text-sm">Last 30 days</p>
                            </div>
                            <div className="h-12 bg-black/50 rounded-md overflow-hidden relative">
                              <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-amber-500/20 to-amber-500/40"></div>
                              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-amber-500/40 to-amber-500/60"></div>
                              <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-amber-500/60 to-amber-500/80"></div>
                              <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 h-8 w-1 bg-amber-400"></div>
                              <div className="absolute top-0 left-3/4 transform translate-x-2 -translate-y-1/2 text-xs text-amber-200">
                                Peak
                              </div>
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-white/40">
                              <span>00:00</span>
                              <span>06:00</span>
                              <span>12:00</span>
                              <span>18:00</span>
                              <span>24:00</span>
                            </div>
                            <p className="mt-4 text-white/70">
                              Your audience is most active at <span className="text-amber-200">19:30 - 21:45</span>
                            </p>
                          </div>
                        </div>
                      )}

                      {step.id === 2 && (
                        <div className="space-y-4">
                          <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                            <p className="text-orange-200 mb-2">Top Engagement Topics</p>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-full bg-black/50 h-4 rounded-full overflow-hidden">
                                  <div className="bg-orange-500/60 h-full rounded-full" style={{ width: "85%" }}></div>
                                </div>
                                <span className="text-white/80 text-sm whitespace-nowrap">Surf Technique (85%)</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-full bg-black/50 h-4 rounded-full overflow-hidden">
                                  <div className="bg-orange-500/60 h-full rounded-full" style={{ width: "72%" }}></div>
                                </div>
                                <span className="text-white/80 text-sm whitespace-nowrap">Equipment (72%)</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-full bg-black/50 h-4 rounded-full overflow-hidden">
                                  <div className="bg-orange-500/60 h-full rounded-full" style={{ width: "64%" }}></div>
                                </div>
                                <span className="text-white/80 text-sm whitespace-nowrap">Travel Locations (64%)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {step.id === 3 && (
                        <div className="space-y-4">
                          <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                            <p className="text-yellow-200 mb-2">Brand Match Criteria</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-white/80">Audience Geography</span>
                                <span className="text-yellow-200">38% Lisbon</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-white/80">Peak Engagement Time</span>
                                <span className="text-yellow-200">Evening (19:30-21:45)</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-white/80">Top Interest</span>
                                <span className="text-yellow-200">Surf Equipment</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-white/80">Audience Values</span>
                                <span className="text-yellow-200">Eco-conscious</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {step.id === 4 && (
                        <div className="space-y-4">
                          <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                            <p className="text-amber-200 mb-2">Monetization Results</p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-black/30 p-3 rounded-lg">
                                <p className="text-3xl font-light text-amber-200">$15K</p>
                                <p className="text-xs text-white/60">Global Brand</p>
                              </div>
                              <div className="bg-black/30 p-3 rounded-lg">
                                <p className="text-3xl font-light text-amber-200">$8K</p>
                                <p className="text-xs text-white/60">Local Sponsor</p>
                              </div>
                              <div className="bg-black/30 p-3 rounded-lg">
                                <p className="text-3xl font-light text-amber-200">$9K</p>
                                <p className="text-xs text-white/60">Event Revenue</p>
                              </div>
                              <div className="bg-black/30 p-3 rounded-lg">
                                <p className="text-3xl font-light text-amber-200">$32K</p>
                                <p className="text-xs text-white/60">Total Value</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-black/30 rounded-lg p-6 border border-white/10">
                      {step.id === 1 && (
                        <div className="space-y-4">
                          <p className="text-amber-200 mb-2">Comment Engagement Patterns</p>
                          <div className="border border-white/10 rounded-lg p-3 bg-black/50">
                            <div className="flex items-start gap-2">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex-shrink-0 flex items-center justify-center">
                                <span className="text-amber-200 text-xs">JM</span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-white/90 text-sm">João Mendes</p>
                                  <p className="text-white/40 text-xs">20:15</p>
                                </div>
                                <p className="text-white/70 text-sm">That wave was insane! What board are you using?</p>
                              </div>
                            </div>
                          </div>

                          <div className="border border-white/10 rounded-lg p-3 bg-black/50">
                            <div className="flex items-start gap-2">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex-shrink-0 flex items-center justify-center">
                                <span className="text-amber-200 text-xs">MC</span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-white/90 text-sm">Maria Costa</p>
                                  <p className="text-white/40 text-xs">20:22</p>
                                </div>
                                <p className="text-white/70 text-sm">
                                  Love the eco-friendly wetsuit! Where can I get one?
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="border border-white/10 rounded-lg p-3 bg-black/50">
                            <div className="flex items-start gap-2">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex-shrink-0 flex items-center justify-center">
                                <span className="text-amber-200 text-xs">TS</span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-white/90 text-sm">Tiago Silva</p>
                                  <p className="text-white/40 text-xs">20:37</p>
                                </div>
                                <p className="text-white/70 text-sm">Will you be at the Nazaré event next month?</p>
                              </div>
                            </div>
                          </div>

                          <p className="text-white/60 text-sm italic">
                            Creator Torch analyzes thousands of comments to identify patterns in engagement times and
                            topics.
                          </p>
                        </div>
                      )}

                      {step.id === 2 && (
                        <div className="space-y-4">
                          <p className="text-orange-200 mb-2">Content Performance Analysis</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="border border-white/10 rounded-lg p-3 bg-black/50">
                              <p className="text-white/90 text-sm mb-1">Surf Tutorial Video</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-white/60">Views</span>
                                <span className="text-orange-200">128K</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-white/60">Comments</span>
                                <span className="text-orange-200">1.2K</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-white/60">Peak Time</span>
                                <span className="text-orange-200">20:15</span>
                              </div>
                            </div>

                            <div className="border border-white/10 rounded-lg p-3 bg-black/50">
                              <p className="text-white/90 text-sm mb-1">Equipment Review</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-white/60">Views</span>
                                <span className="text-orange-200">95K</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-white/60">Comments</span>
                                <span className="text-orange-200">845</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-white/60">Peak Time</span>
                                <span className="text-orange-200">19:45</span>
                              </div>
                            </div>
                          </div>

                          <div className="border border-white/10 rounded-lg p-3 bg-black/50">
                            <p className="text-white/90 text-sm mb-2">Keyword Analysis</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-orange-500/20 rounded-full text-xs text-orange-200">
                                eco-friendly
                              </span>
                              <span className="px-2 py-1 bg-orange-500/30 rounded-full text-xs text-orange-200">
                                surfboard
                              </span>
                              <span className="px-2 py-1 bg-orange-500/20 rounded-full text-xs text-orange-200">
                                wetsuit
                              </span>
                              <span className="px-2 py-1 bg-orange-500/30 rounded-full text-xs text-orange-200">
                                Nazaré
                              </span>
                              <span className="px-2 py-1 bg-orange-500/20 rounded-full text-xs text-orange-200">
                                Portugal
                              </span>
                              <span className="px-2 py-1 bg-orange-500/30 rounded-full text-xs text-orange-200">
                                big wave
                              </span>
                              <span className="px-2 py-1 bg-orange-500/20 rounded-full text-xs text-orange-200">
                                technique
                              </span>
                              <span className="px-2 py-1 bg-orange-500/30 rounded-full text-xs text-orange-200">
                                Lisbon
                              </span>
                            </div>
                          </div>

                          <p className="text-white/60 text-sm italic">
                            Creator Torch identifies the most engaging content types and topics to inform brand
                            partnerships.
                          </p>
                        </div>
                      )}

                      {step.id === 3 && (
                        <div className="space-y-4">
                          <p className="text-yellow-200 mb-2">Brand Matching Process</p>
                          <div className="border border-white/10 rounded-lg p-4 bg-black/50">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                <Flame className="h-5 w-5 text-yellow-400" />
                              </div>
                              <div>
                                <p className="text-white/90">Multi-Context Processing</p>
                                <p className="text-white/60 text-xs">Analyzing audience data</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <p className="text-white/80 text-sm">Scanning 250+ global brands</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <p className="text-white/80 text-sm">Matching audience demographics</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <p className="text-white/80 text-sm">Aligning with brand values</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <p className="text-white/80 text-sm">Evaluating partnership potential</p>
                              </div>
                            </div>
                          </div>

                          <div className="border border-white/10 rounded-lg p-4 bg-black/50">
                            <p className="text-white/90 mb-2">Top Brand Matches</p>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-white/80 text-sm">Global Outdoor Brand</span>
                                <span className="text-yellow-200 text-sm">94% Match</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-white/80 text-sm">Sustainable Apparel</span>
                                <span className="text-yellow-200 text-sm">91% Match</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-white/80 text-sm">Energy Drink</span>
                                <span className="text-yellow-200 text-sm">87% Match</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-white/80 text-sm">Local Surf Shop</span>
                                <span className="text-yellow-200 text-sm">95% Match</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {step.id === 4 && (
                        <div className="space-y-4">
                          <p className="text-amber-200 mb-2">Partnership Results</p>
                          <div className="border border-white/10 rounded-lg p-4 bg-black/50">
                            <div className="flex items-center justify-between mb-4">
                              <p className="text-white/90">Nazaré Week Event</p>
                              <p className="text-amber-200">$32K Total</p>
                            </div>

                            <div className="space-y-4">
                              <div className="bg-black/30 p-3 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-white/80 text-sm">Global Outdoor Brand</p>
                                  <p className="text-amber-200">$15K</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                                    <div className="bg-amber-500/60 h-full rounded-full" style={{ width: "47%" }}></div>
                                  </div>
                                  <span className="text-white/60 text-xs">47%</span>
                                </div>
                              </div>

                              <div className="bg-black/30 p-3 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-white/80 text-sm">Energy Drink Brand</p>
                                  <p className="text-amber-200">$8K</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                                    <div className="bg-amber-500/60 h-full rounded-full" style={{ width: "25%" }}></div>
                                  </div>
                                  <span className="text-white/60 text-xs">25%</span>
                                </div>
                              </div>

                              <div className="bg-black/30 p-3 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-white/80 text-sm">Local Sponsors</p>
                                  <p className="text-amber-200">$9K</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                                    <div className="bg-amber-500/60 h-full rounded-full" style={{ width: "28%" }}></div>
                                  </div>
                                  <span className="text-white/60 text-xs">28%</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border border-white/10 rounded-lg p-4 bg-black/50">
                            <p className="text-white/90 mb-2">ROI Analysis</p>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-black/30 p-2 rounded-lg">
                                <p className="text-xs text-white/60">Engagement Rate</p>
                                <p className="text-xl text-amber-200">8.2%</p>
                                <p className="text-xs text-green-400">+3.1% vs avg</p>
                              </div>
                              <div className="bg-black/30 p-2 rounded-lg">
                                <p className="text-xs text-white/60">Conversion Rate</p>
                                <p className="text-xl text-amber-200">4.7%</p>
                                <p className="text-xs text-green-400">+2.3% vs avg</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200">
              Case Study: Nazaré Week
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Why do creators like Nazaré Surf struggle to find the right partners? We believe their commercial lives
              should thrive through real connections.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-light mb-6 text-amber-200">The Challenge</h3>
              <p className="text-white/80 mb-6">
                Nazaré Surf, a content creator with 250K followers, wanted to organize "Nazaré Week" — a celebration of
                big wave surfing in Portugal. They needed to find the right brand partners who would resonate with their
                audience and provide sufficient funding.
              </p>

              <h3 className="text-3xl font-light mb-6 mt-12 text-orange-200">The Approach</h3>
              <p className="text-white/80 mb-6">Using Creator Torch's audience analysis, Nazaré Surf discovered:</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  </div>
                  <span className="text-white/80">
                    38% of their audience was based in Lisbon, with strong connections to local businesses
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  </div>
                  <span className="text-white/80">
                    72% showed high engagement with eco-conscious content and sustainable brands
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  </div>
                  <span className="text-white/80">
                    Creator Torch identified global outdoor brands and local surf shops as ideal partners based on
                    audience alignment
                  </span>
                </li>
              </ul>

              <h3 className="text-3xl font-light mb-6 mt-12 text-yellow-200">The Results</h3>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="border border-yellow-500/20 p-4 rounded-lg backdrop-blur-sm bg-yellow-500/5">
                  <p className="text-3xl font-light text-yellow-200">$32K</p>
                  <p className="text-sm text-white/70">Total Sponsorship</p>
                </div>
                <div className="border border-yellow-500/20 p-4 rounded-lg backdrop-blur-sm bg-yellow-500/5">
                  <p className="text-3xl font-light text-yellow-200">5</p>
                  <p className="text-sm text-white/70">Brand Partners</p>
                </div>
                <div className="border border-yellow-500/20 p-4 rounded-lg backdrop-blur-sm bg-yellow-500/5">
                  <p className="text-3xl font-light text-yellow-200">3.2M</p>
                  <p className="text-sm text-white/70">Content Reach</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-amber-200 group cursor-pointer">
                <span className="font-light">Read the full case study</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="order-1 md:order-2 space-y-6">
              <div className="aspect-video rounded-lg overflow-hidden border border-amber-500/20 bg-gradient-to-br from-amber-950/40 to-black/80 p-6 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-amber-200 text-lg font-light">Nazaré Week</p>
                    <p className="text-white/60 text-sm">Annual Surf Event</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Flame className="h-4 w-4 text-amber-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-orange-500/40 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/90">Global Outdoor Brand</p>
                      <p className="text-white/60 text-sm">Primary Sponsor</p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-orange-200">$15,000</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-red-500/40 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/90">Energy Drink Brand</p>
                      <p className="text-white/60 text-sm">Energy Partner</p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-orange-200">$8,000</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500/40 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/90">Local Surf Shop</p>
                      <p className="text-white/60 text-sm">Local Partner</p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-orange-200">$5,000</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <p className="text-white/70">Total Sponsorship</p>
                    <p className="text-2xl font-light text-amber-200">$32,000</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <span className="text-black font-medium text-sm">NS</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-light">
                      "Creator Torch transformed how we approach brand partnerships. We went from chasing any sponsor to
                      finding partners that truly connect with our audience."
                    </p>
                    <p className="text-white/60 mt-2 text-sm">— João Silva, Founder of Nazaré Surf</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Influencer Matching Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200">
              How We Listen Smart
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Why settle for shallow metrics like likes and follows? We believe in hearing the real story behind your
              content. Creator Torch listens smart to find the perfect influencers for your brand, based on what truly
              matters.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <div className="border border-white/10 rounded-lg p-6 bg-black/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <Search className="h-5 w-5 text-amber-200" />
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <p className="text-white/90">Search Query:</p>
                    <p className="text-amber-200">{searchQuery}</p>
                  </div>
                </div>
                <Button className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30">
                  Search
                </Button>
              </div>

              <div className="mb-8">
                <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <p className="text-white/60 text-xs mt-1">
                  Analyzing 2.5M creator profiles and 18.7B content data points
                </p>
              </div>

              <p className="text-white/80 mb-4">Results: 5 influencers found matching your criteria</p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {influencerCards.map((card, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transform rotate-0 hover:rotate-2 transition-all duration-300"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  >
                    <div className="aspect-[3/4] bg-gradient-to-b from-amber-950/30 to-black/50 relative">
                      <img
                        src={card.image || "/placeholder.svg"}
                        alt={card.name}
                        className="w-full h-full object-cover opacity-70 mix-blend-overlay"
                      />
                      <div className="absolute top-3 right-3 bg-amber-500/80 text-black text-xs font-medium px-2 py-1 rounded-full">
                        {card.relevance}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-white font-light text-sm">{card.name}</p>
                      <p className="text-amber-200 text-xs">{card.handle}</p>
                      <div className="flex justify-between items-center mt-2 text-xs">
                        <span className="text-white/60">{card.location}</span>
                        <span className="text-white/60">{card.followers}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sign-Up Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-amber-950/30" />
        <div className="max-w-md mx-auto relative z-10">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200">
              Be Heard Today
            </h2>
            <p className="text-lg text-white/70">
              Why keep struggling in the noise? Join 1,247 creators and $2.3M unlocked—for all, not just one. Be heard,
              get found, and change your commercial life.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button
              onClick={() => setIsSignUpOpen(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-12 font-light border-0"
            >
              Begin Your Journey
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

