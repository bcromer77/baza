"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Globe, Users, Clock, Brain, TrendingUp } from "lucide-react"
import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function AudienceInsightsSection() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Portugal", "France", "Spain", "Other"],
            datasets: [
              {
                label: "Audience Geography",
                data: [60, 20, 10, 10],
                backgroundColor: [
                  "hsl(var(--accent-pink))",
                  "hsl(var(--accent-blue))",
                  "hsl(var(--accent-yellow))",
                  "hsl(var(--accent-green))",
                ],
                borderColor: [
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 1)",
                ],
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "right",
                labels: {
                  font: {
                    family: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    weight: "300",
                  },
                  padding: 20,
                },
              },
              title: {
                display: true,
                text: "Audience Geography",
                color: "#666666",
                font: {
                  family: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                  weight: "300",
                  size: 14,
                },
                padding: {
                  top: 10,
                  bottom: 20,
                },
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <CardHeader className="bg-black text-white p-6 border-b-4 border-[hsl(var(--accent-blue))]">
        <CardTitle className="flex items-center gap-2 text-2xl font-light">
          <Users className="h-5 w-5 text-[hsl(var(--accent-blue))]" />
          Audience Insights
        </CardTitle>
        <CardDescription className="text-gray-400 font-light">
          Understanding your audience across platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6 bg-[#F0F0F0] dark:bg-[#222222]">
            <TabsTrigger value="overview" className="font-light">
              Overview
            </TabsTrigger>
            <TabsTrigger value="demographics" className="font-light">
              Demographics
            </TabsTrigger>
            <TabsTrigger value="behavior" className="font-light">
              Behavior
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="font-light">
              Sentiment
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 mt-0.5 text-[hsl(var(--accent-blue))]" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-sm text-muted-foreground">Portugal: 60%, France: 20%, Spain: 10%</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 mt-0.5 text-[hsl(var(--accent-pink))]" />
                  <div>
                    <h4 className="font-medium">Intent</h4>
                    <p className="text-sm text-muted-foreground">Health: 45%, Food: 30%, Travel: 25%</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 mt-0.5 text-[hsl(var(--accent-yellow))]" />
                  <div>
                    <h4 className="font-medium">Behavior</h4>
                    <p className="text-sm text-muted-foreground">Engaged: 70%, Passive: 30%</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-0.5 text-[hsl(var(--accent-green))]" />
                  <div>
                    <h4 className="font-medium">Peak Engagement</h4>
                    <p className="text-sm text-muted-foreground">18:00-20:00 (Local Time)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 mt-0.5 text-[hsl(var(--accent-pink))]" />
                  <div>
                    <h4 className="font-medium">Sentiment Analysis</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge className="bg-[hsl(var(--accent-pink))] text-white hover:bg-[hsl(var(--accent-pink))]/90 font-light">
                        Ozempic: Positive (0.8)
                      </Badge>
                      <Badge className="bg-[hsl(var(--accent-blue))] text-white hover:bg-[hsl(var(--accent-blue))]/90 font-light">
                        Travel: Positive (0.7)
                      </Badge>
                      <Badge className="bg-[hsl(var(--accent-yellow))] text-white hover:bg-[hsl(var(--accent-yellow))]/90 font-light">
                        Food: Neutral (0.5)
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <canvas ref={chartRef} height="220"></canvas>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="demographics">
            <p className="text-muted-foreground">Detailed demographic information will appear here.</p>
          </TabsContent>
          <TabsContent value="behavior">
            <p className="text-muted-foreground">Detailed behavior information will appear here.</p>
          </TabsContent>
          <TabsContent value="sentiment">
            <p className="text-muted-foreground">Detailed sentiment analysis will appear here.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
