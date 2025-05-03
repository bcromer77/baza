"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Globe,
  Zap,
  PieChart,
  Activity,
  Target,
  Layers,
  RefreshCw,
  Filter,
  ChevronDown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function TwilioSegmentSection() {
  const [timeframe, setTimeframe] = useState("30d")
  const [selectedJourney, setSelectedJourney] = useState("all")

  return (
    <Card className="overflow-hidden border border-[#E5E5E5] shadow-sm rounded-xl">
      <CardHeader className="apple-gradient-blue text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl font-light">
              <Zap className="h-5 w-5" />
              Audience Intelligence
            </CardTitle>
            <CardDescription className="text-white/90 font-light">
              Powered by Twilio Segment CDP and MongoDB Analytics
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 text-sm"
            onClick={() => (window.location.href = "/integrations/twilio-segment/settings")}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Last synced 5 min ago
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                  <Filter className="h-3 w-3" />
                  <span>{timeframe === "7d" ? "7 days" : timeframe === "30d" ? "30 days" : "90 days"}</span>
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

        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="bg-[#F0F0F0] dark:bg-[#222222] mb-6">
            <TabsTrigger value="insights" className="font-light">
              Audience Insights
            </TabsTrigger>
            <TabsTrigger value="journeys" className="font-light">
              Customer Journeys
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="font-light">
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="integrations" className="font-light">
              Data Sources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border border-[#E5E5E5] rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Audience Growth</h3>
                  <Badge className="bg-[hsl(var(--apple-green))] text-white">+18% MoM</Badge>
                </div>
                <div className="h-32 bg-[#F9F9F9] rounded-lg flex items-center justify-center mb-3">
                  <PieChart className="h-24 w-24 text-[hsl(var(--apple-blue))]" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Contacts:</span>
                    <span className="font-medium">9,280</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">New This Month:</span>
                    <span className="font-medium text-[hsl(var(--apple-green))]">+1,420</span>
                  </div>
                </div>
              </Card>

              <Card className="border border-[#E5E5E5] rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Engagement Score</h3>
                  <Badge className="bg-[hsl(var(--apple-blue))] text-white">High</Badge>
                </div>
                <div className="h-32 bg-[#F9F9F9] rounded-lg flex items-center justify-center mb-3">
                  <Activity className="h-24 w-24 text-[hsl(var(--apple-blue))]" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Email Open Rate:</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Click-through Rate:</span>
                    <span className="font-medium">42%</span>
                  </div>
                </div>
              </Card>

              <Card className="border border-[#E5E5E5] rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Conversion Rate</h3>
                  <Badge className="bg-[hsl(var(--apple-orange))] text-white">+5% MoM</Badge>
                </div>
                <div className="h-32 bg-[#F9F9F9] rounded-lg flex items-center justify-center mb-3">
                  <Target className="h-24 w-24 text-[hsl(var(--apple-orange))]" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Workshop Bookings:</span>
                    <span className="font-medium">22%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Repeat Clients:</span>
                    <span className="font-medium">35%</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="border border-[#E5E5E5] rounded-xl overflow-hidden">
              <div className="p-4 border-b border-[#E5E5E5] bg-[#F9F9F9]">
                <h3 className="font-medium">Audience Segments (Powered by MongoDB Atlas)</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[#E5E5E5] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">Corporate Executives</h4>
                      <Badge className="bg-[hsl(var(--apple-blue))] text-white text-xs">4,250</Badge>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Globe className="h-3 w-3 text-[hsl(var(--apple-blue))]" />
                        <span>Europe (78%), North America (22%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 text-[hsl(var(--apple-green))]" />
                        <span>85% open rate, 42% click-through</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Layers className="h-3 w-3 text-[hsl(var(--apple-orange))]" />
                        <span>Data sources: LinkedIn, Salesforce, Events</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 text-xs bg-[hsl(var(--apple-blue))] text-white hover:bg-[hsl(var(--apple-blue))]/90"
                      onClick={() => (window.location.href = "/segments/corporate-executives")}
                    >
                      View Details
                    </Button>
                  </div>

                  <div className="border border-[#E5E5E5] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">Women in Tech</h4>
                      <Badge className="bg-[hsl(var(--apple-pink))] text-white text-xs">3,180</Badge>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Globe className="h-3 w-3 text-[hsl(var(--apple-blue))]" />
                        <span>Europe (65%), Asia (25%), Other (10%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 text-[hsl(var(--apple-green))]" />
                        <span>92% open rate, 58% click-through</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Layers className="h-3 w-3 text-[hsl(var(--apple-orange))]" />
                        <span>Data sources: Events, Website, Newsletter</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 text-xs bg-[hsl(var(--apple-pink))] text-white hover:bg-[hsl(var(--apple-pink))]/90"
                      onClick={() => (window.location.href = "/segments/women-in-tech")}
                    >
                      View Details
                    </Button>
                  </div>

                  <div className="border border-[#E5E5E5] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">Hospitality Partners</h4>
                      <Badge className="bg-[hsl(var(--apple-purple))] text-white text-xs">1,850</Badge>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Globe className="h-3 w-3 text-[hsl(var(--apple-blue))]" />
                        <span>Europe (80%), Middle East (20%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 text-[hsl(var(--apple-green))]" />
                        <span>78% open rate, 35% click-through</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Layers className="h-3 w-3 text-[hsl(var(--apple-orange))]" />
                        <span>Data sources: Salesforce, Booking System, CRM</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 text-xs bg-[hsl(var(--apple-purple))] text-white hover:bg-[hsl(var(--apple-purple))]/90"
                      onClick={() => (window.location.href = "/segments/hospitality-partners")}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="rounded-xl border border-[#E5E5E5] p-4 bg-[#F9F9F9]">
              <h3 className="text-base font-medium mb-3">Twilio Segment + MongoDB Integration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your audience data is collected via Twilio Segment, processed in real-time, and stored in MongoDB Atlas
                for advanced analytics and personalization.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[hsl(var(--apple-blue))]" />
                  <span>Real-time audience segmentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-[hsl(var(--apple-green))]" />
                  <span>Multi-channel messaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[hsl(var(--apple-orange))]" />
                  <span>Predictive analytics</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="journeys" className="space-y-6 mt-2">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <Button
                variant={selectedJourney === "all" ? "default" : "outline"}
                onClick={() => setSelectedJourney("all")}
                className={`rounded-full ${selectedJourney === "all" ? "bg-[hsl(var(--apple-blue))]" : ""}`}
                size="sm"
              >
                All Journeys
              </Button>
              <Button
                variant={selectedJourney === "workshop" ? "default" : "outline"}
                onClick={() => setSelectedJourney("workshop")}
                className={`rounded-full ${selectedJourney === "workshop" ? "bg-[hsl(var(--apple-blue))]" : ""}`}
                size="sm"
              >
                Workshop Booking
              </Button>
              <Button
                variant={selectedJourney === "event" ? "default" : "outline"}
                onClick={() => setSelectedJourney("event")}
                className={`rounded-full ${selectedJourney === "event" ? "bg-[hsl(var(--apple-blue))]" : ""}`}
                size="sm"
              >
                Event Registration
              </Button>
              <Button
                variant={selectedJourney === "newsletter" ? "default" : "outline"}
                onClick={() => setSelectedJourney("newsletter")}
                className={`rounded-full ${selectedJourney === "newsletter" ? "bg-[hsl(var(--apple-blue))]" : ""}`}
                size="sm"
              >
                Newsletter Signup
              </Button>
            </div>

            <Card className="border border-[#E5E5E5] rounded-xl overflow-hidden">
              <div className="p-4 border-b border-[#E5E5E5] bg-[#F9F9F9]">
                <h3 className="font-medium">Customer Journey Analytics</h3>
              </div>
              <div className="p-4">
                <div className="h-64 bg-[#F9F9F9] rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Activity className="h-16 w-16 mx-auto text-[hsl(var(--apple-blue))]" />
                    <p className="mt-2 text-sm text-muted-foreground">Journey visualization would appear here</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="border border-[#E5E5E5] rounded-lg p-3">
                    <h4 className="text-sm font-medium mb-1">Awareness</h4>
                    <p className="text-2xl font-light text-[hsl(var(--apple-blue))]">8,450</p>
                    <p className="text-xs text-muted-foreground">Website visitors</p>
                  </div>
                  <div className="border border-[#E5E5E5] rounded-lg p-3">
                    <h4 className="text-sm font-medium mb-1">Consideration</h4>
                    <p className="text-2xl font-light text-[hsl(var(--apple-green))]">3,280</p>
                    <p className="text-xs text-muted-foreground">Content downloads</p>
                  </div>
                  <div className="border border-[#E5E5E5] rounded-lg p-3">
                    <h4 className="text-sm font-medium mb-1">Conversion</h4>
                    <p className="text-2xl font-light text-[hsl(var(--apple-orange))]">1,450</p>
                    <p className="text-xs text-muted-foreground">Workshop bookings</p>
                  </div>
                  <div className="border border-[#E5E5E5] rounded-lg p-3">
                    <h4 className="text-sm font-medium mb-1">Retention</h4>
                    <p className="text-2xl font-light text-[hsl(var(--apple-purple))]">68%</p>
                    <p className="text-xs text-muted-foreground">Repeat booking rate</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4 mt-2">
            <div className="rounded-xl border border-[#E5E5E5] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5]">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium">Campaign</th>
                    <th className="text-left p-3 text-sm font-medium">Audience</th>
                    <th className="text-left p-3 text-sm font-medium">Sent</th>
                    <th className="text-left p-3 text-sm font-medium">Open Rate</th>
                    <th className="text-left p-3 text-sm font-medium">Conversion</th>
                    <th className="text-left p-3 text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E5E5E5]">
                    <td className="p-3 text-sm">April Workshop Announcement</td>
                    <td className="p-3 text-sm">Corporate Executives</td>
                    <td className="p-3 text-sm">Apr 1, 2025</td>
                    <td className="p-3 text-sm">85%</td>
                    <td className="p-3 text-sm">24%</td>
                    <td className="p-3 text-sm">
                      <Badge className="bg-[hsl(var(--apple-green))] text-white">Active</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5]">
                    <td className="p-3 text-sm">Women in Leadership Promo</td>
                    <td className="p-3 text-sm">Women in Tech</td>
                    <td className="p-3 text-sm">Mar 25, 2025</td>
                    <td className="p-3 text-sm">92%</td>
                    <td className="p-3 text-sm">31%</td>
                    <td className="p-3 text-sm">
                      <Badge className="bg-[hsl(var(--apple-green))] text-white">Active</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5]">
                    <td className="p-3 text-sm">Hotel Partnership Offer</td>
                    <td className="p-3 text-sm">Hospitality Partners</td>
                    <td className="p-3 text-sm">Mar 15, 2025</td>
                    <td className="p-3 text-sm">78%</td>
                    <td className="p-3 text-sm">18%</td>
                    <td className="p-3 text-sm">
                      <Badge className="bg-[hsl(var(--apple-blue))] text-white">Completed</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-sm">Post-Workshop Follow-up</td>
                    <td className="p-3 text-sm">Workshop Attendees</td>
                    <td className="p-3 text-sm">Automated</td>
                    <td className="p-3 text-sm">94%</td>
                    <td className="p-3 text-sm">42%</td>
                    <td className="p-3 text-sm">
                      <Badge className="bg-[hsl(var(--apple-orange))] text-white">Automated</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-[hsl(var(--apple-blue))] text-white hover:bg-[hsl(var(--apple-blue))]/90 rounded-lg"
                onClick={() => (window.location.href = "/campaigns/create")}
              >
                Create New Campaign
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-[#E5E5E5] rounded-xl overflow-hidden">
                <div className="p-4 border-b border-[#E5E5E5] bg-[#F9F9F9] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[hsl(var(--apple-blue))]/10 flex items-center justify-center">
                      <Layers className="h-5 w-5 text-[hsl(var(--apple-blue))]" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium">MongoDB Atlas</h3>
                      <p className="text-xs text-muted-foreground">Data Storage & Analytics</p>
                    </div>
                  </div>
                  <Badge className="bg-[hsl(var(--apple-green))] text-white">Connected</Badge>
                </div>
                <div className="p-4">
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Database:</span>
                      <span>creator-torch-production</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Collections:</span>
                      <span>users, events, segments, interactions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Sync:</span>
                      <span>5 minutes ago</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => (window.location.href = "/integrations/mongodb/settings")}
                  >
                    Manage Connection
                  </Button>
                </div>
              </Card>

              <Card className="border border-[#E5E5E5] rounded-xl overflow-hidden">
                <div className="p-4 border-b border-[#E5E5E5] bg-[#F9F9F9] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[hsl(var(--apple-blue))]/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-[hsl(var(--apple-blue))]" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium">Twilio Segment</h3>
                      <p className="text-xs text-muted-foreground">Customer Data Platform</p>
                    </div>
                  </div>
                  <Badge className="bg-[hsl(var(--apple-green))] text-white">Connected</Badge>
                </div>
                <div className="p-4">
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Workspace:</span>
                      <span>kay-confidence-speaking</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Sources:</span>
                      <span>Website, Mobile App, CRM, Email</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Destinations:</span>
                      <span>MongoDB, Email, Analytics</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => (window.location.href = "/integrations/twilio-segment/settings")}
                  >
                    Manage Connection
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="border border-[#E5E5E5] rounded-xl overflow-hidden">
              <div className="p-4 border-b border-[#E5E5E5] bg-[#F9F9F9]">
                <h3 className="font-medium">Connected Data Sources</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[#E5E5E5] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-[hsl(var(--apple-blue))]" />
                      <h4 className="font-medium text-sm">Website</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Tracking visitor behavior and conversions</p>
                    <Badge className="bg-[hsl(var(--apple-green))] text-white text-xs">Active</Badge>
                  </div>

                  <div className="border border-[#E5E5E5] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-[hsl(var(--apple-pink))]" />
                      <h4 className="font-medium text-sm">Email Platform</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Tracking email engagement and responses</p>
                    <Badge className="bg-[hsl(var(--apple-green))] text-white text-xs">Active</Badge>
                  </div>

                  <div className="border border-[#E5E5E5] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-[hsl(var(--apple-orange))]" />
                      <h4 className="font-medium text-sm">CRM System</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Syncing customer relationship data</p>
                    <Badge className="bg-[hsl(var(--apple-green))] text-white text-xs">Active</Badge>
                  </div>
                </div>

                <Button
                  className="mt-4 bg-[hsl(var(--apple-blue))] text-white hover:bg-[hsl(var(--apple-blue))]/90 rounded-lg"
                  onClick={() => (window.location.href = "/integrations/add")}
                >
                  Add New Data Source
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
