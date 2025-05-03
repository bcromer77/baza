"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface InfluencerSearchProps {
  influencers: any[]
  onBookInfluencer: (influencer: any) => void
}

export default function InfluencerSearch({ influencers, onBookInfluencer }: InfluencerSearchProps) {
  const [query, setQuery] = useState("")
  const [platform, setPlatform] = useState("")
  const [minEngagement, setMinEngagement] = useState(0)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    // Simple query parsing (e.g., "find 5 micro-influencers talking about sustainable fashion in Berlin")
    const match = query.toLowerCase().match(/find \d+ micro-influencers for a (\w+\s\w+) in (\w+)/i)

    if (!match) {
      setSearchResults([])
      setHasSearched(true)
      return
    }

    const [, topic, location] = match

    let filtered = influencers.filter(
      (influencer) =>
        influencer.topics.some((t: string) => t.toLowerCase().includes(topic)) &&
        influencer.location.toLowerCase() === location.toLowerCase() &&
        influencer.engagementRate >= minEngagement / 100,
    )

    if (platform) {
      filtered = filtered.filter(
        (influencer) =>
          influencer.platforms[platform] && influencer.platforms[platform].engagement >= minEngagement / 100,
      )
    }

    setSearchResults(filtered)
    setHasSearched(true)
  }

  return (
    <div className="space-y-6">
      <div className="max-w-2xl mx-auto">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., find 5 micro-influencers for a communication event in Arcachon"
          className="w-full p-3 rounded-lg border-gray-300 mb-4"
        />

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Filter by Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="YouTube">YouTube</SelectItem>
              <SelectItem value="TikTok">TikTok</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Min Engagement (%)</span>
              <span>{minEngagement.toFixed(1)}</span>
            </div>
            <Slider
              value={[minEngagement]}
              onValueChange={(value) => setMinEngagement(value[0])}
              max={10}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        <Button
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          Search
        </Button>
      </div>

      {hasSearched && (
        <div className="mt-8">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((influencer) => (
                <motion.div
                  key={influencer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={influencer.profilePicture || "/placeholder.svg"}
                    alt={influencer.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800">{influencer.name}</h3>
                    <p className="text-gray-600">{influencer.handle}</p>
                    <div className="flex items-center mt-1 space-x-1 text-gray-600">
                      <span>📍</span>
                      <span>{influencer.location}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {influencer.topics.map((topic: string, index: number) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p>📣 {influencer.followers.toLocaleString()} followers</p>
                      <p>📈 {(influencer.engagementRate * 100).toFixed(1)}% engagement</p>
                      <p className="mt-2 italic text-gray-500">"{influencer.excerpt}"</p>
                    </div>
                    <div className="mt-3 font-medium text-gray-800">Cost: €{influencer.cost}</div>
                    <Button
                      onClick={() => onBookInfluencer(influencer)}
                      className="mt-3 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Book Influencer
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">No micro-influencers found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  )
}
