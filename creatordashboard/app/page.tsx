import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { OutreachSection } from "@/components/outreach-section"
import { GeoOpportunitiesSection } from "@/components/geo-opportunities-section"
import { PaymentHistorySection } from "@/components/payment-history-section"
import { TwilioSegmentSection } from "@/components/twilio-segment-section"
import { SocialMediaAnalyticsSection } from "@/components/social-media-analytics-section"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Welcome, Kay"
        subheading="Your speaking career dashboard puts the world at your fingertips"
      />
      <div className="grid gap-8">
        <OutreachSection />
        <SocialMediaAnalyticsSection />
        <GeoOpportunitiesSection />
        <PaymentHistorySection />
        <TwilioSegmentSection />
      </div>
    </DashboardShell>
  )
}
