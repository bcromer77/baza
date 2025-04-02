"use client";

import React, { useState, useEffect } from "react";

export default function CreatorTorchDashboard() {
  const [brandVision, setBrandVision] = useState("");
  const [creators, setCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCreators = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch("/api/creators", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch creators");
        const data = await response.json();
        setCreators(data.creators || []);
      } catch (err) {
        setError("Failed to load creators—try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreators();
  }, []);

  const handleFindCreators = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/creators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandVision }),
      });
      if (!response.ok) throw new Error("Failed to fetch creators");
      const data = await response.json();
      setCreators(data.creators || []);
    } catch (err) {
      setError("Failed to find creators—try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPlatformInfo = (platformId: string) => {
    const platforms = {
      youtube: { name: "YouTube", icon: "🎥", color: "text-red-700" },
      instagram: { name: "Instagram", icon: "📸", color: "text-pink-700" },
      tiktok: { name: "TikTok", icon: "🎵", color: "text-black" },
      default: { name: "Platform", icon: "🔗", color: "text-gray-700" },
    };
    return platforms[platformId.toLowerCase()] || platforms.default;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-black mb-8 tracking-tight">
        CreatorTorch
      </h1>
      <p className="text-lg text-gray-700 mb-12 max-w-md text-center">
        Your brand. Their story. One click.
      </p>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-semibold text-black mb-6">
          Tell Us Your Vision
        </h2>
        <form onSubmit={handleFindCreators}>
          <input
            type="text"
            placeholder="What’s your brand about?"
            value={brandVision}
            onChange={(e) => setBrandVision(e.target.value)}
            className="w-full p-4 text-lg border-none rounded-lg bg-gray-100 mb-6 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white text-lg font-medium py-4 rounded-lg hover:bg-gray-900 transition-all disabled:opacity-50"
          >
            {isLoading ? "Finding Creators..." : "Find My Creators"}
          </button>
        </form>
      </div>

      {error && (
        <div className="mt-6 w-full max-w-2xl bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="mt-12 w-full max-w-2xl">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-gray-600">Loading creators...</span>
          </div>
        ) : creators.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-6 shadow-lg text-center">
            <p className="text-gray-600">No creators found. Try adjusting your vision.</p>
          </div>
        ) : (
          creators.map((creator: any) => {
            const platform = getPlatformInfo(creator.work_platform_id || "default");
            return (
              <div key={creator.account_id} className="bg-gray-50 rounded-2xl p-6 shadow-lg mb-4">
                <div className="flex items-center mb-2">
                  <span className={`text-base mr-3 ${platform.color}`}>{platform.icon}</span>
                  <h3 className="text-xl font-bold text-black">{creator.username || "@creator"}</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  “{creator.bio || "Passionate creator ready to collaborate."}”
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Fit: {creator.fit || "90"}% | Engagement: 🌟 {creator.engagement || "High"} | Followers: {creator.followers?.toLocaleString() || "N/A"}
                  </p>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm">
                    Collaborate
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
