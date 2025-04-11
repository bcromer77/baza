"use client";

import Link from "next/link";

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
          Ready to Create Your Prism?
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Join Creator Torch and unlock hidden opportunities from your audience. 
          Our AI reveals where, when, and how to monetize smarter.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            href="/signup/creator"
            className="bg-white text-black font-semibold px-6 py-3 rounded-2xl hover:bg-gray-200 transition"
          >
            I’m a Creator
          </Link>

          <Link
            href="/signup/brand"
            className="border border-white px-6 py-3 rounded-2xl text-white hover:bg-white hover:text-black transition"
          >
            I’m a Brand
          </Link>

          <Link
            href="/signup/agency"
            className="text-sm text-gray-400 mt-4 md:mt-0 hover:underline"
          >
            I’m an Agency →
          </Link>
        </div>
      </div>
    </div>
  );
}