import Link from "next/link"
import { Flame } from "lucide-react"

export function MainNav() {
  return (
    <div className="border-b border-[#E5E5E5] dark:border-[#222222]">
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-[hsl(var(--apple-blue))]" />
          <span className="font-light text-xl tracking-tight">CreatorTorch</span>
        </Link>
        <nav className="flex items-center space-x-6 lg:space-x-8 mx-8">
          <Link href="/" className="text-sm font-light transition-colors hover:text-[hsl(var(--apple-blue))]">
            Dashboard
          </Link>
          <Link
            href="/opportunities"
            className="text-sm font-light text-muted-foreground transition-colors hover:text-[hsl(var(--apple-blue))]"
          >
            Opportunities
          </Link>
          <Link
            href="/analytics"
            className="text-sm font-light text-muted-foreground transition-colors hover:text-[hsl(var(--apple-blue))]"
          >
            Analytics
          </Link>
          <Link
            href="/settings"
            className="text-sm font-light text-muted-foreground transition-colors hover:text-[hsl(var(--apple-blue))]"
          >
            Settings
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href="/help"
            className="text-sm font-light text-muted-foreground transition-colors hover:text-[hsl(var(--apple-blue))]"
          >
            Help
          </Link>
        </div>
      </div>
    </div>
  )
}
