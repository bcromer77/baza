"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  ArrowRight,
  Youtube,
  Facebook,
  Instagram,
  Video,
  Users,
  Clock,
  Lightbulb,
  Zap,
  ChevronDown,
  BarChart,
  LineChart,
  PieChart,
  Layers,
  Database,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for platform performance
const platformData = {
  youtube: {
    followers: 45200,
    engagement: 8.2,
    growth: 12.5,
    views: 1250000,
    avgWatchTime: "4:32",
    topPerforming: "Public Speaking Masterclass: 10 Tips for Confidence",
    contentGaps: "Interview preparation, Q&A sessions",
    bestTimeToPost: "Tuesdays and Thursdays, 6-8 PM",
    audienceDemo: "35-45 year old professionals",
    color: "#FF0000",
  },
  facebook: {
    followers: 38600,
    engagement: 4.8,
    growth: 5.2,
    views: 820000,
    avgWatchTime: "2:15",
    topPerforming: "How to Command a Room: Body Language Secrets",
    contentGaps: "Leadership communication, Crisis management",
    bestTimeToPost: "Weekdays, 12-2 PM",
    audienceDemo: "30-50 year old business professionals",
    color: "#1877F2",
  },
  instagram: {
    followers: 62400,
    engagement: 6.7,
    growth: 18.3,
    views: 1850000,
    avgWatchTime: "0:45",
    topPerforming: "5 Rhetorical Techniques Every Speaker Should Know",
    contentGaps: "Visual storytelling, Short-form tips",
    bestTimeToPost: "Weekdays, 5-7 PM, Weekends 11 AM-1 PM",
    audienceDemo: "25-40 year old professionals and creatives",
    color: "#C13584",
  },
  tiktok: {
    followers: 78500,
    engagement: 12.4,
    growth: 32.8,
    views: 3200000,
    avgWatchTime: "0:22",
    topPerforming: "3 Interview Prep Tips That Got Me a Job at Google",
    contentGaps: "Quick confidence boosters, Interview scenarios",
    bestTimeToPost: "Weekdays, 7-9 PM, Weekends 2-4 PM",
    audienceDemo: "22-35 year old professionals and job seekers",
    color: "#000000",
  },
}

// AI-driven content suggestions based on first-party data
const contentSuggestions = [
  {
    platform: "TikTok",
    title: "1-on-1 Interview Prep Series",
    description:
      "Create a series of 15-30 second videos showing common interview questions and quick response techniques.",
    reasoning:
      "Your interview content performs 43% better than other topics on TikTok, and your audience demographic shows 68% are actively job seeking.",
    dataPoints: [
      "78% completion rate on interview videos",
      "32% higher share rate",
      "Audience survey shows 'interview prep' as top request",
    ],
    icon: Video,
  },
  {
    platform: "YouTube",
    title: "Public Speaking Masterclass Series",
    description: "Develop a 6-part in-depth series on public speaking fundamentals with downloadable worksheets.",
    reasoning:
      "Your long-form educational content on YouTube has a 4.5x higher watch time than platform average, with 'public speaking' keywords driving 62% of organic traffic.",
    dataPoints: [
      "8.5 min avg watch time vs 2.2 min platform avg",
      "42% of subscribers came from public speaking videos",
      "High conversion to workshop bookings",
    ],
    icon: Youtube,
  },
  {
    platform: "Instagram",
    title: "Rhetorical Techniques Visual Series",
    description: "Create carousel posts explaining classical rhetorical techniques with modern examples and visuals.",
    reasoning:
      "Your rhetoric-focused content receives 3.2x more saves than other content types, and carousel posts outperform single images by 78% for your audience.",
    dataPoints: [
      "85% higher retention on rhetoric posts",
      "2.3x more shares to Stories",
      "High correlation with website visits",
    ],
    icon: Instagram,
  },
  {
    platform: "Facebook",
    title: "Executive Communication Workshop Previews",
    description: "Share 2-3 minute preview videos from your workshops targeting business professionals.",
    reasoning:
      "Facebook's older demographic aligns with your executive clients, and workshop previews have a 5.2x higher click-through rate to your booking page.",
    dataPoints: [
      "72% of workshop bookings from Facebook are director-level+",
      "3.8x higher conversion rate than other platforms",
      "High engagement from business groups",
    ],
    icon: Facebook,
  },
]

