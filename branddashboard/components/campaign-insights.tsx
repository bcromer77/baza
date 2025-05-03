import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CampaignInsights() {
  return (
    <Card className="border-blue-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Campaign Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
              <p className="text-sm text-gray-500">Total Impressions</p>
              <div className="mt-1 flex items-center">
                <span className="text-xl font-semibold text-blue-700">80,000</span>
                <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  20%
                </Badge>
              </div>
            </div>

            <div className="rounded-lg bg-purple-50 p-4 border border-purple-100">
              <p className="text-sm text-gray-500">Total Spend</p>
              <div className="mt-1 flex items-center">
                <span className="text-xl font-semibold text-purple-700">€3,000</span>
                <span className="ml-2 text-xs text-purple-600">(ROI: 4x)</span>
              </div>
            </div>

            <div className="rounded-lg bg-pink-50 p-4 border border-pink-100">
              <p className="text-sm text-gray-500">Top Influencer</p>
              <p className="mt-1 text-lg font-medium text-pink-700">@communikay</p>
            </div>

            <div className="rounded-lg bg-amber-50 p-4 border border-amber-100">
              <p className="text-sm text-gray-500">Top Platform</p>
              <p className="mt-1 text-lg font-medium text-amber-700">TikTok</p>
            </div>
          </div>

          <div className="rounded-lg bg-red-50 p-4 border border-red-100 flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-700">Anomaly Detected</p>
              <p className="text-sm text-red-600">@tokyoTrendsetter's engagement dropped 30%—check for issues.</p>
              <button className="mt-2 text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors">
                Investigate
              </button>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t">
            <p className="text-sm text-gray-500">Next campaign recommendation:</p>
            <p className="text-purple-700 mt-1 font-medium">
              Focus on Arcachon micro-influencers with 10k-20k followers
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
