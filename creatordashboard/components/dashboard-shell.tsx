import type React from "react"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/dashboard-nav"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] dark:bg-[#111111]">
      <MainNav />
      <div className="container grid flex-1 gap-12 md:grid-cols-[220px_1fr]">
        <aside className="hidden w-[220px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-8 p-8 pt-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
