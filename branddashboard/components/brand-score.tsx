import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface BrandScoreProps {
  bookingProgress: number
}

export default function BrandScore({ bookingProgress }: BrandScoreProps) {
  return (
    <section>
      <h2 className="text-2xl font-light mb-4 text-yellow-500 tracking-wide">🏆 Brand Influence Score</h2>
      <Card className="bg-zinc-800/90 backdrop-blur-md border-zinc-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-3px]">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-light">Score:</p>
              <p className="font-medium text-yellow-500">92/100</p>
            </div>

            <Progress value={92} className="h-2 bg-zinc-700" indicatorClassName="bg-yellow-500" />

            <p className="font-light text-zinc-300">4 successful campaigns this month!</p>

            <div className="mt-4 pt-4 border-t border-zinc-700">
              <p className="font-light">
                Book 3 micro-influencers to unlock a 10% discount!
                <span className="ml-2 text-yellow-500 font-medium">(Progress: {bookingProgress}/3)</span>
              </p>
              <Progress
                value={(bookingProgress / 3) * 100}
                className="h-2 mt-2 bg-zinc-700"
                indicatorClassName="bg-yellow-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