// First-party data insights
const firstPartyDataInsights = [
  {
    title: "Cross-Platform Audience Overlap",
    description:
      "28% of your audience follows you on multiple platforms, with the highest overlap between YouTube and LinkedIn (42%).",
    actionable: "Create platform-specific content but maintain consistent messaging for your multi-platform followers.",
    source: "MongoDB audience identity resolution",
  },
  {
    title: "Content Topic Performance",
    description:
      "Content about interview preparation has 3.2x higher engagement on TikTok, while public speaking content performs 2.8x better on YouTube.",
    actionable: "Tailor content topics to platform strengths rather than posting the same content everywhere.",
    source: "Twilio Segment content analytics",
  },
  {
    title: "Conversion Pathways",
    description:
      "Users who engage with your content across 3+ platforms are 5.2x more likely to book a workshop or speaking engagement.",
    actionable: "Create cross-platform journeys that guide followers to your highest-converting platform (YouTube).",
    source: "MongoDB + Stripe Connect conversion tracking",
  },
  {
    title: "Audience Sentiment Analysis",
    description:
      "Your audience responds most positively to content that includes personal stories (4.8/5 sentiment score) vs. purely instructional content (3.2/5).",
    actionable: "Incorporate more personal experiences into your educational content across all platforms.",
    source: "Twilio Segment sentiment analysis",
  },
]

