"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote: "We didn't scout creators — we searched for real mentions.",
    author: "Sarah Johnson",
    role: "Marketing Director, Luxury Escapes",
  },
  {
    quote: "This isn't performance marketing. It's performance listening.",
    author: "Michael Chen",
    role: "CEO, Wanderlust Hotels",
  },
  {
    quote: "Our ROI tripled when we started building campaigns around actual creator conversations.",
    author: "Emma Rodriguez",
    role: "Head of Partnerships, TravelNow",
  },
  {
    quote: "Audiantix helped us discover niche travel trends months before they hit the mainstream.",
    author: "David Kim",
    role: "Brand Strategy, Boutique Stays",
  },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = () => {
    setDirection(1)
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 200 : -200,
        opacity: 0,
      }
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 200 : -200,
        opacity: 0,
      }
    },
  }

  return (
    <div className="max-w-4xl mx-auto relative">
      <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-12 relative">
        <div className="absolute -top-5 -left-5">
          <div className="relative bg-gradient-to-r from-amber-400 to-pink-500 p-3 rounded-full">
            <Quote className="h-6 w-6 text-black" />
          </div>
        </div>

        <div className="h-48">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute w-full"
            >
              <blockquote className="text-3xl font-medium mb-8 text-center">"{testimonials[current].quote}"</blockquote>
              <div className="text-center">
                <p className="text-lg font-medium">{testimonials[current].author}</p>
                <p className="text-zinc-400">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-zinc-400" />
        </button>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full ${current === index ? "bg-amber-400" : "bg-zinc-700"} transition-colors`}
          />
        ))}
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-zinc-400" />
        </button>
      </div>
    </div>
  )
}
