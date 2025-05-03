import { NextResponse } from "next/server"
import { influencers } from "@/lib/data"

export async function POST(request: Request) {
  try {
    const { query, platform, minEngagement } = await request.json()

    // Simple query parsing (e.g., "find 5 micro-influencers talking about sustainable fashion in Berlin")
    const match = query.toLowerCase().match(/find \d+ micro-influencers talking about (\w+\s\w+) in (\w+)/i)

    if (!match) {
      return NextResponse.json(
        { error: "Invalid query format. Use: 'find X micro-influencers talking about Y in Z'" },
        { status: 400 },
      )
    }

    const [, topic, location] = match

    // Filter influencers based on query parameters
    let filteredInfluencers = influencers.filter(
      (influencer) =>
        influencer.topics.some((t: string) => t.toLowerCase().includes(topic)) &&
        influencer.location.toLowerCase() === location.toLowerCase() &&
        influencer.engagementRate >= minEngagement,
    )

    if (platform) {
      filteredInfluencers = filteredInfluencers.filter(
        (influencer) => influencer.platforms[platform] && influencer.platforms[platform].engagement >= minEngagement,
      )
    }

    // Add match score based on topic relevance and engagement rate
    const results = filteredInfluencers.map((influencer) => {
      const topicRelevance = influencer.topics.some((t: string) => t === topic) ? 1 : 0.7
      const matchScore = (topicRelevance * 0.6 + (influencer.engagementRate / 0.1) * 0.4) * 100

      return {
        ...influencer,
        matchScore: Math.min(Math.round(matchScore), 100),
      }
    })

    // Sort by match score
    results.sort((a, b) => b.matchScore - a.matchScore)

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error in MCP search:", error)
    return NextResponse.json({ error: "Failed to process search" }, { status: 500 })
  }
}
