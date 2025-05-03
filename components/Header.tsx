"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <nav className="flex justify-between items-center py-6 px-8 md:px-16">
      <div className="font-bold text-xl">Creator Prism</div>
      <div className="hidden md:flex space-x-10">
        <Link href="#how-it-works" className="hover:text-gray-300 transition">How It Works</Link>
        <Link href="/pricing" className="hover:text-gray-300 transition">Pricing</Link>
        <Link href="/features" className="hover:text-gray-300 transition">Features</Link>
        <Link href="/login" className="hover:text-gray-300 transition">Log In</Link>
      </div>
      <Link 
        href="/signup" 
        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-medium transition"
      >
        Sign Up
      </Link>
    </nav>
  );
}