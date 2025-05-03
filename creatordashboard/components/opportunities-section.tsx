"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Flame, CheckCircle, Calendar, MapPin, Euro, Users } from "lucide-react"

// Mock data for opportunities
const allOpportunities = [
  {
    id: 1,
    brand: "Lumi Skincare",
    title: "Host a Lisbon Brunch Event",
    description: "Host a brunch event for skincare enthusiasts in Lisbon",
    budget: 600,
    audienceSize: 20000,
    location: "Lisbon, Portugal",
    date: "Next Thursday",
    matchScore: 95,
    tags: ["skincare", "event", "local"],
    color: "var(--accent-pink)",
  },
  {
    id: 2,
    brand: "Ozempic",
    title: "Health Trend Series",
    description: "Create a series on health trends featuring Ozempic",
    budget: 7000,
    audienceSize: 50000,
    location: "Virtual",
    date: "Next Month",
    matchScore: 87,
    tags: ["health", "series", "sponsored"],
    color: "var(--accent-blue)",
  },
  {
    id: 3,
    brand: "EcoBrand",
    title: "Sustainable Living Workshop",
    description: "Host a workshop on sustainable living practices",
    budget: 3000,
    audienceSize: 15000,
    location: "Galway, Ireland",
    date: "In 2 weeks",
    matchScore: 82,
    tags: ["sustainability", "workshop", "travel"],
    color: "var(--accent-green)",
  },
  {
    id: 4,
    brand: "FitLife",
    title: "Fitness Challenge",
    description: "Lead a 7-day fitness challenge for your audience",
    budget: 1500,
    audienceSize: 10000,
    location: "Virtual",
    date: "Next week",
    matchScore: 78,
    tags: ["fitness", "challenge", "virtual"],
    color: "var(--accent-yellow)",
  },
  {
    id: 5,
    brand: "TravelPlus",
    title: "Portugal Travel Guide",
    description: "Create a travel guide for Portugal highlighting local spots",
    budget: 2500,
    audienceSize: 30000,
    location: "Portugal",
    date: "Next month",
    matchScore: 91,
    tags: ["travel", "guide", "local"],
    color: "var(--accent-pink)",
  },
]

