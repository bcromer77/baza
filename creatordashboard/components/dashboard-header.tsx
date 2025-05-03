import { UserNav } from "@/components/user-nav"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  heading: string
  subheading?: string
}

export function DashboardHeader({ heading, subheading }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 mb-8">
      <div className="grid gap-1">
        <h1 className="text-4xl font-light tracking-tight">{heading}</h1>
        {subheading && <p className="text-muted-foreground text-lg font-light">{subheading}</p>}
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--apple-blue))] text-[10px] text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start py-2">
              <span className="font-medium">New speaking opportunity</span>
              <span className="text-sm text-muted-foreground">
                Hilton Paris is looking for a confidence workshop host
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start py-2">
              <span className="font-medium">Payment received</span>
              <span className="text-sm text-muted-foreground">€2,500 received from Women in Tech Conference</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start py-2">
              <span className="font-medium">Workshop reminder</span>
              <span className="text-sm text-muted-foreground">
                Your "Speak with Confidence" workshop is tomorrow at 14:00
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <UserNav />
      </div>
    </div>
  )
}
