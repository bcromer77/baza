"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp } from "lucide-react"

interface SmartCampaignSuggestionsProps {
  onBookInfluencer: (influencer: any) => void
}

export default function SmartCampaignSuggestions({ onBookInfluencer }: SmartCampaignSuggestionsProps) {
  const handleBookNow = () => {
    // Find the communikay influencer from the data
    const communikay = {
      id: 1,
      handle: "@communikay",
      name: "Sophie Laurent",
      profilePicture: "/confident-gaze.png",
      location: "Arcachon",
      followers: 20000,
      engagementRate: 0.08,
      cost: 800,
    }

    onBookInfluencer(communikay)
  }

  return (
    <Card className="overflow-hidden border-purple-200">
      <div className="absolute right-0 top-0 h-16 w-16">
        <div className="absolute right-0 top-0 h-16 w-16 rotate-45 translate-x-4 -translate-y-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <Sparkles className="absolute right-3 top-3 h-5 w-5 text-white" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">AI-Powered Recommendation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4 border border-purple-100">
            <p className="text-sm text-gray-700">
              Based on your goal to increase hotel occupancy in Arcachon in October:
            </p>
            <p className="mt-2 font-medium text-purple-800">
              @communikay would be perfect for hosting a communication event to sell 30 rooms.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <div className="flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>95% match score</span>
              </div>
              <div className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>8% engagement rate</span>
              </div>
              <div className="flex items-center rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>4x ROI</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 border">
            <p className="text-sm font-medium text-gray-700">Why this recommendation?</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• Perfect audience match for communication events (80% audience interest)</li>
              <li>• High engagement on social platforms (8% vs. industry average of 3.5%)</li>
              <li>• Arcachon location aligns with your target market</li>
              <li>• Previous successful collaborations with similar hotels</li>
            </ul>
          </div>

          <Button
            onClick={handleBookNow}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Reach Out to @communikay
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
