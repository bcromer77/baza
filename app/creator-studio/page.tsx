"use client";

import React, { useState, useEffect } from "react";

export default function CreatorStudioPage() {
  const [creator, setCreator] = useState<any>(null);

  // Fetch creator data when component mounts
  useEffect(() => {
    setTimeout(() => {
      setCreator({
        name: "Ana Silva",
        avatar: "/avatars/ana.png",
        followers: "22k",
        niche: "Travel",
        quote: "Surfing Nazaré changed my life—let’s make magic on the beach.",
        matchedBrands: [
          { name: "SnapGear", logo: "/brands/snapgear.png" },
          { name: "ExploreNazaré", logo: "/brands/explorenazare.png" }
        ],
      });
    }, 800);
  }, []);

  if (!creator) return <div className="text-center mt-12 text-xl text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <img src={creator.avatar} alt={creator.name} className="w-32 h-32 rounded-full border-4 border-blue-500/50 object-cover mb-4" />
          <h2 className="text-2xl font-bold mb-1">{creator.name}</h2>
          <p className="mb-2 text-gray-400">{creator.followers} Followers</p>
          <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold mb-3">{creator.niche}</span>
          <blockquote className="italic text-gray-200 mb-4">"{creator.quote}"</blockquote>
          <div className="flex gap-3 mb-4">
            {creator.matchedBrands.map((brand: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-700 rounded-full px-3 py-1">
                <img src={brand.logo} alt={brand.name} className="w-6 h-6 object-contain" />
                <span className="text-sm text-white">{brand.name}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 px-5 py-2 bg-amber-500 rounded-full text-lg font-semibold hover:bg-amber-600 transition">
            Create Opportunity
          </button>
        </div>
      </div>
    </div>
  );
}

