"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Euro, Calendar, Users, Building, Star } from "lucide-react"

// Mock data for geo-based opportunities
const geoOpportunities = [
  {
    id: 1,
    venue: "Hilton Paris Opera",
    title: "Executive Confidence Workshop",
    description: "Host a 2-day confidence workshop for executives",
    fee: 3500,
    attendees: 25,
    location: "Paris, France",
    date: "May 15-16, 2025",
    rating: 4.9,
    distance: "1.2 km from your location",
    tags: ["executive", "workshop", "premium"],
  },
  {
    id: 2,
    venue: "Four Seasons Hotel Lisbon",
    title: "Women in Leadership Seminar",
    description: "Lead a seminar on confidence for women executives",
    fee: 2800,
    attendees: 40,
    location: "Lisbon, Portugal",
    date: "June 3, 2025",
    rating: 4.8,
    distance: "0.5 km from your location",
    tags: ["women", "leadership", "seminar"],
  },
  {
    id: 3,
    venue: "Marriott Barcelona",
    title: "Public Speaking Masterclass",
    description: "Deliver a masterclass on public speaking techniques",
    fee: 2200,
    attendees: 50,
    location: "Barcelona, Spain",
    date: "May 28, 2025",
    rating: 4.7,
    distance: "450 km from your location",
    tags: ["masterclass", "public-speaking", "large-group"],
  },
]

export function GeoOpportunitiesSection() {
  const [activeLocation, setActiveLocation] = useState("all")

  const filteredOpportunities =
    activeLocation === "all"
      ? geoOpportunities
      : geoOpportunities.filter((opp) => opp.location.includes(activeLocation))

  return (
    <Card className="overflow-hidden border border-[#E5E5E5] shadow-sm rounded-xl">
      <CardHeader className="apple-gradient-purple text-white p-6">
        <CardTitle className="flex items-center gap-2 text-2xl font-light">
          <MapPin className="h-5 w-5" />
          Nearby Opportunities
        </CardTitle>
        <CardDescription className="text-white/90 font-light">
          Premium speaking engagements at luxury hotels near you
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeLocation === "all" ? "default" : "outline"}
            onClick={() => setActiveLocation("all")}
            className={`rounded-full ${activeLocation === "all" ? "bg-[hsl(var(--apple-blue))]" : ""}`}
          >
            All Locations
          </Button>
          <Button
            variant={activeLocation === "Paris" ? "default" : "outline"}
            onClick={() => setActiveLocation("Paris")}
            className={`rounded-full ${activeLocation === "Paris" ? "bg-[hsl(var(--apple-blue))]" : ""}`}
          >
            Paris
          </Button>
          <Button
            variant={activeLocation === "Lisbon" ? "default" : "outline"}
            onClick={() => setActiveLocation("Lisbon")}
            className={`rounded-full ${activeLocation === "Lisbon" ? "bg-[hsl(var(--apple-blue))]" : ""}`}
          >
            Lisbon
          </Button>
          <Button
            variant={activeLocation === "Barcelona" ? "default" : "outline"}
            onClick={() => setActiveLocation("Barcelona")}
            className={`rounded-full ${activeLocation === "Barcelona" ? "bg-[hsl(var(--apple-blue))]" : ""}`}
          >
            Barcelona
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <Card
              key={opportunity.id}
              className="border border-[#E5E5E5] rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4 border-b border-[#E5E5E5] bg-[#F9F9F9]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-medium">{opportunity.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Building className="h-3 w-3" />
                      {opportunity.venue}
                    </p>
                  </div>
                  <Badge className="bg-[hsl(var(--apple-blue))] text-white hover:bg-[hsl(var(--apple-blue))]/90">
                    <Star className="h-3 w-3 mr-1" /> {opportunity.rating}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 space-y-4">
                <p className="text-sm">{opportunity.description}</p>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Euro className="h-4 w-4 text-[hsl(var(--apple-green))]" />
                    <span>€{opportunity.fee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[hsl(var(--apple-blue))]" />
                    <span>{opportunity.attendees} attendees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[hsl(var(--apple-pink))]" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[hsl(var(--apple-orange))]" />
                    <span>{opportunity.date}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">{opportunity.distance}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {opportunity.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs font-light">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  className="w-full mt-3 bg-[hsl(var(--apple-blue))] text-white hover:bg-[hsl(var(--apple-blue))]/90 rounded-lg"
                  onClick={() => (window.location.href = "/opportunities/apply")}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
