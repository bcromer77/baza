"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Building, ArrowRight, Send, ExternalLink, TrendingUp, Target, Award, Users } from "lucide-react"

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    name: "Web Summit 2025",
    location: "Lisbon, Portugal",
    date: "September 15-18, 2025",
    attendees: "70,000+",
    potentialReach: "High",
    relevance: 95,
    description: "One of the largest tech conferences in the world, perfect for confidence speaking workshops.",
    website: "https://websummit.com",
    logo: "/web-summit-crowd.png",
  },
  {
    id: 2,
    name: "Women in Tech Global Conference",
    location: "Paris, France",
    date: "October 5-7, 2025",
    attendees: "15,000+",
    potentialReach: "Very High",
    relevance: 98,
    description: "Focused on women in technology leadership roles, ideal for your confidence workshops.",
    website: "https://womenintechglobal.com",
    logo: "/diverse-women-innovating.png",
  },
  {
    id: 3,
    name: "European Leadership Summit",
    location: "Berlin, Germany",
    date: "November 10-12, 2025",
    attendees: "8,000+",
    potentialReach: "Medium",
    relevance: 90,
    description: "Executive-focused event with opportunities for leadership workshops.",
    website: "https://euroleadership.com",
    logo: "/converging-leaders.png",
  },
]

// Mock data for potential brand partnerships
const potentialBrands = [
  {
    id: 1,
    name: "Microsoft",
    industry: "Technology",
    matchScore: 92,
    description: "Potential for executive confidence training programs across European offices.",
    contactPerson: "Sarah Johnson, Head of Learning & Development",
    logo: "/microsoft-campus-overview.png",
  },
  {
    id: 2,
    name: "LinkedIn",
    industry: "Professional Network",
    matchScore: 95,
    description: "Partnership opportunity for confidence workshops for their premium members.",
    contactPerson: "Michael Chen, Director of Member Experience",
    logo: "/professional-networking.png",
  },
  {
    id: 3,
    name: "Marriott International",
    industry: "Hospitality",
    matchScore: 88,
    description: "Potential for ongoing speaker series at their European European luxury properties.",
    contactPerson: "Elena Rossi, Events Director EMEA",
    logo: "/placeholder.svg?height=40&width=40&query=Marriott",
  },
  {
    id: 4,
    name: "Salesforce",
    industry: "Technology",
    matchScore: 90,
    description: "Opportunity for confidence training at their regional sales conferences.",
    contactPerson: "Thomas Weber, VP of Sales EMEA",
    logo: "/placeholder.svg?height=40&width=40&query=Salesforce",
  },
]

// Outreach templates
const outreachTemplates = [
  {
    id: 1,
    title: "Event Speaking Proposal",
    description: "Template for reaching out to event organizers to propose a speaking slot.",
    subject: "Speaking Proposal: Confidence Workshop for [Event Name]",
  },
  {
    id: 2,
    title: "Corporate Training Offer",
    description: "Template for pitching confidence training to corporate clients.",
    subject: "Exclusive Confidence Training Program for [Company] Leadership",
  },
  {
    id: 3,
    title: "Follow-up After Connection",
    description: "Template for following up after making a connection at an event.",
    subject: "Great connecting at [Event] - Next Steps for Confidence Training",
  },
]

