"use client"

import { useState } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Home,
  Search,
  BarChart2,
  Users,
  Settings,
  LogOut,
  Menu,
  PieChart,
  TrendingUp,
  DollarSign,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import InfluencerSearch from "@/components/influencer-search"
import BudgetOptimizer from "@/components/budget-optimizer"
import CampaignInsights from "@/components/campaign-insights"
import CrossPlatformInsights from "@/components/cross-platform-insights"
import SmartCampaignSuggestions from "@/components/smart-campaign-suggestions"
import ContentApproval from "@/components/content-approval"
import PerformanceBenchmarking from "@/components/performance-benchmarking"
import CaseStudy from "@/components/case-study"
import BookingModal from "@/components/booking-modal"
import { influencers } from "@/lib/data"

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedInfluencer, setSelectedInfluencer] = useState<any>(null)
  const [bookingCount, setBookingCount] = useState(2)

  const handleBookInfluencer = (influencer: any) => {
    setSelectedInfluencer(influencer)
    setIsBookingModalOpen(true)
  }

  const handleBookingComplete = () => {
    setIsBookingModalOpen(false)
    setBookingCount((prev) => prev + 1)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-gradient-to-r from-purple-600 to-pink-500 p-1">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">CreatorTorch</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
                  <Home className="h-5 w-5" />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === "discover"} onClick={() => setActiveTab("discover")}>
                  <Search className="h-5 w-5" />
                  <span>Discover</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === "campaigns"} onClick={() => setActiveTab("campaigns")}>
                  <BarChart2 className="h-5 w-5" />
                  <span>Campaigns</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === "analytics"} onClick={() => setActiveTab("analytics")}>
                  <PieChart className="h-5 w-5" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === "influencers"} onClick={() => setActiveTab("influencers")}>
                  <Users className="h-5 w-5" />
                  <span>Influencers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeTab === "settings"} onClick={() => setActiveTab("settings")}>
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/vibrant-street-market.png" alt="User" />
                  <AvatarFallback>CT</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Arcachon Hotel</p>
                  <p className="text-xs text-muted-foreground">Premium Plan</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="border-b bg-background">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-semibold">Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-purple-500 text-white">
                    3
                  </Badge>
                </Button>
                <ModeToggle />
              </div>
            </div>
          </header>

          <ScrollArea className="flex-1 p-6">
            <Tabs defaultValue={activeTab}>
              <TabsContent value="overview" className={activeTab === "overview" ? "block" : "hidden"}>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium text-purple-900">Brand Score</CardTitle>
                        <CardDescription className="text-purple-700">Your influence rating</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold text-purple-700">
                            92<span className="text-lg font-normal text-purple-500">/100</span>
                          </div>
                          <div className="rounded-full bg-purple-200 p-2">
                            <TrendingUp className="h-5 w-5 text-purple-700" />
                          </div>
                        </div>
                        <Progress value={92} className="h-2 mt-4 bg-purple-200" indicatorClassName="bg-purple-500" />
                        <p className="mt-2 text-sm text-purple-700">4 successful campaigns this month</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium text-blue-900">Bookings</CardTitle>
                        <CardDescription className="text-blue-700">Influencer collaborations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold text-blue-700">
                            {bookingCount}
                            <span className="text-lg font-normal text-blue-500">/3</span>
                          </div>
                          <div className="rounded-full bg-blue-200 p-2">
                            <Users className="h-5 w-5 text-blue-700" />
                          </div>
                        </div>
                        <Progress
                          value={(bookingCount / 3) * 100}
                          className="h-2 mt-4 bg-blue-200"
                          indicatorClassName="bg-blue-500"
                        />
                        <p className="mt-2 text-sm text-blue-700">Book 3 influencers to unlock 10% discount</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium text-pink-900">Campaign ROI</CardTitle>
                        <CardDescription className="text-pink-700">Return on investment</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold text-pink-700">4x</div>
                          <div className="rounded-full bg-pink-200 p-2">
                            <DollarSign className="h-5 w-5 text-pink-700" />
                          </div>
                        </div>
                        <Progress value={80} className="h-2 mt-4 bg-pink-200" indicatorClassName="bg-pink-500" />
                        <p className="mt-2 text-sm text-pink-700">80% above industry average</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <SmartCampaignSuggestions onBookInfluencer={handleBookInfluencer} />
                      <CampaignInsights />
                    </div>
                    <div className="space-y-6">
                      <ContentApproval />
                      <BudgetOptimizer />
                    </div>
                  </div>

                  <PerformanceBenchmarking />
                  <CrossPlatformInsights influencers={influencers} />
                  <CaseStudy />
                </div>
              </TabsContent>

              <TabsContent value="discover" className={activeTab === "discover" ? "block" : "hidden"}>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Discover Micro-Influencers</CardTitle>
                      <CardDescription>Find the perfect influencers for your campaigns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <InfluencerSearch influencers={influencers} onBookInfluencer={handleBookInfluencer} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="campaigns" className={activeTab === "campaigns" ? "block" : "hidden"}>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Campaigns</CardTitle>
                      <CardDescription>Manage your ongoing campaigns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg border p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Arcachon October Event</h3>
                            <p className="text-sm text-muted-foreground">With @communikay</p>
                          </div>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                        <Separator className="my-3" />
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Budget</p>
                            <p className="font-medium">€800</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Impressions</p>
                            <p className="font-medium">20,000</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Engagement</p>
                            <p className="font-medium">8%</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Tokyo Fashion Week</h3>
                            <p className="text-sm text-muted-foreground">With @tokyoTrendsetter</p>
                          </div>
                          <Badge className="bg-amber-500">Pending</Badge>
                        </div>
                        <Separator className="my-3" />
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Budget</p>
                            <p className="font-medium">€400</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Impressions</p>
                            <p className="font-medium">15,000</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Engagement</p>
                            <p className="font-medium">6%</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className={activeTab === "analytics" ? "block" : "hidden"}>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Analytics Dashboard</CardTitle>
                      <CardDescription>Comprehensive insights into your campaigns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CrossPlatformInsights influencers={influencers} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="influencers" className={activeTab === "influencers" ? "block" : "hidden"}>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Influencer Network</CardTitle>
                      <CardDescription>Manage your influencer relationships</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {influencers.slice(0, 3).map((influencer) => (
                          <div key={influencer.id} className="flex items-center gap-4 p-4 rounded-lg border">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={influencer.profilePicture} alt={influencer.name} />
                              <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{influencer.handle}</h3>
                                <Badge className="bg-blue-500">{influencer.location}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {influencer.followers.toLocaleString()} followers •{" "}
                                {(influencer.engagementRate * 100).toFixed(1)}% engagement
                              </p>
                            </div>
                            <Button
                              size="sm"
                              className="bg-purple-600 hover:bg-purple-700"
                              onClick={() => handleBookInfluencer(influencer)}
                            >
                              Book
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className={activeTab === "settings" ? "block" : "hidden"}>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage your account preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Settings content will go here</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </SidebarInset>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        influencer={selectedInfluencer}
        onBookingComplete={handleBookingComplete}
      />
    </SidebarProvider>
  )
}
