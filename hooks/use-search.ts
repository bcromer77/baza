"use client"

import { useState } from "react"
import type { Creator } from "@/types"

export function useSearch() {
  const [results, setResults] = useState<Creator[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string) => {
    if (!query.trim()) return

    setIsSearching(true)
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
      // const data = await response.json()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log(`Searching for: ${query}`)
      // Mock search results would be set here
      setResults([])
      setError(null)
    } catch (err) {
      console.error("Error searching creators:", err)
      setError("Failed to search creators")
    } finally {
      setIsSearching(false)
    }
  }

  return { search, results, isSearching, error }
}
