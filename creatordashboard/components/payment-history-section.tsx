"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  Calendar,
  Building,
  ArrowUpRight,
  Download,
  Filter,
  CreditCard,
  PieChart,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock Stripe Connect payment data
const paymentData = [
  {
    id: "ch_3NpKs2CZ6qsJgndp0MYwKMVZ",
    amount: 3500,
    date: "Apr 2, 2025",
    status: "completed",
    client: "Hilton Paris Opera",
    event: "Executive Confidence Workshop",
    paymentMethod: "Stripe Connect",
    fee: 105,
    netAmount: 3395,
    invoiceUrl: "#",
  },
  {
    id: "ch_3NpJd8CZ6qsJgndp0KjYwLmN",
    amount: 2800,
    date: "Mar 28, 2025",
    status: "completed",
    client: "Women in Tech Conference",
    event: "Keynote Speech",
    paymentMethod: "Stripe Connect",
    fee: 84,
    netAmount: 2716,
    invoiceUrl: "#",
  },
  {
    id: "ch_3NpHs5CZ6qsJgndp0BxZkPqR",
    amount: 1500,
    date: "Mar 15, 2025",
    status: "completed",
    client: "Corporate Minds Inc.",
    event: "Leadership Workshop",
    paymentMethod: "Stripe Connect",
    fee: 45,
    netAmount: 1455,
    invoiceUrl: "#",
  },
  {
    id: "ch_3NpFt7CZ6qsJgndp0AzXjNpT",
    amount: 2200,
    date: "Mar 10, 2025",
    status: "completed",
    client: "Marriott Barcelona",
    event: "Public Speaking Masterclass",
    paymentMethod: "Stripe Connect",
    fee: 66,
    netAmount: 2134,
    invoiceUrl: "#",
  },
  {
    id: "ch_3NpDr9CZ6qsJgndp0YxWiMvS",
    amount: 1800,
    date: "Feb 28, 2025",
    status: "completed",
    client: "Global Leaders Summit",
    event: "Panel Moderation",
    paymentMethod: "Stripe Connect",
    fee: 54,
    netAmount: 1746,
    invoiceUrl: "#",
  },
]

// Mock upcoming payments
const upcomingPayments = [
  {
    id: "inv_3NqLt3CZ6qsJgndp0NzYxLvT",
    amount: 4000,
    dueDate: "Apr 20, 2025",
    status: "pending",
    client: "Four Seasons Hotel Lisbon",
    event: "Women in Leadership Seminar",
    paymentMethod: "Stripe Connect",
    estimatedFee: 120,
    estimatedNet: 3880,
    invoiceUrl: "#",
  },
  {
    id: "inv_3NqKs5CZ6qsJgndp0MxXkOuS",
    amount: 3200,
    dueDate: "May 5, 2025",
    status: "pending",
    client: "Tech Innovators Conference",
    event: "Confidence in Public Speaking Workshop",
    paymentMethod: "Stripe Connect",
    estimatedFee: 96,
    estimatedNet: 3104,
    invoiceUrl: "#",
  },
]

// Mock payout schedule
const payoutSchedule = [
  {
    id: "po_3NrMt4CZ6qsJgndp0OzZyMwU",
    amount: 11800,
    date: "Apr 15, 2025",
    status: "scheduled",
    description: "Automatic monthly payout",
    accountType: "Business checking",
    accountLast4: "4567",
  },
  {
    id: "po_3NqLs3CZ6qsJgndp0NyYxLvT",
    amount: 9450,
    date: "Mar 15, 2025",
    status: "completed",
    description: "Automatic monthly payout",
    accountType: "Business checking",
    accountLast4: "4567",
  },
]

