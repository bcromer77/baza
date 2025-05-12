// File: app/terms/page.tsx

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Terms of Service</h1>

        <p className="text-zinc-400">
          These terms govern your use of Audiantix. By signing up, browsing, or booking, you agree to these terms.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold">1. Eligibility</h2>
            <p className="text-zinc-400">You must be 18 or older and have the authority to represent a creator, brand, or agency.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. Platform Use</h2>
            <p className="text-zinc-400">You may not resell, scrape, or misuse any data, insights, or features of the Audiantix platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Content & Conduct</h2>
            <p className="text-zinc-400">You’re responsible for your uploaded content and must not post anything illegal, offensive, or misleading.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Payments</h2>
            <p className="text-zinc-400">Stripe Connect is used for all payouts. Audiantix takes a service fee per transaction based on your pricing tier.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Termination</h2>
            <p className="text-zinc-400">We reserve the right to suspend or terminate any account for violation of these terms or misuse of the platform.</p>
          </section>
        </div>

        <footer className="pt-12 text-sm text-zinc-600">
          Last updated: May 2025 — contact legal@audiantix.com for more info.
        </footer>
      </div>
    </div>
  )
}

