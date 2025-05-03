import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Database, Users, CreditCard, TrendingUp } from "lucide-react"

export default function YcReadySteps() {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-light mb-8 text-cyan-400 text-center tracking-wide">YC-Ready Roadmap</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-zinc-800/90 backdrop-blur-md border-zinc-700 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-zinc-100">
              <Database className="h-5 w-5 text-cyan-400 mr-2" />
              Integrate Real Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">MongoDB Connection</p>
                  <p className="text-sm text-zinc-400">
                    Update MONGODB_URI with new credentials (bazilcromer_test:TestPassword123!)
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">Phyllo API Integration</p>
                  <p className="text-sm text-zinc-400">Connect to Phyllo for real-time influencer data and analytics</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">Google Gemini Integration</p>
                  <p className="text-sm text-zinc-400">Implement content analysis and AI-driven recommendations</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">API Endpoints</p>
                  <p className="text-sm text-zinc-400">Update Next.js app to fetch real data via API endpoints</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/90 backdrop-blur-md border-zinc-700 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-zinc-100">
              <Users className="h-5 w-5 text-pink-400 mr-2" />
              Onboard Beta Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-pink-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">Outreach Campaign</p>
                  <p className="text-sm text-zinc-400">
                    Contact 10-50 small-to-medium brands via LinkedIn and industry forums
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-pink-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">Beta Program</p>
                  <p className="text-sm text-zinc-400">
                    Offer free 30-day access in exchange for feedback and testimonials
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-pink-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">Usage Metrics</p>
                  <p className="text-sm text-zinc-400">Track searches, bookings, and gather qualitative feedback</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/90 backdrop-blur-md border-zinc-700 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-zinc-100">
              <CreditCard className="h-5 w-5 text-green-400 mr-2" />
              Generate Initial Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">Booking Fee Model</p>
                  <p className="text-sm text-zinc-400">Implement 10% booking fee (e.g., €50 fee for a €500 booking)</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">Subscription Tiers</p>
                  <p className="text-sm text-zinc-400">
                    Test €99/month premium tier with advanced analytics and priority search
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">Revenue Target</p>
                  <p className="text-sm text-zinc-400">
                    Aim for €1,000 in revenue from beta users (20 bookings at €50 each)
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/90 backdrop-blur-md border-zinc-700 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-zinc-100">
              <TrendingUp className="h-5 w-5 text-violet-400 mr-2" />
              Define Growth Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-violet-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">Network Effects</p>
                  <p className="text-sm text-zinc-400">Implement "Invite an influencer and get €50 credit" program</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-violet-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">International Expansion</p>
                  <p className="text-sm text-zinc-400">Target new markets in Germany, Japan, and Australia</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-violet-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">Strategic Partnerships</p>
                  <p className="text-sm text-zinc-400">Partner with ad platforms to integrate campaign amplification</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
