import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Zap, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function CreatorScoreSection() {
  return (
    <Card className="overflow-hidden border border-[#E5E5E5] shadow-sm rounded-xl">
      <CardHeader className="apple-gradient-blue text-white p-6">
        <CardTitle className="flex items-center gap-2 text-2xl font-light">
          <Trophy className="h-5 w-5" />
          Speaker Score
        </CardTitle>
        <CardDescription className="text-white/90 font-light">
          Track your progress and unlock premium opportunities
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-light">Your Score</h3>
              <span className="text-3xl font-light text-[hsl(var(--apple-blue))]">92/100</span>
            </div>
            <Progress value={92} className="h-2 bg-gray-200" indicatorClassName="bg-[hsl(var(--apple-blue))]" />
            <p className="text-sm text-muted-foreground font-light">
              You're in the top 5% of confidence coaches this month!
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[hsl(var(--apple-orange))]" />
              <h3 className="text-lg font-light">7-Day Streak</h3>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`h-2 flex-1 rounded-full ${day <= 7 ? "bg-[hsl(var(--apple-orange))]" : "bg-gray-200"}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-light">
              You've unlocked a €500 bonus opportunity with Marriott Hotels!
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[hsl(var(--apple-green))]" />
              <h3 className="text-lg font-light">Monthly Goal</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-light">€8,500/€10,000</span>
              <span className="text-sm font-light text-[hsl(var(--apple-green))]">85%</span>
            </div>
            <Progress value={85} className="h-2 bg-gray-200" indicatorClassName="bg-[hsl(var(--apple-green))]" />
            <p className="text-sm text-muted-foreground font-light">On track to exceed your monthly earnings goal!</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
