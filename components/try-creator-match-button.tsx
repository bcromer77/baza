"use client"
import Link from "next/link"

export default function TryBeautyMatchButton() {
  return (
    <Link href="/beauty-match">
      <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-200 tracking-wide">
        ✨ Find Your Match
      </button>
    </Link>
  )
}

