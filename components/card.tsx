// ~/Downloads/creator-torch-unzipped/app/components/ui/card.tsx
import { cn } from "@/lib/utils"
export function Card({ className, children, ...props }: any) {
  return <div className={cn("rounded-2xl shadow-md bg-white/5 p-4", className)} {...props}>{children}</div>
}
export function CardHeader({ className, children, ...props }: any) {
  return <div className={cn("mb-2", className)} {...props}>{children}</div>
}
export function CardTitle({ className, children, ...props }: any) {
  return <div className={cn("text-lg font-bold", className)} {...props}>{children}</div>
}
export function CardContent({ className, children, ...props }: any) {
  return <div className={cn("text-base", className)} {...props}>{children}</div>
}
