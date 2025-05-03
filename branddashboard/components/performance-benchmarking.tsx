import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, BarChart3, Users, DollarSign } from "lucide-react"

export default function PerformanceBenchmarking() {
  return (
    <Card className="border-blue-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Performance Benchmarking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-blue-100 p-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800 mb-1">Your campaign is outperforming the industry</h3>
              <p className="text-gray-600">
                Your campaign's 6% engagement is{" "}
                <span className="text-blue-600 font-medium">2x the industry average</span> for hotel events.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center mb-2">
                <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-800">Engagement</h4>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-medium text-blue-700">6%</span>
                <span className="ml-2 text-sm text-green-600">+3% vs. avg</span>
              </div>
              <div className="mt-2 w-full bg-blue-100 h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">Industry avg: 3%</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-medium text-gray-800">Reach</h4>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-medium text-purple-700">80K</span>
                <span className="ml-2 text-sm text-green-600">+30% vs. avg</span>
              </div>
              <div className="mt-2 w-full bg-purple-100 h-2 rounded-full">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">Industry avg: 62K</p>
            </div>

            <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-pink-600 mr-2" />
                <h4 className="font-medium text-gray-800">ROI</h4>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-medium text-pink-700">4x</span>
                <span className="ml-2 text-sm text-green-600">+1.5x vs. avg</span>
              </div>
              <div className="mt-2 w-full bg-pink-100 h-2 rounded-full">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: "90%" }}></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">Industry avg: 2.5x</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-medium text-gray-800 mb-2">Competitive Analysis</h4>
            <p className="text-sm text-gray-700">
              Your hotel event campaigns are performing in the{" "}
              <span className="text-purple-700 font-medium">top 15%</span> of all similar campaigns in your region.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Recommendation: Increase TikTok budget by 20% to maximize ROI based on current performance.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
