import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageCircle, Globe, CheckCircle, Clock, ArrowRight } from "lucide-react"

export function WorkflowsSection() {
  return (
    <Card className="overflow-hidden border-none shadow-lg polaroid-card">
      <CardHeader className="bg-[#66CC99] text-white p-6">
        <CardTitle className="flex items-center gap-2 text-2xl font-light">
          <Clock className="h-5 w-5" />
          Automated Workflows
        </CardTitle>
        <CardDescription className="text-white/80 font-light">
          Streamline your creative process with intelligent automation
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <Tabs defaultValue="event">
          <TabsList className="mb-6 bg-[#F0F0F0] dark:bg-[#222222]">
            <TabsTrigger value="event" className="font-light">
              Event Acceptance
            </TabsTrigger>
            <TabsTrigger value="fan" className="font-light">
              Fan Engagement
            </TabsTrigger>
            <TabsTrigger value="global" className="font-light">
              Global Event
            </TabsTrigger>
          </TabsList>

          <TabsContent value="event" className="space-y-6">
            <div className="rounded-none border border-[#EEEEEE] dark:border-[#222222] p-6">
              <h3 className="text-xl font-light mb-4">Event Acceptance Workflow</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FF0066] text-white rounded-full p-2 mt-1">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Creator Accepts Event</p>
                    <p className="text-sm text-muted-foreground font-light">
                      System detects the acceptance and triggers workflow
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 mx-2 mt-2 text-muted-foreground" />
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#00CCFF] text-white rounded-full p-2 mt-1">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Venue Booking</p>
                    <p className="text-sm text-muted-foreground font-light">
                      Books venue automatically via API integration
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 mx-2 mt-2 text-muted-foreground" />
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#FFCC00] text-white rounded-full p-2 mt-1">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Invoice Generation</p>
                    <p className="text-sm text-muted-foreground font-light">Sends invoice via Stripe Connect</p>
                  </div>
                  <ArrowRight className="h-4 w-4 mx-2 mt-2 text-muted-foreground" />
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#66CC99] text-white rounded-full p-2 mt-1">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Follower Alerts</p>
                    <p className="text-sm text-muted-foreground font-light">
                      Sends translated alerts to followers in their native languages
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Badge variant="outline" className="bg-[#66CC99] text-white hover:bg-[#66CC99]/90 font-light">
                  Active
                </Badge>
                <span className="text-sm text-muted-foreground ml-2 font-light">Last triggered: 2 days ago</span>
              </div>
            </div>

            <Button className="w-full bg-[#66CC99] text-white hover:bg-[#66CC99]/90 rounded-none font-light">
              Customize Workflow
            </Button>
          </TabsContent>

          <TabsContent value="fan" className="space-y-6">
            <div className="rounded-none border border-[#EEEEEE] dark:border-[#222222] p-6">
              <h3 className="text-xl font-light mb-4">Fan Engagement Workflow</h3>
              <p className="text-sm text-muted-foreground mb-6 font-light">
                Automatically engage fans across language barriers when you post new content
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FF0066] text-white rounded-full p-2 mt-1">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Creator Posts Video</p>
                    <p className="text-sm text-muted-foreground font-light">
                      System detects new content and triggers workflow
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Badge
                    variant="outline"
                    className="bg-[#F8F8F8] text-black border-black hover:bg-[#F0F0F0] font-light"
                  >
                    Ready to Activate
                  </Badge>
                </div>
              </div>
            </div>

            <Button className="w-full bg-[#FF0066] text-white hover:bg-[#FF0066]/90 rounded-none font-light">
              Activate Workflow
            </Button>
          </TabsContent>

          <TabsContent value="global" className="space-y-6">
            <div className="rounded-none border border-[#EEEEEE] dark:border-[#222222] p-6">
              <h3 className="text-xl font-light mb-4">Global Event Workflow</h3>
              <p className="text-sm text-muted-foreground mb-6 font-light">
                Manage global VR events with translated captions and alerts
              </p>

              <div className="mt-6">
                <Badge variant="outline" className="bg-[#F8F8F8] text-black border-black hover:bg-[#F0F0F0] font-light">
                  Not Configured
                </Badge>
              </div>
            </div>

            <Button className="w-full bg-[#00CCFF] text-white hover:bg-[#00CCFF]/90 rounded-none font-light">
              Set Up Workflow
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
