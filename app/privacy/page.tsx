// File: app/privacy/page.tsx

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>

        <p className="text-zinc-400">
          At Audiantix, your privacy is a priority. This policy outlines what information we collect, how we use it, and your rights.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold">1. Data We Collect</h2>
            <p className="text-zinc-400">When you sign up, we collect your name, email, and account type. If you're a creator, we also collect public content from your connected platforms and 
audio transcripts (with your consent).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. How We Use Data</h2>
            <p className="text-zinc-400">We use your data to improve match accuracy, personalize recommendations, and power Prism and RAG systems. We do not sell your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Your Rights</h2>
            <p className="text-zinc-400">You can export or delete your data anytime. Just email support@audiantix.com with your request.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. GDPR & CCPA</h2>
            <p className="text-zinc-400">We are GDPR-compliant and provide CCPA-level opt-out options for all users. No profiling, tracking, or third-party resale.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Stripe & Phyllo</h2>
            <p className="text-zinc-400">Payments are handled securely via Stripe. Social and financial data from Phyllo is only accessed with user permission and never shared externally.</p>
          </section>
        </div>

        <footer className="pt-12 text-sm text-zinc-600">
          Last updated: May 2025 — contact us at privacy@audiantix.com
        </footer>
      </div>
    </div>
  )
}

