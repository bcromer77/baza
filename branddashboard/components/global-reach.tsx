"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

interface GlobalReachProps {
  influencers: any[]
}

export default function GlobalReach({ influencers }: GlobalReachProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const mapInitializedRef = useRef(false)

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInitializedRef.current) {
      // Dynamically import Leaflet only on client side
      import("leaflet").then((L) => {
        // Initialize the map
        const map = L.map(mapRef.current!).setView([20, 0], 2)

        // Add tile layer with appropriate styling based on theme
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Add markers for influencers
        influencers.forEach((influencer) => {
          L.marker([influencer.lat, influencer.lon])
            .addTo(map)
            .bindPopup(`${influencer.handle} (${influencer.location})`)
        })

        mapInitializedRef.current = true
      })
    }
  }, [influencers])

  return (
    <section>
      <h2 className="text-2xl font-light mb-4 text-zinc-100 tracking-wide">🌍 Global Reach</h2>
      <Card className="bg-zinc-800/90 backdrop-blur-md border-zinc-700 shadow-lg h-full">
        <CardContent className="p-6">
          <p className="text-center font-light mb-4">Micro-influencers found: 50% Berlin, 30% Tokyo, 15% Sydney</p>
          <div ref={mapRef} className="h-[300px] rounded-lg" />
        </CardContent>
      </Card>
    </section>
  )
}
