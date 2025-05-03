"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Stamp } from "lucide-react"
import Image from "next/image"

interface VoiceCardProps {
  quote: string
  tone: string
  sentiment: string
  topic: string
  engagement: string
  prompt: string
  roi: string
  image: string
}

export default function VoiceCard({ quote, tone, sentiment, topic, engagement, prompt, roi, image }: VoiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={cardVariants} className="perspective-1000">
      <div
        className={`relative w-full h-[450px] cursor-pointer transition-all duration-700 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
        onClick={handleFlip}
      >
        {/* Front of card */}
        <div className={`absolute inset-0 backface-hidden ${isFlipped ? "invisible" : ""}`}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden h-full flex flex-col shadow-xl">
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <Image src={image || "/placeholder.svg"} alt={topic} fill className="object-cover" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                <span className="text-xs text-zinc-400">
                  {tone} • {sentiment} • {topic} • {engagement} engagement
                </span>
              </div>
              <blockquote className="text-xl font-medium mb-4 flex-1">"{quote}"</blockquote>
              <div className="bg-zinc-800/50 rounded p-3 mb-4">
                <p className="text-sm text-amber-400 mb-1">Smart prompt:</p>
                <p className="text-sm">{prompt}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-zinc-400">{roi}</p>
                <p className="text-xs text-zinc-500">Tap to flip</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 ${isFlipped ? "" : "invisible"}`}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden h-full flex flex-col shadow-xl p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-bold">Partnership Opportunity</h3>
              <div className="rotate-12">
                <div className="bg-amber-400 text-black font-bold py-1 px-3 rounded-sm text-sm flex items-center gap-1 shadow-lg">
                  <Stamp className="h-4 w-4" />
                  <span>MATCH</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <p className="text-sm text-zinc-400 mb-1">Creator Quote:</p>
                <p className="text-md">"{quote}"</p>
              </div>

              <div>
                <p className="text-sm text-zinc-400 mb-1">Opportunity:</p>
                <p className="text-md">{prompt}</p>
              </div>

              <div>
                <p className="text-sm text-zinc-400 mb-1">Potential ROI:</p>
                <p className="text-md">{roi}</p>
              </div>

              <div>
                <p className="text-sm text-zinc-400 mb-1">Audience Match:</p>
                <div className="w-full bg-zinc-800 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-pink-500 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <p className="text-xs text-zinc-500 mt-1">85% match with your target demographic</p>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 text-black hover:opacity-90 transition-opacity mt-4">
              Build Travel Offer
            </Button>

            <p className="text-xs text-zinc-500 text-center mt-3">Tap to flip back</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
