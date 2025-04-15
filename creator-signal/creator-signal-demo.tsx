"use client"

import { useState } from "react"
import { Send, User, Users, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const MOCK_CREATORS = [
  {
    name: "Anna Travels",
    handle: "@wanderiiz",
    transcript: "I'm planning to escape the grey skies for somewhere sunny like Madeira...",
    audience: [
      { country: "UK", percentage: 48 },
      { country: "PT", percentage: 13 },
    ],
    sentiment: "Escape / Reset",
    sentimentEmoji: "🌞",
    score: 93,
    avatarUrl: "/global-explorer.png",
  },
  {
    name: "Tom's Adventures",
    handle: "@toms_adventures",
    transcript: "Thinking about Madeira for my next remote stint...",
    audience: [
      { country: "US", percentage: 18 },
      { country: "FR", percentage: 10 },
    ],
    sentiment: "Remote / Exotic",
    sentimentEmoji: "🌴",
    score: 89,
    avatarUrl: "/urban-explorer.png",
  },
  {
    name: "Explore with Mia",
    handle: "@explore.mia",
    transcript: "Can't wait for my Madeira getaway — just me and the ocean.",
    audience: [
      { country: "UK", percentage: 21 },
      { country: "ES", percentage: 14 },
    ],
    sentiment: "Reflective / Solo",
    sentimentEmoji: "☀️",
    score: 91,
    avatarUrl: "/adventurous-explorer.png",
  },
]

export default function CreatorSignalDemo() {
  const [matches, setMatches] = useState<any[]>([])
  const [sentTo, setSentTo] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [batchSending, setBatchSending] = useState(false)

  const runMatch = () => {
    setIsAnalyzing(true)
    setSentTo([])
    setBatchSending(false)

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      setMatches(MOCK_CREATORS)
    }, 1500)
  }

  const sendWhatsApp = (creator: string) => {
    setSentTo((prev) => [...prev, creator])
  }

  const sendToAll = () => {
    setBatchSending(true)

    // Simulate sequential sending with slight delays
    matches.forEach((creator, index) => {
      setTimeout(() => {
        setSentTo((prev) => [...prev, creator.name])

        // If this is the last one, we're done with batch sending
        if (index === matches.length - 1) {
          setTimeout(() => setBatchSending(false), 300)
        }
      }, index * 400)
    })
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111] flex flex-col items-center">
      <div className="w-full max-w-5xl px-6 py-12">
        <header className="mb-12">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-1">Creator Signal</h1>
              <p className="text-[#666] text-sm">Intelligent creator matching for hospitality campaigns</p>
            </div>
            <span className="text-xs text-[#999] font-light">Powered by Creator Signal™</span>
          </div>
          <div className="h-px bg-[#EEEEEE] w-full mt-6"></div>
        </header>

        <div className="mb-10">
          <Button
            onClick={runMatch}
            disabled={isAnalyzing}
            className="bg-black hover:bg-black/90 text-white rounded-full px-6 py-5 h-auto text-sm font-normal transition-all duration-300 flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>Analyzing creator signals</>
            ) : (
              <>
                Run creator match
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>

        {matches.length > 0 && !isAnalyzing && (
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-light">
                {sentTo.length === matches.length ? "All invites sent" : `${matches.length} creators matched`}
              </h2>
              {sentTo.length > 0 && sentTo.length < matches.length && (
                <Badge
                  variant="outline"
                  className="bg-[#F0F0F0] text-[#333] border-none text-xs px-2 py-0.5 rounded-full"
                >
                  {sentTo.length}/{matches.length} invited
                </Badge>
              )}
            </div>

            {sentTo.length < matches.length && (
              <Button
                onClick={sendToAll}
                disabled={batchSending}
                className="bg-[#25D366] hover:bg-[#20BD5C] text-white rounded-full px-5 py-2 h-auto text-xs font-normal transition-all duration-300 flex items-center gap-2"
              >
                {batchSending ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-3 w-3" />
                    Send to All
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-[#666]">Analyzing creator signals...</p>
          </div>
        )}

        {matches.length > 0 && !isAnalyzing && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matches.map((creator, i) => (
              <Card
                key={i}
                className="border border-[#EEEEEE] rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardHeader className="p-5 pb-3 flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12 rounded-full">
                    <AvatarImage src={creator.avatarUrl || "/placeholder.svg"} alt={creator.name} />
                    <AvatarFallback className="bg-[#F5F5F5] text-[#999]">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-base font-medium">{creator.name}</h2>
                    <p className="text-xs text-[#999]">{creator.handle}</p>
                  </div>
                </CardHeader>

                <CardContent className="p-5 pt-2">
                  <div className="mb-4">
                    <p className="text-sm italic text-[#444] leading-relaxed">"{creator.transcript}"</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[#F9F9F9] rounded-lg p-3">
                      <p className="text-xs text-[#999] mb-1">Audience</p>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-[#666]" />
                        <div className="flex gap-2">
                          {creator.audience.map((a, i) => (
                            <span key={i} className="text-xs font-medium">
                              {a.country}: {a.percentage}%
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#F9F9F9] rounded-lg p-3">
                      <p className="text-xs text-[#999] mb-1">Sentiment</p>
                      <div className="flex items-center gap-1">
                        <span>{creator.sentimentEmoji}</span>
                        <span className="text-xs font-medium">{creator.sentiment}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="bg-[#F0F0F0] text-[#333] border-none text-xs px-2 py-0.5 rounded-full"
                    >
                      Match: {creator.score}%
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="p-5 pt-0">
                  {sentTo.includes(creator.name) ? (
                    <div className="w-full">
                      <div className="flex items-center gap-2 text-green-600 mb-3">
                        <Check className="h-4 w-4" />
                        <span className="text-xs font-medium">Invite sent</span>
                      </div>
                      <div className="bg-[#F5F5F5] p-3 rounded-lg text-xs text-[#555] leading-relaxed">
                        <p className="font-medium mb-1">WhatsApp Preview:</p>
                        <p>
                          Hi {creator.name.split(" ")[0]}! We loved your content about Madeira {creator.sentimentEmoji}
                        </p>
                        <p className="mt-1">
                          We're inviting a few creators to a winter reset. Tap here →{" "}
                          <span className="text-black underline">creator.torch/madeira</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => sendWhatsApp(creator.name)}
                      disabled={batchSending}
                      className="w-full bg-[#25D366] hover:bg-[#20BD5C] text-white rounded-lg py-2 h-auto text-xs font-normal transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Send className="h-3 w-3" />
                      Send WhatsApp Invite
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
