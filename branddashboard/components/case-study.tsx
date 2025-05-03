import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CaseStudy() {
  return (
    <Card className="border-amber-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Case Study: Boosting Hotel Occupancy in November</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-1 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <h3 className="text-amber-800 font-medium mb-2">Challenge</h3>
            <p className="text-gray-700">Arcachon Hotel has a low occupancy rate for November (30% of 100 rooms).</p>
          </div>

          <div className="md:col-span-1 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-blue-800 font-medium mb-2">Goal</h3>
            <p className="text-gray-700">
              Book a communication coach to host an event in Arcachon in October, selling 30 rooms for November.
            </p>
          </div>

          <div className="md:col-span-1 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="text-purple-800 font-medium mb-2">Solution</h3>
            <p className="text-gray-700">
              Using the MCP, the dashboard identified @communikay, a local communication coach with a 95% match score
              for hosting events.
            </p>
          </div>

          <div className="md:col-span-1 p-4 bg-pink-50 rounded-lg border border-pink-100">
            <h3 className="text-pink-800 font-medium mb-2">Action</h3>
            <p className="text-gray-700">
              The hotel booked @communikay for €800, hosting a leadership workshop that attracted 50 attendees.
            </p>
          </div>

          <div className="md:col-span-1 p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="text-green-800 font-medium mb-2">Result</h3>
            <p className="text-gray-700">
              Occupancy increased to 60%, generating €9,000 in revenue (€300/room) and a 4x ROI on the influencer spend.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
