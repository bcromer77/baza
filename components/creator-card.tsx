"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface CreatorCardProps {
  quote: string
  tone: string
  topic: string
  sentiment: string
  image: string
  delay?: number
}

export default function CreatorCard({ quote, tone, topic, sentiment, image, delay = 0 }: CreatorCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden h-full flex flex-col shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <Image src={image || "/placeholder.svg"} alt={topic} fill className="object-cover" />
          </motion.div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 w-2 rounded-full bg-amber-400"></div>
            <span className="text-xs text-zinc-400">
              {tone} • {sentiment} • {topic}
            </span>
          </div>
          <blockquote className="text-xl font-medium mb-6 flex-1">"{quote}"</blockquote>
          <div className="mt-auto">
            <Button className="w-full bg-gradient-to-r from-amber-400 to-pink-500 text-black hover:opacity-90 transition-opacity group">
              <span className="mr-2">Turn Into Campaign</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
