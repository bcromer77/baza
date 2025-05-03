"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Mic, Eye, Package, Users, ArrowRight } from "lucide-react"

export default function PartnershipFlow() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-cyan-500/10 opacity-30 blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
            Partnership Flow
          </span>{" "}
          – From Voice to Value
        </h2>

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transform -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-70"></div>
                <div className="relative bg-zinc-900 p-4 rounded-full">
                  <Mic className="h-8 w-8 text-pink-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Creator Speaks It</h3>
              <p className="text-zinc-400 text-sm">Creators share ideas in podcasts, videos, and live streams</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur opacity-70"></div>
                <div className="relative bg-zinc-900 p-4 rounded-full">
                  <Eye className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Audiantix Hears It</h3>
              <p className="text-zinc-400 text-sm">Our AI transcribes and identifies commercial opportunities</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full blur opacity-70"></div>
                <div className="relative bg-zinc-900 p-4 rounded-full">
                  <Package className="h-8 w-8 text-cyan-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Travel Partner Matches It</h3>
              <p className="text-zinc-400 text-sm">Travel brands discover perfect creator matches</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-70"></div>
                <div className="relative bg-zinc-900 p-4 rounded-full">
                  <Users className="h-8 w-8 text-pink-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Campaign Launched</h3>
              <p className="text-zinc-400 text-sm">Ideas transform into bookable travel experiences</p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex justify-center mt-12">
            <div className="bg-zinc-900 border border-zinc-800 rounded-full px-6 py-3 flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-pink-500" />
              <span className="text-sm">
                The cycle repeats, creating an ecosystem of voice-powered travel opportunities
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
