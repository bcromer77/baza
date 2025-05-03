// ~/Downloads/creator-torch-unzipped/app/components/ui/badge.tsx
import { cn } from "@/lib/utils"
export function Badge({ className, children, ...props }: any) {
  return <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-medium bg-blue-500 text-white", className)} {...props}>{children}</span>
}
