// ~/Downloads/creator-torch-unzipped/app/components/ui/button.tsx
import { cn } from "@/lib/utils"
import React from "react"
export const Button = React.forwardRef(({ className, children, ...props }: any, ref) => (
  <button ref={ref} className={cn("inline-flex items-center px-4 py-2 rounded font-semibold transition", className)} {...props}>
    {children}
  </button>
))
Button.displayName = "Button"
