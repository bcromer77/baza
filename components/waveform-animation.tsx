"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function WaveformAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 300
    canvas.height = 60

    const bars = 30
    const barWidth = 6
    const barGap = 4
    const barMaxHeight = 40

    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < bars; i++) {
        const height = Math.random() * barMaxHeight + 5
        const hue = 30 + (i / bars) * 30 // Amber to pink gradient

        ctx.fillStyle = `hsla(${hue}, 100%, 60%, 0.7)`
        ctx.fillRect(i * (barWidth + barGap), (canvas.height - height) / 2, barWidth, height)
      }

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-pink-500/20 rounded-full blur-md"></div>
      <canvas ref={canvasRef} className="relative"></canvas>
    </motion.div>
  )
}
