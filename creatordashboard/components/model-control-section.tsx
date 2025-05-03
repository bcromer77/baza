"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Users, MapPin, TrendingUp, MessageCircle } from "lucide-react"

// Mock data for creators
const creators = [
  {
    id: 1,
    name: "@lisbonCreator",
    location: "Lisbon, Portugal",
    followers: 30000,
    matchScore: 85,
    sentiment: "Positive",
    topics: ["travel", "food", "lifestyle"],
    image: "/cosmic-artist.png",
    color: "#FF0066",
  },
  {
    id: 2,
    name: "@healthyLifeCoach",
    location: "Porto, Portugal",
    followers: 45000,
    matchScore: 78,
    sentiment: "Positive",
    topics: ["health", "fitness", "wellness"],
    image: "/innovative-workspace.png",
    color: "#00CCFF",
  },
  {
    id: 3,
    name: "@fashionista",
    location: "Lisbon, Portugal",
    followers: 25000,
    matchScore: 72,
    sentiment: "Neutral",
    topics: ["fashion", "beauty", "lifestyle"],
    image: "/abstract-geometric-shapes.png",
    color: "#FFCC00",
  },
]

export function ModelControlSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(true)
  }

  return (
    <Card className="overflow-hidden border-none shadow-lg polaroid-card">
      <CardHeader className="bg-[#FFCC00] text-white p-6">
        <CardTitle className="flex items-center gap-2 text-2xl font-light">
          <Users className="h-5 w-5" />
          Model Control Protocol (MCP)
        </CardTitle>
        <CardDescription className="text-white/80 font-light">
          Find influencers that match your brand criteria
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Find 5 influencers that wear white jeans in Delhi"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-none border-[#FFCC00] font-light focus-visible:ring-[#FFCC00]"
              />
            </div>
            <Button type="submit" className="bg-[#FFCC00] text-white hover:bg-[#FFCC00]/90 rounded-none font-light">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {showResults && (
            <div className="mt-8">
              <h3 className="text-lg font-light mb-6">Search Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {creators.map((creator) => (
                  <Card
                    key={creator.id}
                    className="overflow-hidden border border-[#EEEEEE] dark:border-[#222222] hover:shadow-md transition-shadow polaroid-card-item"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border-2" style={{ borderColor: creator.color }}>
                          <AvatarImage src={creator.image} alt={creator.name} />
                          <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{creator.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1 font-light">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{creator.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center text-sm font-light">
                          <Users className="h-4 w-4 text-[#00CCFF] mr-2" />
                          <span>Followers: {creator.followers.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center text-sm font-light">
                          <TrendingUp className="h-4 w-4 text-[#FF0066] mr-2" />
                          <span>Match Score: {creator.matchScore}%</span>
                        </div>
                        <div className="flex items-center text-sm font-light">
                          <MessageCircle className="h-4 w-4 text-[#FFCC00] mr-2" />
                          <span>Sentiment: {creator.sentiment}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {creator.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs font-light">
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        className="w-full mt-6 bg-black text-white hover:bg-black/90 rounded-none font-light"
                        style={{ backgroundColor: creator.color }}
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 rounded-none border border-[#EEEEEE] dark:border-[#222222] p-6 bg-[#F8F8F8] dark:bg-[#1A1A1A]">
                <h3 className="text-sm font-medium mb-3">How This Search Works</h3>
                <p className="text-sm text-muted-foreground font-light">
                  Our AI analyzes creator content, audience demographics, and engagement patterns to find the perfect
                  matches for your brand. The Model Control Protocol uses:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    <span className="font-light">Natural language processing to understand creator content</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    <span className="font-light">Geospatial analysis for location-based matching</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    <span className="font-light">Sentiment analysis to gauge audience reception</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

// Helper component for the arrow icon
function ArrowRight({ className = "", ...props }: React.ComponentProps<typeof Search>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
