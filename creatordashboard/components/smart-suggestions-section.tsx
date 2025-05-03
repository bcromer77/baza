import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Calendar, Globe, TrendingUp, ArrowRight } from "lucide-react"

export function SmartSuggestionsSection() {
  return (
    <Card className="overflow-hidden border-none shadow-lg polaroid-card">
      <CardHeader className="bg-[#00CCFF] text-white p-6">
        <CardTitle className="flex items-center gap-2 text-2xl font-light">
          <Lightbulb className="h-5 w-5" />
          Smart Suggestions
        </CardTitle>
        <CardDescription className="text-white/80 font-light">
          AI-powered recommendations to maximize your impact
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-[#EEEEEE] dark:border-[#222222] hover:shadow-md transition-shadow polaroid-card-item">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#FF0066] text-white rounded-full p-2 mt-1">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Optimal Event Timing</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 font-light">
                Host your supper party at 19:00 for maximum engagement based on your audience's activity patterns.
              </p>
              <div className="flex items-center text-xs text-muted-foreground font-light">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>Based on 3 months of engagement data</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 rounded-none font-light border-[#FF0066] text-[#FF0066] hover:bg-[#FF0066]/10"
              >
                Apply to Events
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-[#EEEEEE] dark:border-[#222222] hover:shadow-md transition-shadow polaroid-card-item">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#00CCFF] text-white rounded-full p-2 mt-1">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Global Opportunity</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 font-light">
                Your French audience loves food content—host a virtual cooking class to earn €800.
              </p>
              <div className="flex items-center text-xs text-muted-foreground font-light">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>20% higher engagement than other content</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 rounded-none font-light border-[#00CCFF] text-[#00CCFF] hover:bg-[#00CCFF]/10"
              >
                Create Event
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-[#EEEEEE] dark:border-[#222222] hover:shadow-md transition-shadow polaroid-card-item">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#FFCC00] text-white rounded-full p-2 mt-1">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Content Strategy</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 font-light">
                Creators who use translated content see 30% higher engagement—try a multilingual fan challenge.
              </p>
              <div className="flex items-center text-xs text-muted-foreground font-light">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>Based on platform-wide creator data</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 rounded-none font-light border-[#FFCC00] text-[#FFCC00] hover:bg-[#FFCC00]/10"
              >
                Create Challenge
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 rounded-none border border-[#EEEEEE] dark:border-[#222222] p-6 bg-[#F8F8F8] dark:bg-[#1A1A1A]">
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <Lightbulb className="h-4 w-4 text-[#00CCFF] mr-2" />
            How These Suggestions Work
          </h3>
          <p className="text-sm text-muted-foreground mb-4 font-light">
            Our AI analyzes your audience behavior, content performance, and platform-wide trends to generate these
            personalized recommendations.
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center">
              <ArrowRight className="h-3 w-3 text-muted-foreground mr-2" />
              <span className="font-light">Audience engagement patterns across time zones and languages</span>
            </div>
            <div className="flex items-center">
              <ArrowRight className="h-3 w-3 text-muted-foreground mr-2" />
              <span className="font-light">Content performance by topic, format, and language</span>
            </div>
            <div className="flex items-center">
              <ArrowRight className="h-3 w-3 text-muted-foreground mr-2" />
              <span className="font-light">Predictive analytics for revenue optimization</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
