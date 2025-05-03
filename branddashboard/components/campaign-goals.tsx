import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function CampaignGoals() {
  return (
    <section>
      <h2 className="text-2xl font-light mb-4 text-yellow-500 tracking-wide">🎯 Campaign Goals</h2>
      <Card className="bg-zinc-800/90 backdrop-blur-md border-zinc-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-3px]">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-light">Goal: Reach 50,000 impressions this month</p>
              <p className="font-medium text-yellow-500">80%</p>
            </div>

            <div className="space-y-2">
              <p className="font-light text-zinc-400">Progress: 40,000 impressions</p>
              <Progress value={80} className="h-2 bg-zinc-700" indicatorClassName="bg-yellow-500" />
            </div>

            <Button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-black">Set New Goal</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
