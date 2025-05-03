import Link from "next/link"
import { BarChart3, Calendar, CreditCard, Globe, Home, MessageSquare, Settings, Users, MapPin } from "lucide-react"

export function DashboardNav() {
  return (
    <nav className="grid items-start gap-4 py-8">
      <Link
        href="/"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light bg-[hsl(var(--apple-blue))] text-white"
      >
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <Link
        href="/opportunities"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light text-muted-foreground hover:bg-[hsl(var(--apple-blue))]/10 hover:text-[hsl(var(--apple-blue))]"
      >
        <Globe className="h-4 w-4" />
        <span>Opportunities</span>
      </Link>
      <Link
        href="/events"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light text-muted-foreground hover:bg-[hsl(var(--apple-blue))]/10 hover:text-[hsl(var(--apple-blue))]"
      >
        <Calendar className="h-4 w-4" />
        <span>Events</span>
      </Link>
      <Link
        href="/audience"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light text-muted-foreground hover:bg-[hsl(var(--apple-blue))]/10 hover:text-[hsl(var(--apple-blue))]"
      >
        <Users className="h-4 w-4" />
        <span>Audience</span>
      </Link>
      <Link
        href="/messages"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light text-muted-foreground hover:bg-[hsl(var(--apple-blue))]/10 hover:text-[hsl(var(--apple-blue))]"
      >
        <MessageSquare className="h-4 w-4" />
        <span>Messages</span>
      </Link>
      <Link
        href="/analytics"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light text-muted-foreground hover:bg-[hsl(var(--apple-blue))]/10 hover:text-[hsl(var(--apple-blue))]"
      >
        <BarChart3 className="h-4 w-4" />
        <span>Analytics</span>
      </Link>
      <Link
        href="/payments"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light text-muted-foreground hover:bg-[hsl(var(--apple-blue))]/10 hover:text-[hsl(var(--apple-blue))]"
      >
        <CreditCard className="h-4 w-4" />
        <span>Payments</span>
      </Link>
      <Link
        href="/locations"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light text-muted-foreground hover:bg-[hsl(var(--apple-blue))]/10 hover:text-[hsl(var(--apple-blue))]"
      >
        <MapPin className="h-4 w-4" />
        <span>Locations</span>
      </Link>
      <Link
        href="/settings"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light text-muted-foreground hover:bg-[hsl(var(--apple-blue))]/10 hover:text-[hsl(var(--apple-blue))]"
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </Link>
    </nav>
  )
}
