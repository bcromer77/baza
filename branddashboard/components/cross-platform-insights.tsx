"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { AlertTriangle } from "lucide-react"

interface CrossPlatformInsightsProps {
  influencers: any[]
}

export default function CrossPlatformInsights({ influencers }: CrossPlatformInsightsProps) {
  const [influencer1, setInfluencer1] = useState("")
  const [influencer2, setInfluencer2] = useState("")
  const [showComparison, setShowComparison] = useState(false)

  const platformData = [
    { name: "YouTube", views: 10000, engagement: 5 },
    { name: "TikTok", views: 15000, engagement: 7 },
    { name: "Instagram", views: 8000, engagement: 6 },
  ]

  const forecastData = [
    { day: "Day 1", engagement: 6.0 },
    { day: "Day 5", engagement: 6.2 },
    { day: "Day 10", engagement: 6.5 },
    { day: "Day 15", engagement: 7.0 },
    { day: "Day 20", engagement: 7.5 },
    { day: "Day 25", engagement: 8.0 },
    { day: "Day 30", engagement: 7.8 },
  ]

  const compareInfluencers = () => {
    if (influencer1 && influencer2 && influencer1 !== influencer2) {
      setShowComparison(true)
    }
  }

  const getInfluencerById = (id: string) => {
    return influencers.find((inf) => inf.handle === `@${id}`)
  }

  const inf1 = getInfluencerById(influencer1)
  const inf2 = getInfluencerById(influencer2)

  return (
    <Card className="border-purple-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Cross-Platform Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-gray-100">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="forecast"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
            >
              Forecast
            </TabsTrigger>
            <TabsTrigger
              value="compare"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
            >
              Compare
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-2 font-light">
                <p className="text-gray-700">📺 YouTube: 10,000 views, 5% engagement</p>
                <p className="text-gray-700">🎵 TikTok: 15,000 views, 7% engagement</p>
                <p className="text-gray-700">📸 Instagram: 8,000 likes, 6% engagement</p>
                <p className="text-gray-700">🌍 Top Regions: Arcachon (50%), Tokyo (30%), Sydney (15%)</p>

                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-700 font-medium">Anomaly Detected</p>
                    <p className="text-sm text-amber-600">
                      @tokyoTrendsetter's engagement dropped 30%—check for issues.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#fff", border: "1px solid #ddd" }}
                      labelStyle={{ color: "#333" }}
                    />
                    <Legend />
                    <Bar dataKey="views" name="Views/Likes" fill="#8884d8" />
                    <Bar dataKey="engagement" name="Engagement (%)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="mt-0">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Engagement Forecast</h3>
                <p className="text-sm text-gray-600 mb-4">
                  AI-powered prediction of your campaign's engagement over the next 30 days
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="day" stroke="#666" />
                      <YAxis stroke="#666" domain={[5, 9]} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#fff", border: "1px solid #ddd" }}
                        labelStyle={{ color: "#333" }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="engagement"
                        name="Engagement (%)"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 text-gray-700">
                  Engagement expected to peak at <span className="text-purple-700 font-medium">8%</span> in 25 days.
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Recommendation: Plan content refresh around day 25 to maintain peak engagement.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compare" className="mt-0">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={influencer1} onValueChange={setInfluencer1}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select Influencer 1" />
                  </SelectTrigger>
                  <SelectContent>
                    {influencers.map((inf) => (
                      <SelectItem key={inf.id} value={inf.handle.substring(1)}>
                        {inf.handle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={influencer2} onValueChange={setInfluencer2}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select Influencer 2" />
                  </SelectTrigger>
                  <SelectContent>
                    {influencers.map((inf) => (
                      <SelectItem key={inf.id} value={inf.handle.substring(1)}>
                        {inf.handle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={compareInfluencers}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Compare
                </Button>
              </div>

              {showComparison && inf1 && inf2 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Comparing {inf1.handle} vs {inf2.handle}:
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      YouTube Engagement: {(inf1.platforms.YouTube.engagement * 100).toFixed(1)}% vs{" "}
                      {(inf2.platforms.YouTube.engagement * 100).toFixed(1)}%
                    </p>
                    <p>
                      TikTok Engagement: {(inf1.platforms.TikTok.engagement * 100).toFixed(1)}% vs{" "}
                      {(inf2.platforms.TikTok.engagement * 100).toFixed(1)}%
                    </p>
                    <p>
                      Instagram Engagement: {(inf1.platforms.Instagram.engagement * 100).toFixed(1)}% vs{" "}
                      {(inf2.platforms.Instagram.engagement * 100).toFixed(1)}%
                    </p>
                  </div>

                  <div className="mt-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          {
                            name: "YouTube",
                            [inf1.handle]: inf1.platforms.YouTube.engagement * 100,
                            [inf2.handle]: inf2.platforms.YouTube.engagement * 100,
                          },
                          {
                            name: "TikTok",
                            [inf1.handle]: inf1.platforms.TikTok.engagement * 100,
                            [inf2.handle]: inf2.platforms.TikTok.engagement * 100,
                          },
                          {
                            name: "Instagram",
                            [inf1.handle]: inf1.platforms.Instagram.engagement * 100,
                            [inf2.handle]: inf2.platforms.Instagram.engagement * 100,
                          },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#fff", border: "1px solid #ddd" }}
                          labelStyle={{ color: "#333" }}
                        />
                        <Legend />
                        <Bar dataKey={inf1.handle} fill="#8884d8" />
                        <Bar dataKey={inf2.handle} fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
