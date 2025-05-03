"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import BrandScore from "@/components/brand-score"
import CampaignGoals from "@/components/campaign-goals"
import InfluencerSearch from "@/components/influencer-search"
import BudgetOptimizer from "@/components/budget-optimizer"
import CrossPlatformInsights from "@/components/cross-platform-insights"
import CampaignInsights from "@/components/campaign-insights"
import BrandCommunity from "@/components/brand-community"
import BookingModal from "@/components/booking-modal"
import SmartCampaignSuggestions from "@/components/smart-campaign-suggestions"
import ContentApproval from "@/components/content-approval"
import PerformanceBenchmarking from "@/components/performance-benchmarking"
import CaseStudy from "@/components/case-study"
import { influencers } from "@/lib/data"

export default function BrandStudio() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedInfluencer, setSelectedInfluencer] = useState<any>(null)
  const [bookingCount, setBookingCount] = useState(2)
  const [notificationCount, setNotificationCount] = useState(3)

  const handleBookInfluencer = (influencer: any) => {
    setSelectedInfluencer(influencer)
    setIsBookingModalOpen(true)
  }

  const handleBookingComplete = () => {
    setIsBookingModalOpen(false)
    setBookingCount((prev) => prev + 1)
    if (bookingCount + 1 >= 3) {
      setNotificationCount((prev) => prev + 1)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Notifications Bell */}
      <div className="fixed top-4 right-4 z-40">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-yellow-500"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-zinc-800 border-zinc-700 p-4 text-zinc-200">
            <div className="space-y-2">
              <p className="text-sm">🔔 New micro-influencer match: @arcachonSpeaker!</p>
              <p className="text-sm">📩 @tokyoTrendsetter accepted your €400 offer!</p>
              <p className="text-sm">🎉 You've earned a 10% discount for booking 3 influencers!</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Hero Section */}
      <div className="text-center py-16 px-6">
        <h1 className="text-5xl font-light text-yellow-500 mb-4 tracking-wide">CreatorTorch for Brands</h1>
        <p className="text-xl text-gray-400 mb-6 font-light">
          Discover the magic of micro-influencers to elevate your campaigns.
        </p>
        <p className="text-lg text-gray-500 font-light">
          Powered by AI-driven insights and the Model Control Protocol.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Dashboard Title */}
        <h1 className="text-4xl font-light mb-8 text-yellow-500 text-center tracking-wide">Your Brand Studio</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BrandScore bookingProgress={bookingCount} />
            <CampaignGoals />
            <SmartCampaignSuggestions onBookInfluencer={handleBookInfluencer} />
            <InfluencerSearch influencers={influencers} onBookInfluencer={handleBookInfluencer} />
          </div>

          <div className="space-y-8">
            <BudgetOptimizer />
            <ContentApproval />
            <CampaignInsights />
          </div>
        </div>

        <div className="mt-8">
          <PerformanceBenchmarking />
        </div>

        <div className="mt-8">
          <CrossPlatformInsights influencers={influencers} />
        </div>

        <div className="mt-8">
          <BrandCommunity />
        </div>

        <div className="mt-8">
          <CaseStudy />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-900 py-6 text-center text-gray-400 font-light">
        <p>© 2025 CreatorTorch. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="text-yellow-500 hover:underline mx-2">
            About
          </a>
          <a href="#" className="text-yellow-500 hover:underline mx-2">
            Contact
          </a>
          <a href="#" className="text-yellow-500 hover:underline mx-2">
            Terms
          </a>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        influencer={selectedInfluencer}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  )
}
