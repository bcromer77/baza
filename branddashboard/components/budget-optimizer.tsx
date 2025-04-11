"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles } from "lucide-react"

export default function BudgetOptimizer() {
  const [totalBudget, setTotalBudget] = useState(2000)
  const [maxInfluencers, setMaxInfluencers] = useState(3)
  const [optimizeFor, setOptimizeFor] = useState("impressions")

  // Generate recommendation based on optimization target
  const getRecommendation = () => {
    switch (optimizeFor) {
      case "impressions":
        return {
          allocation: "€800 to @arcachonSpeaker, €600 to @sydneyGreenVibe, €600 to @tokyoTrendsetter",
          metric: "Total Impressions: 50,000",
        }
      case "engagement":
        return {
          allocation: "€700 to @sydneyGreenVibe, €650 to @arcachonSpeaker, €650 to @mumbaiGreenSoul",
          metric: "Average Engagement: 8%",
        }
      case "roi":
        return {
          allocation: "€750 to @arcachonSpeaker, €650 to @sydneyGreenVibe, €600 to @parisEcoChic",
          metric: "Expected ROI: 3.5x",
        }
      default:
        return {
          allocation: "€666 per influencer (3 influencers)",
          metric: "Balanced approach",
        }
    }
  }

  const recommendation = getRecommendation()

  return (
    <Card className="border-green-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          Budget Optimizer
          <Sparkles className="ml-2 h-4 w-4 text-green-500 animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Total Budget (€)</span>
              <span>{totalBudget}</span>
            </div>
            <Slider
              value={[totalBudget]}
              onValueChange={(value) => setTotalBudget(value[0])}
              min={500}
              max={10000}
              step={100}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Max Influencers</span>
              <span>{maxInfluencers}</span>
            </div>
            <Slider
              value={[maxInfluencers]}
              onValueChange={(value) => setMaxInfluencers(value[0])}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Optimize for:</label>
            <Select value={optimizeFor} onValueChange={setOptimizeFor}>
              <SelectTrigger className="w-full border-gray-300">
                <SelectValue placeholder="Select optimization target" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="impressions">Impressions</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="roi">ROI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="text-green-800 font-medium mb-2">
              Optimized for {optimizeFor.charAt(0).toUpperCase() + optimizeFor.slice(1)}:
            </h3>
            <p className="text-gray-700">{recommendation.allocation}</p>
            <p className="text-gray-700">{recommendation.metric}</p>
            <p className="mt-2 text-xs text-gray-500">
              *Optimization algorithm uses historical performance data and machine learning to maximize your selected
              metric.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