export function OpportunitiesSection() {
  const [minBudget, setMinBudget] = useState(0)
  const [minAudienceSize, setMinAudienceSize] = useState(0)
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [acceptedDialogOpen, setAcceptedDialogOpen] = useState(false)

  // Filter opportunities based on sliders
  const filteredOpportunities = allOpportunities.filter(
    (opp) => opp.budget >= minBudget && opp.audienceSize >= minAudienceSize,
  )

  const handleAccept = () => {
    setDialogOpen(false)
    setAcceptedDialogOpen(true)
  }

  return (
    <>
      <Card className="overflow-hidden border-none shadow-lg">
        <CardHeader className="bg-black text-white p-6 border-b-4 border-[hsl(var(--accent-yellow))]">
          <CardTitle className="flex items-center gap-2 text-2xl font-light">
            <Flame className="h-5 w-5 text-[hsl(var(--accent-yellow))]" />
            Hot Opportunities
          </CardTitle>
          <CardDescription className="text-gray-400 font-light">
            Personalized opportunities based on your audience data
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-light">Min Budget (€)</span>
                <span className="text-sm font-light">{minBudget}</span>
              </div>
              <Slider
                defaultValue={[0]}
                max={10000}
                step={100}
                onValueChange={(value) => setMinBudget(value[0])}
                className="[&>span]:bg-[hsl(var(--accent-yellow))] [&>span]:h-[3px] [&>span]:rounded-none [&>span]:after:bg-[hsl(var(--accent-yellow))] [&>span]:after:w-4 [&>span]:after:h-4 [&>span]:after:rounded-full"
              />

              <div className="flex justify-between items-center mt-6">
                <span className="text-sm font-light">Min Audience Size</span>
                <span className="text-sm font-light">{minAudienceSize}</span>
              </div>
              <Slider
                defaultValue={[0]}
                max={50000}
                step={1000}
                onValueChange={(value) => setMinAudienceSize(value[0])}
                className="[&>span]:bg-[hsl(var(--accent-yellow))] [&>span]:h-[3px] [&>span]:rounded-none [&>span]:after:bg-[hsl(var(--accent-yellow))] [&>span]:after:w-4 [&>span]:after:h-4 [&>span]:after:rounded-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredOpportunities.map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="overflow-hidden border border-[#EEEEEE] dark:border-[#222222] hover:shadow-md transition-shadow"
                >
                  <CardHeader className="p-4 border-b border-[#EEEEEE] dark:border-[#222222]">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base font-light">{opportunity.title}</CardTitle>
                        <CardDescription className="text-sm">{opportunity.brand}</CardDescription>
                      </div>
                      <Badge
                        className="bg-black text-white hover:bg-black/90 font-light"
                        style={{ backgroundColor: `hsl(${opportunity.color})` }}
                      >
                        {opportunity.matchScore}% Match
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Euro className="h-4 w-4 text-[hsl(var(--accent-pink))]" />
                      <span>€{opportunity.budget}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-[hsl(var(--accent-blue))]" />
                      <span>{opportunity.audienceSize.toLocaleString()} audience reach</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-[hsl(var(--accent-yellow))]" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-[hsl(var(--accent-green))]" />
                      <span>{opportunity.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {opportunity.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-light">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      className="w-full mt-3 bg-black text-white hover:bg-black/90 rounded-none font-light"
                      style={{ backgroundColor: `hsl(${opportunity.color})` }}
                      onClick={() => {
                        setSelectedOpportunity(opportunity)
                        setDialogOpen(true)
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opportunity Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-none border-none">
          <DialogHeader
            className="bg-black p-4 text-white"
            style={{ borderBottom: `4px solid hsl(${selectedOpportunity?.color})` }}
          >
            <DialogTitle className="text-xl font-light">{selectedOpportunity?.title}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Opportunity from {selectedOpportunity?.brand}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 px-4">
            <p className="font-light">{selectedOpportunity?.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Euro className="h-4 w-4 text-[hsl(var(--accent-pink))]" />
                <span className="font-light">Budget: €{selectedOpportunity?.budget}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[hsl(var(--accent-blue))]" />
                <span className="font-light">Audience: {selectedOpportunity?.audienceSize?.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[hsl(var(--accent-yellow))]" />
                <span className="font-light">Location: {selectedOpportunity?.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[hsl(var(--accent-green))]" />
                <span className="font-light">Timeline: {selectedOpportunity?.date}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Why this matches you:</h4>
              <p className="text-sm text-muted-foreground font-light">
                Based on your audience data and content history, our AI has identified this as a{" "}
                {selectedOpportunity?.matchScore}% match for your brand and audience interests.
              </p>
            </div>
          </div>
          <DialogFooter className="p-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-none font-light">
              Cancel
            </Button>
            <Button
              onClick={handleAccept}
              className="text-white hover:bg-opacity-90 rounded-none font-light"
              style={{ backgroundColor: `hsl(${selectedOpportunity?.color})` }}
            >
              Accept Opportunity
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Accepted Dialog */}
      <Dialog open={acceptedDialogOpen} onOpenChange={setAcceptedDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-none border-none">
          <DialogHeader className="bg-black text-white p-4 border-b-4 border-[hsl(var(--accent-green))]">
            <DialogTitle className="flex items-center gap-2 text-xl font-light">
              <CheckCircle className="h-5 w-5 text-[hsl(var(--accent-green))]" />
              Opportunity Accepted!
            </DialogTitle>
            <DialogDescription className="text-gray-400">Your automated workflow has been initiated</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 px-4">
            <div className="rounded-none border p-4 bg-[#F8F8F8] dark:bg-[#1A1A1A]">
              <h4 className="font-medium mb-3">Automated Workflow Initiated:</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[hsl(var(--accent-green))] mt-0.5" />
                  <span className="font-light">Venue booked via API integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[hsl(var(--accent-green))] mt-0.5" />
                  <span className="font-light">Invoice sent via Stripe Connect</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[hsl(var(--accent-green))] mt-0.5" />
                  <span className="font-light">
                    Multilingual alerts sent to followers (Portuguese, French, English)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[hsl(var(--accent-green))] mt-0.5" />
                  <span className="font-light">Event added to your calendar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[hsl(var(--accent-green))] mt-0.5" />
                  <span className="font-light">Analytics tracking set up for this campaign</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground font-light">
              All details have been added to your dashboard. You can track the performance of this opportunity in
              real-time.
            </p>
          </div>
          <DialogFooter className="p-4">
            <Button
              onClick={() => setAcceptedDialogOpen(false)}
              className="bg-[hsl(var(--accent-green))] text-white hover:bg-[hsl(var(--accent-green))]/90 rounded-none font-light"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
