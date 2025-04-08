export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col 
items-center justify-center px-6 py-12">
      <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-center">
        See What You Can’t Hear
      </h1>

      <p className="text-lg text-gray-400 text-center mb-10 max-w-xl">
        Creator Torch helps you uncover insights hidden in your social 
content. Monetize smarter. Match faster.
      </p>

      <div className="flex space-x-6 mb-12">
        <a href="/signup" className="px-6 py-3 bg-white text-black 
rounded-xl font-medium hover:bg-gray-200">Sign Up</a>
        <a href="/login" className="px-6 py-3 border border-white 
text-white rounded-xl hover:bg-white hover:text-black">Login</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
        <FeatureCard
          title="MCP™ Engine"
          description="Monitor brand mentions, sentiment, and compliance 
at scale."
        />
        <FeatureCard
          title="Creator Prompts"
          description="Get real-time monetization tips like 'Most of your 
followers are from Cork…'"
        />
        <FeatureCard
          title="Phyllo Integration"
          description="Securely connect TikTok, YouTube, and Instagram to 
your Creator Dashboard."
        />
      </div>
    </main>
  )
}

function FeatureCard({ title, description }: { title: string; description: 
string }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl shadow-md hover:shadow-xl 
transition">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  )
}

