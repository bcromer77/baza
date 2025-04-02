"use client";

import Link from "next/link";
import { ArrowRight, Users, BarChart2, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900">CreatorTorch🔥</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/demo" className="text-gray-600 hover:text-blue-500 transition-all duration-300 hover:glow">
            Demo
          </Link>
          <Link href="/creator-dashboard" className="text-gray-600 hover:text-blue-500 transition-all duration-300 hover:glow">
            Creator Dashboard
          </Link>
          <Link
            href="/join"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium transition-all hover:bg-blue-600 hover:glow"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-24 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Connect Brands with the Perfect Creators</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          CreatorTorch is the world’s first influencer platform that connects brands and creators based on what creators are actually saying, not likes or follows.
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
          We’re building a new standard of influence—one that puts authentic voice first.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/join"
            className="bg-blue-500 text-white py-3 px-8 rounded-lg font-medium transition-all hover:bg-blue-600 hover:glow flex items-center"
          >
            Join as a Creator <ArrowRight size={16} className="ml-2" />
          </Link>
          <Link
            href="/find-creators"
            className="bg-white text-gray-800 border border-gray-300 py-3 px-8 rounded-lg font-medium transition-all hover:shadow-lg"
          >
            Find Creators
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How CreatorTorch Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <Users size={24} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Speak Your Truth</h3>
            <p className="text-gray-600">
              Creators: Connect once and get discovered for what you actually say, not tags or algorithms.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <BarChart2 size={24} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Real Voice Matching</h3>
            <p className="text-gray-600">
              Brands: Find creators based on their real voice, across languages, cities, and vibes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <Zap size={24} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Automatic Connections</h3>
            <p className="text-gray-600">
              Get matched automatically with the right brands or creators, with no endless searching.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-blue-500 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join CreatorTorch today and connect based on authentic voice.
          </p>
          <Link
            href="/join"
            className="bg-white text-blue-500 py-3 px-8 rounded-lg font-medium transition-all hover:shadow-lg hover:glow inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}
