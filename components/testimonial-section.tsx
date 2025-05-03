"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "We didn't need to brainstorm our next product – we just listened.",
    author: "Head of Product, Club Travel",
    color: "from-amber-400 to-pink-500",
  },
  {
    quote: "Audiantix turns spoken stories into commercial gold.",
    author: "Early Travel Partner",
    color: "from-pink-500 to-cyan-400",
  },
  {
    quote: "We found our next viral campaign by listening, not guessing.",
    author: "Marketing Director, Wanderlust Escapes",
    color: "from-cyan-400 to-amber-400",
  },
]

export default function TestimonialSection() {
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
    hidden: { opacity: 0, y: 30 },
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
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-cyan-500/5 to-amber-500/10 opacity-30 blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400">
            Insight Quotes
          </span>{" "}
          – From Our Partners
        </h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 relative"
            >
              <div className="absolute -top-5 -left-5">
                <div className={`relative bg-gradient-to-r ${testimonial.color} p-3 rounded-full`}>
                  <Quote className="h-6 w-6 text-black" />
                </div>
              </div>

              <blockquote className="text-xl font-medium mt-6 mb-6">"{testimonial.quote}"</blockquote>

              <footer className="text-zinc-400">— {testimonial.author}</footer>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
