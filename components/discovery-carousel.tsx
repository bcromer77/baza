"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { TreePalmIcon as Palm, Waves, FlameIcon as Fire, Utensils, Mountain } from "lucide-react"

const discoveryItems = [
  {
    icon: <Palm className="h-5 w-5" />,
    text: "Costa Rica yoga this fall",
    color: "from-pink-500 to-purple-500",
  },
  {
    icon: <Waves className="h-5 w-5" />,
    text: "Retreat leaders mentioning Sri Lanka surf",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Fire className="h-5 w-5" />,
    text: "Burning Man Africa wellness retreats",
    color: "from-cyan-500 to-purple-500",
  },
  {
    icon: <Utensils className="h-5 w-5" />,
    text: "Food tours in Tokyo",
    color: "from-pink-500 to-cyan-500",
  },
  {
    icon: <Mountain className="h-5 w-5" />,
    text: "Ski trips in Cortina",
    color: "from-purple-500 to-cyan-500",
  },
]

export default function DiscoveryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % discoveryItems.length)
    }, 3000)
  }

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [])

  const handleItemClick = (index: number) => {
    setActiveIndex(index)
    stopAutoplay()
    startAutoplay()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center mb-12">
        <div className="flex gap-2 overflow-x-auto pb-4 max-w-full hide-scrollbar">
          {discoveryItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                activeIndex === index
                  ? "bg-gradient-to-r text-black font-medium scale-105"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
              style={{
                backgroundImage:
                  activeIndex === index
                    ? `linear-gradient(to right, ${item.color.replace("from-", "").replace("to-", "")})`
                    : "none",
              }}
            >
              {item.icon}
              <span>{item.text}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-80 bg-zinc-900 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 opacity-50" />

        {discoveryItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: activeIndex === index ? 1 : 0,
              x: activeIndex === index ? 0 : 100,
              zIndex: activeIndex === index ? 10 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 p-8 flex flex-col justify-center"
          >
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-black text-sm font-medium mb-4 w-fit`}
            >
              {item.icon}
              <span>Trending Opportunity</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.text}</h3>

            <p className="text-zinc-400 max-w-lg mb-6">
              Our AI has detected a significant increase in creator conversations about this topic. Early partnerships
              show strong engagement and conversion potential.
            </p>

            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Creator volume</p>
                <p className="text-xl font-bold">{Math.floor(Math.random() * 200) + 50}+ creators</p>
              </div>

              <div className="h-10 border-l border-zinc-700"></div>

              <div>
                <p className="text-sm text-zinc-500 mb-1">Avg. engagement</p>
                <p className="text-xl font-bold">{(Math.random() * 5 + 3).toFixed(1)}%</p>
              </div>

              <div className="h-10 border-l border-zinc-700"></div>

              <div>
                <p className="text-sm text-zinc-500 mb-1">Opportunity score</p>
                <p className="text-xl font-bold">{Math.floor(Math.random() * 30) + 70}/100</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