export function PaymentHistorySection() {
  const [timeframe, setTimeframe] = useState("all")
  const [activeTab, setActiveTab] = useState("completed")

  const filteredPayments =
    timeframe === "all"
      ? paymentData
      : timeframe === "month"
        ? paymentData.filter((p) => p.date.includes("Mar") || p.date.includes("Apr"))
        : paymentData.slice(0, 2)

  const totalEarned = paymentData.reduce((sum, payment) => sum + payment.amount, 0)
  const totalFees = paymentData.reduce((sum, payment) => sum + payment.fee, 0)
  const netEarned = totalEarned - totalFees
  const pendingAmount = upcomingPayments.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <Card className="overflow-hidden border border-[#E5E5E5] shadow-sm rounded-xl">
      <CardHeader className="apple-gradient-green text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl font-light">
              <DollarSign className="h-5 w-5" />
              Financial Hub
            </CardTitle>
            <CardDescription className="text-white/90 font-light">
              Powered by Stripe Connect and MongoDB Analytics
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 text-sm"
            onClick={() => (window.location.href = "/integrations/stripe/settings")}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Stripe Connected
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="border border-[#E5E5E5] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-muted-foreground">Net Earnings</p>
                <p className="text-3xl font-light text-[hsl(var(--apple-green))]">€{netEarned.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">After Stripe fees (€{totalFees})</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[hsl(var(--apple-green))]/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-[hsl(var(--apple-green))]" />
              </div>
            </div>
          </Card>

          <Card className="border border-[#E5E5E5] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-muted-foreground">Pending Payments</p>
                <p className="text-3xl font-light text-[hsl(var(--apple-orange))]">€{pendingAmount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Across {upcomingPayments.length} invoices</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[hsl(var(--apple-orange))]/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-[hsl(var(--apple-orange))]" />
              </div>
            </div>
          </Card>

          <Card className="border border-[#E5E5E5] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-muted-foreground">Next Payout</p>
                <p className="text-3xl font-light text-[hsl(var(--apple-blue))]">
                  €{payoutSchedule[0].amount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Scheduled for {payoutSchedule[0].date}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[hsl(var(--apple-blue))]/10 flex items-center justify-center">
                <ArrowUpRight className="h-5 w-5 text-[hsl(var(--apple-blue))]" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <Card className="border border-[#E5E5E5] rounded-xl overflow-hidden h-full">
              <div className="p-4 border-b border-[#E5E5E5] bg-[#F9F9F9] flex justify-between items-center">
                <h3 className="font-medium">Revenue Trends</h3>
                <Badge className="bg-[hsl(var(--apple-green))] text-white">+18% MoM</Badge>
              </div>
              <div className="p-4 h-[200px] flex items-center justify-center">
                <BarChart3 className="h-32 w-32 text-[hsl(var(--apple-blue))]" />
              </div>
            </Card>
          </div>

          <div>
            <Card className="border border-[#E5E5E5] rounded-xl overflow-hidden h-full">
              <div className="p-4 border-b border-[#E5E5E5] bg-[#F9F9F9]">
                <h3 className="font-medium">Revenue Sources</h3>
              </div>
              <div className="p-4 h-[200px] flex items-center justify-center">
                <PieChart className="h-32 w-32 text-[hsl(var(--apple-green))]" />
              </div>
            </Card>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          {activeTab !== "payouts" && (
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                <Filter className="h-3 w-3" />
                <span>{timeframe === "all" ? "All Time" : timeframe === "month" ? "This Month" : "Recent"}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTimeframe(timeframe === "all" ? "month" : timeframe === "month" ? "recent" : "all")}
                className="text-xs"
              >
                Change
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="completed" onValueChange={setActiveTab}>
          <TabsList className="bg-[#F0F0F0] dark:bg-[#222222] mb-4">
            <TabsTrigger value="completed" className="font-light">
              Completed
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="font-light">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="payouts" className="font-light">
              Payouts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="completed" className="space-y-4">
            <div className="rounded-xl border border-[#E5E5E5] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5]">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium">Event</th>
                    <th className="text-left p-3 text-sm font-medium">Client</th>
                    <th className="text-left p-3 text-sm font-medium">Date</th>
                    <th className="text-left p-3 text-sm font-medium">Amount</th>
                    <th className="text-left p-3 text-sm font-medium">Net</th>
                    <th className="text-left p-3 text-sm font-medium">Status</th>
                    <th className="text-left p-3 text-sm font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-[#E5E5E5] last:border-0">
                      <td className="p-3 text-sm">{payment.event}</td>
                      <td className="p-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-[hsl(var(--apple-blue))]" />
                          {payment.client}
                        </div>
                      </td>
                      <td className="p-3 text-sm">{payment.date}</td>
                      <td className="p-3 text-sm">€{payment.amount.toLocaleString()}</td>
                      <td className="p-3 text-sm">€{payment.netAmount.toLocaleString()}</td>
                      <td className="p-3 text-sm">
                        <Badge className="bg-[hsl(var(--apple-green))] text-white">{payment.status}</Badge>
                      </td>
                      <td className="p-3 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => window.open(`/invoices/${payment.id}`, "_blank")}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="rounded-xl border border-[#E5E5E5] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5]">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium">Event</th>
                    <th className="text-left p-3 text-sm font-medium">Client</th>
                    <th className="text-left p-3 text-sm font-medium">Due Date</th>
                    <th className="text-left p-3 text-sm font-medium">Amount</th>
                    <th className="text-left p-3 text-sm font-medium">Est. Net</th>
                    <th className="text-left p-3 text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-[#E5E5E5] last:border-0">
                      <td className="p-3 text-sm">{payment.event}</td>
                      <td className="p-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-[hsl(var(--apple-blue))]" />
                          {payment.client}
                        </div>
                      </td>
                      <td className="p-3 text-sm">{payment.dueDate}</td>
                      <td className="p-3 text-sm">€{payment.amount.toLocaleString()}</td>
                      <td className="p-3 text-sm">€{payment.estimatedNet.toLocaleString()}</td>
                      <td className="p-3 text-sm">
                        <Badge className="bg-[hsl(var(--apple-orange))] text-white">{payment.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="payouts" className="space-y-4">
            <div className="rounded-xl border border-[#E5E5E5] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5]">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium">Payout ID</th>
                    <th className="text-left p-3 text-sm font-medium">Date</th>
                    <th className="text-left p-3 text-sm font-medium">Amount</th>
                    <th className="text-left p-3 text-sm font-medium">Account</th>
                    <th className="text-left p-3 text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutSchedule.map((payout) => (
                    <tr key={payout.id} className="border-b border-[#E5E5E5] last:border-0">
                      <td className="p-3 text-sm">{payout.id}</td>
                      <td className="p-3 text-sm">{payout.date}</td>
                      <td className="p-3 text-sm">€{payout.amount.toLocaleString()}</td>
                      <td className="p-3 text-sm">
                        {payout.accountType} •••• {payout.accountLast4}
                      </td>
                      <td className="p-3 text-sm">
                        <Badge
                          className={
                            payout.status === "completed"
                              ? "bg-[hsl(var(--apple-green))] text-white"
                              : "bg-[hsl(var(--apple-blue))] text-white"
                          }
                        >
                          {payout.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-[#E5E5E5] p-4 bg-[#F9F9F9]">
              <h3 className="text-base font-medium mb-3">Stripe Connect Integration</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Your Stripe Connect account is fully integrated with MongoDB for financial analytics and reporting.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-[hsl(var(--apple-green))] mt-0.5" />
                  <span>Automatic payouts on the 15th of each month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CreditCard className="h-4 w-4 text-[hsl(var(--apple-blue))] mt-0.5" />
                  <span>3% platform fee + Stripe's standard 2.9% + €0.30 per transaction</span>
                </li>
                <li className="flex items-start gap-2">
                  <BarChart3 className="h-4 w-4 text-[hsl(var(--apple-orange))] mt-0.5" />
                  <span>Real-time financial analytics powered by MongoDB</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
