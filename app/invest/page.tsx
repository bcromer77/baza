export default function InvestorPage() {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6">Why Invest in Creator Torch?</h1>
  
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">📸 What We Are</h2>
          <p>Creator Torch is the Polaroid of influence—snapshots of audience trust, monetized.</p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">🚀 How It Works</h2>
          <ul className="list-disc ml-6">
            <li>We listen to creators’ real audience engagement.</li>
            <li>We score compliance, trends, and intent in seconds.</li>
            <li>We match creators with brand-safe offers, instantly.</li>
          </ul>
        </section>
  
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">🔥 Why Now</h2>
          <p>
            Creators struggle to monetize. Brands struggle to find risk-free, authentic partnerships. The shift to compliance-first influence is happening now.
          </p>
        </section>
  
        <a
          href="/app/creator-dashboard/page?id=YOUR_CREATOR_ID"
          className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-300 transition"
        >
          🔍 Watch the Live Demo
        </a>
      </div>
    );
  }
  