export function SocialMediaAnalyticsSection() {
  const [timeframe, setTimeframe] = useState("30d")

  return (
    <Card className="overflow-hidden border-none shadow-lg rounded-xl">
      <CardHeader className="bg-[#1C1C1E] text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl font-light">
              <BarChart3 className="h-5 w-5 text-[#D0E1F9]" />
              Cross-Platform Analytics
            </CardTitle>
            <CardDescription className="text-[#D0E1F9]/80 font-light">
              Maximize your impact with first-party data insights
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-[#2C2C2E] text-[#D0E1F9] border-none">
              <Database className="h-3 w-3 mr-1" />
              Powered by MongoDB + Twilio Segment
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-[#D0E1F9] hover:bg-[#2C2C2E] text-sm">
                  {timeframe === "7d" ? "Last 7 days" : timeframe === "30d" ? "Last 30 days" : "Last 90 days"}
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTimeframe("7d")}>Last 7 days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe("30d")}>Last 30 days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe("90d")}>Last 90 days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-[#F8F9FA]">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-[#E4E6EB] dark:bg-[#2C2C2E] p-1 rounded-full">
            <TabsTrigger
              value="overview"
              className="font-light rounded-full data-[state=active]:bg-white data-[state=active]:text-[#1C1C1E] data-[state=active]:shadow-sm"
            >
              Platform Overview
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="font-light rounded-full data-[state=active]:bg-white data-[state=active]:text-[#1C1C1E] data-[state=active]:shadow-sm"
            >
              Content Strategy
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="font-light rounded-full data-[state=active]:bg-white data-[state=active]:text-[#1C1C1E] data-[state=active]:shadow-sm"
            >
              First-Party Data Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  platform: "YouTube",
                  icon: Youtube,
                  color: "#4A6FA5",
                  data: platformData.youtube,
                  accentColor: "#6789B8",
                },
                {
                  platform: "Facebook",
                  icon: Facebook,
                  color: "#5D5F71",
                  data: platformData.facebook,
                  accentColor: "#7B7D8F",
                },
                {
                  platform: "Instagram",
                  icon: Instagram,
                  color: "#9B6A6C",
                  data: platformData.instagram,
                  accentColor: "#B9898B",
                },
                {
                  platform: "TikTok",
                  icon: Video,
                  color: "#758E4F",
                  data: platformData.tiktok,
                  accentColor: "#93AC6D",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="border-none shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] bg-white"
                >
                  <div className="p-4" style={{ backgroundColor: item.color, color: "white" }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-5 w-5" />
                        <h3 className="font-light text-lg">{item.platform}</h3>
                      </div>
                      <Badge className="bg-white/20 text-white border-none">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {item.data.growth}%
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground font-light">Followers:</span>
                        <span className="font-medium">{item.data.followers.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground font-light">Engagement:</span>
                        <span className="font-medium">{item.data.engagement}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground font-light">Views:</span>
                        <span className="font-medium">{item.data.views.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-4 text-white rounded-full transition-all duration-300 hover:shadow-md"
                      style={{ backgroundColor: item.color }}
                      onClick={() => (window.location.href = `/analytics/${item.platform.toLowerCase()}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="border-none shadow-md overflow-hidden h-full transition-all duration-300 hover:shadow-lg bg-white">
                  <div className="p-4 border-b border-[#E4E6EB] bg-white flex justify-between items-center">
                    <h3 className="font-light text-lg text-[#1C1C1E]">Cross-Platform Performance</h3>
                    <Badge className="bg-[#4A6FA5] text-white border-none">Unified Analytics</Badge>
                  </div>
                  <div className="p-4 h-[250px] flex items-center justify-center bg-[#F8F9FA]">
                    <div className="text-center">
                      <BarChart className="h-32 w-32 mx-auto text-[#4A6FA5]" />
                      <p className="mt-2 text-sm text-muted-foreground font-light">
                        Performance visualization across platforms
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <Card className="border-none shadow-md overflow-hidden h-full transition-all duration-300 hover:shadow-lg bg-white">
                  <div className="p-4 border-b border-[#E4E6EB] bg-white">
                    <h3 className="font-light text-lg text-[#1C1C1E]">Audience Demographics</h3>
                  </div>
                  <div className="p-4 h-[250px] flex items-center justify-center bg-[#F8F9FA]">
                    <div className="text-center">
                      <PieChart className="h-32 w-32 mx-auto text-[#5D5F71]" />
                      <p className="mt-2 text-sm text-muted-foreground font-light">
                        Audience breakdown across platforms
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="border-none shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
              <div className="p-4 border-b border-[#E4E6EB] bg-white">
                <h3 className="font-light text-lg flex items-center gap-2 text-[#1C1C1E]">
                  <Lightbulb className="h-5 w-5 text-[#9B6A6C]" />
                  AI-Powered Content Recommendations
                </h3>
                <p className="text-sm text-muted-foreground mt-1 font-light">
                  Based on your first-party data and cross-platform performance
                </p>
              </div>
              <div className="p-4 bg-[#F8F9FA]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { platform: "TikTok", color: "#758E4F", icon: Video },
                    { platform: "YouTube", color: "#4A6FA5", icon: Youtube },
                    { platform: "Instagram", color: "#9B6A6C", icon: Instagram },
                    { platform: "Facebook", color: "#5D5F71", icon: Facebook },
                  ].map((platformInfo, index) => {
                    const suggestion = contentSuggestions.find((s) => s.platform === platformInfo.platform)
                    if (!suggestion) return null

                    return (
                      <Card
                        key={index}
                        className="border-none shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] bg-white"
                      >
                        <div className="p-3" style={{ backgroundColor: platformInfo.color, color: "white" }}>
                          <div className="flex items-center gap-2">
                            <platformInfo.icon className="h-5 w-5" />
                            <div>
                              <h4 className="font-light">{suggestion.title}</h4>
                              <p className="text-xs text-white/80">For {suggestion.platform}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <p className="text-sm mb-3 font-light">{suggestion.description}</p>
                          <div className="bg-[#F8F9FA] p-3 rounded-lg mb-3">
                            <p className="text-xs font-medium mb-1">Why this works:</p>
                            <p className="text-xs text-muted-foreground font-light">{suggestion.reasoning}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-medium">Based on your data:</p>
                            {suggestion.dataPoints.map((point, i) => (
                              <div key={i} className="flex items-start gap-1 text-xs">
                                <ArrowRight className="h-3 w-3 mt-0.5 text-[#4A6FA5]" />
                                <span className="font-light">{point}</span>
                              </div>
                            ))}
                          </div>
                          <Button
                            size="sm"
                            className="w-full mt-4 text-white rounded-full transition-all duration-300 hover:shadow-md"
                            style={{ backgroundColor: platformInfo.color }}
                            onClick={() =>
                              (window.location.href = `/content-planner/${suggestion.platform.toLowerCase()}`)
                            }
                          >
                            Create Content
                          </Button>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-md overflow-hidden bg-white">
              <div className="p-4 border-b border-[#E4E6EB] bg-white">
                <h3 className="font-light text-lg flex items-center gap-2 text-[#1C1C1E]">
                  <BarChart3 className="h-5 w-5 text-[#5D5F71]" />
                  Content Performance by Topic
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Interview Preparation</span>
                      <span className="text-sm font-medium">
                        <Badge className="bg-[#758E4F] text-white border-none">High Performing</Badge>
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>TikTok</span>
                        <span style={{ color: "#758E4F" }}>+320% vs. avg</span>
                      </div>
                      <div className="w-full bg-[#E4E6EB] rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: "95%", backgroundColor: "#758E4F" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>YouTube</span>
                        <span style={{ color: "#4A6FA5" }}>+85% vs. avg</span>
                      </div>
                      <div className="w-full bg-[#E4E6EB] rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: "65%", backgroundColor: "#4A6FA5" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Instagram</span>
                        <span style={{ color: "#9B6A6C" }}>+42% vs. avg</span>
                      </div>
                      <div className="w-full bg-[#E4E6EB] rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: "45%", backgroundColor: "#9B6A6C" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Public Speaking</span>
                      <span className="text-sm font-medium">
                        <Badge className="bg-[#4A6FA5] text-white border-none">High Performing</Badge>
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>YouTube</span>
                        <span style={{ color: "#4A6FA5" }}>+280% vs. avg</span>
                      </div>
                      <div className="w-full bg-[#E4E6EB] rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: "90%", backgroundColor: "#4A6FA5" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Facebook</span>
                        <span style={{ color: "#5D5F71" }}>+120% vs. avg</span>
                      </div>
                      <div className="w-full bg-[#E4E6EB] rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: "75%", backgroundColor: "#5D5F71" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>TikTok</span>
                        <span style={{ color: "#758E4F" }}>+35% vs. avg</span>
                      </div>
                      <div className="w-full bg-[#E4E6EB] rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: "40%", backgroundColor: "#758E4F" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="border-none shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
              <div className="p-4 border-b border-[#E4E6EB] bg-white">
                <h3 className="font-light text-lg flex items-center gap-2 text-[#1C1C1E]">
                  <Layers className="h-5 w-5 text-[#4A6FA5]" />
                  First-Party Data Insights
                </h3>
                <p className="text-sm text-muted-foreground mt-1 font-light">
                  Actionable insights derived from your owned audience data
                </p>
              </div>
              <div className="p-4 bg-[#F8F9FA]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {firstPartyDataInsights.map((insight, index) => {
                    // Assign different colors to each insight
                    const colors = ["#4A6FA5", "#5D5F71", "#9B6A6C", "#758E4F"]
                    const color = colors[index % colors.length]

                    return (
                      <Card
                        key={index}
                        className="border-none shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] bg-white"
                      >
                        <div className="p-3" style={{ backgroundColor: color, color: "white" }}>
                          <h4 className="font-light">{insight.title}</h4>
                          <p className="text-xs text-white/80">Source: {insight.source}</p>
                        </div>
                        <div className="p-4 bg-white">
                          <p className="text-sm mb-3 font-light">{insight.description}</p>
                          <div className="bg-[#F8F9FA] p-3 rounded-lg">
                            <p className="text-xs font-medium mb-1 flex items-center gap-1">
                              <Zap className="h-3 w-3" style={{ color }} />
                              Actionable Insight:
                            </p>
                            <p className="text-xs font-light">{insight.actionable}</p>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-md overflow-hidden bg-white">
              <div className="p-4 border-b border-[#E4E6EB] bg-white">
                <h3 className="font-light text-lg text-[#1C1C1E]">Audience Journey Visualization</h3>
              </div>
              <div className="p-4 h-[250px] flex items-center justify-center bg-[#F8F9FA]">
                <div className="text-center">
                  <LineChart className="h-32 w-32 mx-auto text-[#9B6A6C]" />
                  <p className="mt-2 text-sm text-muted-foreground font-light">
                    Cross-platform audience journey visualization
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 rounded-xl border-none shadow-md p-5 bg-[#1C1C1E] text-white">
          <h3 className="text-base font-light mb-3 flex items-center gap-2">
            <Database className="h-4 w-4 text-[#D0E1F9] mr-1" />
            Maximizing First-Party Data
          </h3>
          <p className="text-sm text-[#D0E1F9]/80 mb-4 font-light">
            Your first-party data is collected across platforms, unified through Twilio Segment, and stored in MongoDB
            for advanced analytics and personalization.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 bg-[#2C2C2E] p-3 rounded-lg">
              <Users className="h-4 w-4 text-[#D0E1F9]" />
              <span className="font-light">Identity resolution across platforms</span>
            </div>
            <div className="flex items-center gap-2 bg-[#2C2C2E] p-3 rounded-lg">
              <Clock className="h-4 w-4 text-[#D0E1F9]" />
              <span className="font-light">Real-time content performance tracking</span>
            </div>
            <div className="flex items-center gap-2 bg-[#2C2C2E] p-3 rounded-lg">
              <Lightbulb className="h-4 w-4 text-[#D0E1F9]" />
              <span className="font-light">AI-powered content optimization</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
