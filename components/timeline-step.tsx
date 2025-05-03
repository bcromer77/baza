"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface TimelineStepProps {
  number: number
  title: string
  description: string
  icon: ReactNode
  color: string
  delay?: number
}

export default function TimelineStep({ number, title, description, icon, color, delay = 0 }: TimelineStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="relative"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-full blur opacity-70`}></div>
          <div className="relative bg-zinc-900 p-4 rounded-full flex items-center justify-center">{icon}</div>
          <div className="absolute -right-1 -bottom-1 bg-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border border-zinc-800">
            {number}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>
    </motion.div>
  )
}
