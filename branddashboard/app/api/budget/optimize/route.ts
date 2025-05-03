import { NextResponse } from "next/server"
import { influencers } from "@/lib/data"

export async function POST(request: Request) {
  try {
    const { totalBudget, maxInfluencers, optimizeFor } = await request.json()

    // Simple optimization algorithm
    // In a real implementation, this would use more sophisticated methods
    const sortedInfluencers = [...influencers].sort((a, b) => {
      if (optimizeFor === "impressions") {
        return b.predictedPerformance.impressions - a.predictedPerformance.impressions
      } else if (optimizeFor === "engagement") {
        return b.engagementRate - a.engagementRate
      } else if (optimizeFor === "roi") {
        return b.predictedPerformance.roi - a.predictedPerformance.roi
      }
      return 0
    })

    // Select top influencers based on optimization criteria
    const selectedInfluencers = sortedInfluencers.slice(0, maxInfluencers)

    // Allocate budget proportionally based on performance
    const totalPerformance = selectedInfluencers.reduce((sum, inf) => {
      if (optimizeFor === "impressions") {
        return sum + inf.predictedPerformance.impressions
      } else if (optimizeFor === "engagement") {
        return sum + inf.engagementRate
      } else if (optimizeFor === "roi") {
        return sum + inf.predictedPerformance.roi
      }
      return sum + 1 // Default equal allocation
    }, 0)

    const allocation = selectedInfluencers.map((inf) => {
      let performanceValue
      if (optimizeFor === "impressions") {
        performanceValue = inf.predictedPerformance.impressions
      } else if (optimizeFor === "engagement") {
        performanceValue = inf.engagementRate
      } else if (optimizeFor === "roi") {
        performanceValue = inf.predictedPerformance.roi
      } else {
        performanceValue = 1
      }

      const share = performanceValue / totalPerformance
      const budget = Math.round(totalBudget * share)

      return {
        influencer: inf.handle,
        budget,
        expectedPerformance: {
          impressions: inf.predictedPerformance.impressions,
          engagement: inf.engagementRate,
          roi: inf.predictedPerformance.roi,
        },
      }
    })

    // Calculate expected total performance
    const expectedPerformance = {
      impressions: allocation.reduce((sum, item) => sum + item.expectedPerformance.impressions, 0),
      engagement: allocation.reduce((sum, item) => sum + item.expectedPerformance.engagement, 0) / allocation.length,
      roi: allocation.reduce((sum, item) => sum + item.expectedPerformance.roi, 0) / allocation.length,
    }

    return NextResponse.json({
      allocation,
      expectedPerformance,
      optimizedFor: optimizeFor,
    })
  } catch (error) {
    console.error("Error in budget optimization:", error)
    return NextResponse.json({ error: "Failed to optimize budget" }, { status: 500 })
  }
}
