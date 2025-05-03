import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Handshake } from "lucide-react"

export default function BrandCommunity() {
  return (
    <section>
      <h2 className="text-2xl font-light mb-4 text-yellow-500 tracking-wide">🌟 Brand Community</h2>
      <Card className="bg-zinc-800/90 backdrop-blur-md border-zinc-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-3px]">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-light text-zinc-100">Top Brands This Week</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-yellow-500 text-black hover:bg-yellow-400">1</Badge>
                    <span className="font-medium">Arcachon Hotel</span>
                  </div>
                  <span className="text-yellow-500">100,000 impressions</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-zinc-700 text-zinc-200 hover:bg-zinc-600">2</Badge>
                    <span className="font-medium">TrendyTech</span>
                  </div>
                  <span className="text-zinc-400">80,000 impressions</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-zinc-700 text-zinc-200 hover:bg-zinc-600">3</Badge>
                    <span className="font-medium">GreenGlow</span>
                  </div>
                  <span className="text-zinc-400">60,000 impressions</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-light text-zinc-100">Collaboration Opportunities</h3>

              <Card className="bg-zinc-900 border-zinc-700">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <Handshake className="h-10 w-10 text-yellow-500 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-zinc-100">Partner with Arcachon Hotel</h4>
                      <p className="text-sm text-zinc-400 mt-1">
                        Joint campaign in Arcachon—potential 50,000 impressions!
                      </p>
                      <Button className="mt-3 bg-yellow-500 hover:bg-yellow-400 text-black">Explore Partnership</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-700">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <Handshake className="h-10 w-10 text-zinc-500 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-zinc-100">Co-sponsor with TrendyTech</h4>
                      <p className="text-sm text-zinc-400 mt-1">
                        Tech-focused sustainability event in Tokyo—reach new audiences!
                      </p>
                      <Button variant="outline" className="mt-3 border-zinc-700 text-zinc-200 hover:bg-zinc-800">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
