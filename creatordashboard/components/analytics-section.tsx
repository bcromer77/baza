"use client"

import { Calendar } from "@/components/ui/calendar"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, DollarSign, Users } from "lucide-react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function AnalyticsSection() {
  const engagementChartRef = useRef<HTMLCanvasElement>(null)
  const revenueChartRef = useRef<HTMLCanvasElement>(null)
  const engagementChartInstance = useRef<Chart | null>(null)
  const revenueChartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (engagementChartRef.current) {
      // Destroy existing chart
      if (engagementChartInstance.current) {
        engagementChartInstance.current.destroy()
      }

      const ctx = engagementChartRef.current.getContext("2d")
      if (ctx) {
        engagementChartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Overall Engagement",
                data: [20, 25, 30, 35, 40, 45],
                borderColor: "rgba(255, 0, 102, 0.8)",
                backgroundColor: "rgba(255, 0, 102, 0.1)",
                fill: true,
                tension: 0.4,
              },
              {
                label: "French Audience",
                data: [15, 18, 20, 25, 35, 45],
                borderColor: "rgba(0, 204, 255, 0.8)",
                backgroundColor: "rgba(0, 204, 255, 0.1)",
                fill: true,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Engagement (%)",
                  font: {
                    family: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    weight: "300",
                  },
                },
              },
            },
            plugins: {
              tooltip: {
                mode: "index",
                intersect: false,
              },
              legend: {
                position: "top",
                labels: {
                  font: {
                    family: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    weight: "300",
                  },
                },
              },
            },
          },
        })
      }
    }

    if (revenueChartRef.current) {
      // Destroy existing chart
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy()
      }

      const ctx = revenueChartRef.current.getContext("2d")
      if (ctx) {
        revenueChartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Revenue (€)",
                data: [800, 1200, 1000, 1500, 1800, 2200],
                backgroundColor: "rgba(255, 204, 0, 0.7)",
                borderColor: "rgba(255, 204, 0, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Revenue (€)",
                  font: {
                    family: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    weight: "300",
                  },
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    family: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    weight: "300",
                  },
                },
              },
            },
          },
        })
      }
    }

    return () => {
      if (engagementChartInstance.current) {
        engagementChartInstance.current.destroy()
      }
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <Card className="overflow-hidden border-none shadow-lg polaroid-card">
      <CardHeader className="bg-[#FF0066] text-white p-6">
        <CardTitle className="flex items-center gap-2 text-2xl font-light">
          <BarChart3 className="h-5 w-5" />
          Analytics Insights
        </CardTitle>
        <CardDescription className="text-white/80 font-light">
          Data-driven insights to grow your audience and revenue
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <Tabs defaultValue="engagement">
          <TabsList className="mb-6 bg-[#F0F0F0] dark:bg-[#222222]">
            <TabsTrigger value="engagement" className="font-light">
              Engagement
            </TabsTrigger>
            <TabsTrigger value="revenue" className="font-light">
              Revenue
            </TabsTrigger>
            <TabsTrigger value="audience" className="font-light">
              Audience Growth
            </TabsTrigger>
          </TabsList>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border border-[#EEEEEE] dark:border-[#222222] polaroid-card-item">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-muted-foreground">Overall Engagement</p>
                      <p className="text-3xl font-light">45%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-[#FF0066]" />
                  </div>
                  <p className="text-xs text-[#FF0066] mt-2 font-light">↑ 15% from last month</p>
                </CardContent>
              </Card>

              <Card className="border border-[#EEEEEE] dark:border-[#222222] polaroid-card-item">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-muted-foreground">French Audience</p>
                      <p className="text-3xl font-light">45%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-[#00CCFF]" />
                  </div>
                  <p className="text-xs text-[#00CCFF] mt-2 font-light">↑ 30% after translated content</p>
                </CardContent>
              </Card>

              <Card className="border border-[#EEEEEE] dark:border-[#222222] polaroid-card-item">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-muted-foreground">Content Interactions</p>
                      <p className="text-3xl font-light">12,450</p>
                    </div>
                    <Users className="h-8 w-8 text-[#FFCC00]" />
                  </div>
                  <p className="text-xs text-[#FFCC00] mt-2 font-light">↑ 22% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium mb-4">Engagement Trends</h3>
              <canvas ref={engagementChartRef} height="250"></canvas>
            </div>

            <div className="rounded-none border border-[#EEEEEE] dark:border-[#222222] p-6 mt-6 bg-[#F8F8F8] dark:bg-[#1A1A1A]">
              <h3 className="text-sm font-medium mb-2">Insight:</h3>
              <p className="text-sm text-muted-foreground font-light">
                Your French audience engagement spiked 30% after implementing the translated fan challenge. Consider
                creating more multilingual content to further boost engagement.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border border-[#EEEEEE] dark:border-[#222222] polaroid-card-item">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-muted-foreground">Monthly Revenue</p>
                      <p className="text-3xl font-light">€2,200</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-[#FFCC00]" />
                  </div>
                  <p className="text-xs text-[#FFCC00] mt-2 font-light">↑ 20% from last month</p>
                </CardContent>
              </Card>

              <Card className="border border-[#EEEEEE] dark:border-[#222222] polaroid-card-item">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-muted-foreground">Avg. Per Event</p>
                      <p className="text-3xl font-light">€550</p>
                    </div>
                    <Calendar className="h-8 w-8 text-[#66CC99]" />
                  </div>
                  <p className="text-xs text-[#66CC99] mt-2 font-light">↑ 10% from last month</p>
                </CardContent>
              </Card>

              <Card className="border border-[#EEEEEE] dark:border-[#222222] polaroid-card-item">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-light text-muted-foreground">YTD Revenue</p>
                      <p className="text-3xl font-light">€8,500</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-[#FF0066]" />
                  </div>
                  <p className="text-xs text-[#FF0066] mt-2 font-light">On track for €20K this year</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium mb-4">Revenue Trends</h3>
              <canvas ref={revenueChartRef} height="250"></canvas>
            </div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-4">
            <p className="text-muted-foreground font-light">Audience growth analytics will appear here.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
