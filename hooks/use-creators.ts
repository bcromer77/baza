"use client"

import { useState, useEffect } from "react"
import type { Creator } from "@/types"

// Mock data to simulate API response
const mockCreators: Creator[] = [
  {
    id: "creator1",
    name: "Lena",
    voiceHighlights: [
      {
        quote: "Planning a breathwork retreat at AfrikaBurn this year.",
        tone: "confident",
        topic: "wellness travel",
        sentiment: "anticipatory",
      },
    ],
  },
  {
    id: "creator2",
    name: "Marco",
    voiceHighlights: [
      {
        quote: "I'm thinking about hosting a series of supper clubs in Florence this summer.",
        tone: "excited",
        topic: "food",
        sentiment: "enthusiastic",
      },
    ],
  },
  {
    id: "creator3",
    name: "Sophia",
    voiceHighlights: [
      {
        quote: "We should organize a surf camp in Morocco with local instructors.",
        tone: "passionate",
        topic: "adventure",
        sentiment: "inspired",
      },
    ],
  },
  {
    id: "creator4",
    name: "Jamal",
    voiceHighlights: [
      {
        quote: "I want to lead a photography workshop in Tokyo during cherry blossom season.",
        tone: "determined",
        topic: "creative travel",
        sentiment: "focused",
      },
    ],
  },
  {
    id: "creator5",
    name: "Elena",
    voiceHighlights: [
      {
        quote: "Thinking about a wellness retreat in Bali with a focus on digital detox.",
        tone: "thoughtful",
        topic: "retreat",
        sentiment: "contemplative",
      },
    ],
  },
  {
    id: "creator6",
    name: "Carlos",
    voiceHighlights: [
      {
        quote: "Let's plan a Coachella afterparty series in Tulum with local DJs.",
        tone: "energetic",
        topic: "festival",
        sentiment: "excited",
      },
    ],
  },
]

export function useCreators() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCreators = async () => {
      setIsLoading(true)
      try {
        // In a real implementation, this would be an API call
        // const response = await fetch('/api/creators')
        // const data = await response.json()

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setCreators(mockCreators)
        setError(null)
      } catch (err) {
        console.error("Error fetching creators:", err)
        setError("Failed to fetch creators")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCreators()
  }, [])

  return { creators, isLoading, error }
}
