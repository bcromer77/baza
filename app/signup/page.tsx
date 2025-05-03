export default function SignUpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center 
justify-center bg-black text-white px-4">
      <nav className="w-full max-w-6xl flex justify-between items-center 
py-6">
        <h1 className="text-xl font-semibold text-white 
tracking-widest">Creator<span 
className="text-fuchsia-500">Torch</span></h1>
        <a
          href="/"
          className="text-sm text-zinc-400 hover:text-white transition"
        >
          Back to Home
        </a>
      </nav>

      <div className="w-full max-w-md p-8 bg-gradient-to-br 
from-zinc-900/80 to-black/80 backdrop-blur-xl border border-zinc-800 
rounded-2xl shadow-[0_0_60px_10px_rgba(255,0,255,0.2)]">
        <h2 className="text-4xl font-extrabold mb-4 text-center 
tracking-tight text-fuchsia-500">Join the Revolution</h2>
        <p className="text-sm text-zinc-400 mb-6 text-center">Be part of 
the CreatorTorch movement. Secure your spot now.</p>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-zinc-900 border border-zinc-700 
rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-zinc-900 border border-zinc-700 
rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-fuchsia-600 hover:bg-fuchsia-700 
text-white font-bold rounded-lg shadow-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-xs text-zinc-400 mt-6 text-center">
          Already joined? <a href="/login" className="text-fuchsia-400 
underline">Log in</a>
        </p>
      </div>
    </main>
  );
}