export function OutreachSection() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  return (
    <Card className="overflow-hidden border border-[#E5E5E5] shadow-sm rounded-xl">
      <CardHeader className="apple-gradient-blue text-white p-6">
        <CardTitle className="flex items-center gap-2 text-2xl font-light">
          <Target className="h-5 w-5" />
          Growth Outreach
        </CardTitle>
        <CardDescription className="text-white/90 font-light">
          Expand your reach with strategic partnerships and speaking opportunities
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="events">
          <TabsList className="mb-6 bg-[#F0F0F0] dark:bg-[#222222]">
            <TabsTrigger value="events" className="font-light">
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="brands" className="font-light">
              Brand Partnerships
            </TabsTrigger>
            <TabsTrigger value="templates" className="font-light">
              Outreach Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="border border-[#E5E5E5] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-light text-muted-foreground">Potential Reach</p>
                    <p className="text-3xl font-light text-[hsl(var(--apple-blue))]">93,000+</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--apple-blue))]/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-[hsl(var(--apple-blue))]" />
                  </div>
                </div>
              </Card>

              <Card className="border border-[#E5E5E5] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-light text-muted-foreground">Upcoming Events</p>
                    <p className="text-3xl font-light text-[hsl(var(--apple-green))]">12</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--apple-green))]/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-[hsl(var(--apple-green))]" />
                  </div>
                </div>
              </Card>

              <Card className="border border-[#E5E5E5] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-light text-muted-foreground">Growth Potential</p>
                    <p className="text-3xl font-light text-[hsl(var(--apple-orange))]">+45%</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--apple-orange))]/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-[hsl(var(--apple-orange))]" />
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="border border-[#E5E5E5] rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-[#E5E5E5] bg-[#F9F9F9] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={event.logo || "/placeholder.svg"} alt={event.name} className="w-10 h-10 rounded" />
                      <div>
                        <h3 className="text-base font-medium">{event.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {event.date}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-[hsl(var(--apple-blue))] text-white">{event.relevance}% Match</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-[hsl(var(--apple-blue))]" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-[hsl(var(--apple-green))]" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                    <p className="text-sm mb-4">{event.description}</p>
                    <div className="flex gap-2">
                      <Button
                        className="bg-[hsl(var(--apple-blue))] text-white hover:bg-[hsl(var(--apple-blue))]/90 rounded-lg flex-1"
                        onClick={() => (window.location.href = `/outreach/events/${event.id}`)}
                      >
                        <Send className="h-4 w-4 mr-2" /> Reach Out
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-lg"
                        onClick={() => window.open(event.website, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" /> Visit Website
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="brands" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {potentialBrands.map((brand) => (
                <Card key={brand.id} className="border border-[#E5E5E5] rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-[#E5E5E5] bg-[#F9F9F9] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="w-10 h-10 rounded" />
                      <div>
                        <h3 className="text-base font-medium">{brand.name}</h3>
                        <p className="text-sm text-muted-foreground">{brand.industry}</p>
                      </div>
                    </div>
                    <Badge className="bg-[hsl(var(--apple-green))] text-white">{brand.matchScore}% Match</Badge>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm mb-3">{brand.description}</p>
                    <p className="text-sm text-muted-foreground mb-4">Contact: {brand.contactPerson}</p>
                    <div className="flex gap-2">
                      <Button
                        className="bg-[hsl(var(--apple-blue))] text-white hover:bg-[hsl(var(--apple-blue))]/90 rounded-lg flex-1"
                        onClick={() => (window.location.href = `/outreach/brands/${brand.id}`)}
                      >
                        <Send className="h-4 w-4 mr-2" /> Reach Out
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-lg"
                        onClick={() => (window.location.href = `/brands/${brand.id}/research`)}
                      >
                        Research
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {outreachTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`border border-[#E5E5E5] rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
                    selectedTemplate === template.id ? "ring-2 ring-[hsl(var(--apple-blue))]" : ""
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-4">
                    <h3 className="text-base font-medium mb-2">{template.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                    <p className="text-sm font-medium">Subject:</p>
                    <p className="text-sm italic">{template.subject}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                className="bg-[hsl(var(--apple-blue))] text-white hover:bg-[hsl(var(--apple-blue))]/90 rounded-lg"
                disabled={!selectedTemplate}
                onClick={() => (window.location.href = `/outreach/templates/${selectedTemplate}`)}
              >
                Use Template
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 rounded-xl border border-[#E5E5E5] p-4 bg-[#F9F9F9]">
          <h3 className="text-base font-medium mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 text-[hsl(var(--apple-blue))] mr-2" />
            Growth Strategy Tips
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Maximize your outreach success with these strategic approaches:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-[hsl(var(--apple-blue))] mt-0.5" />
              <span>
                Reach out to <strong>Web Summit</strong> and <strong>Women in Tech</strong> at least 6 months before
                their events for speaking opportunities
              </span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-[hsl(var(--apple-green))] mt-0.5" />
              <span>
                Customize your pitch for <strong>Microsoft</strong> and <strong>LinkedIn</strong> to focus on their
                specific leadership challenges
              </span>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-[hsl(var(--apple-orange))] mt-0.5" />
              <span>
                Offer <strong>Marriott International</strong> a special package for hosting regular workshops across
                their European properties
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
