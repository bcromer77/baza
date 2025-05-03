"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function BrandStudioResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    fetch(`/api/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error("Search error:", err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-amber-400">
        Results for: "{query}"
      </h1>

      {loading ? (
        <p className="text-gray-400">Listening for creators...</p>
      ) : results.length === 0 ? (
        <p className="text-red-400">No matching creators found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 
md:grid-cols-3">
          {results.map((creator, i) => (
            <motion.div
              key={creator._id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="bg-zinc-900 border border-zinc-700 
shadow-md">
                <CardContent className="p-6 space-y-3">
                  <p className="text-lg font-semibold">{creator.name}</p>
                  {creator.voiceHighlights?.map((vh, idx) => (
                    <div
                      key={idx}
                      className="bg-zinc-800 p-3 rounded-md text-sm 
space-y-1"
                    >
                      <p>“{vh.quote}”</p>
                      <p className="text-gray-400">Topic: {vh.topic}</p>
                      <p className="text-gray-400">Tone: {vh.tone}</p>
                      <p className="text-gray-400">Sentiment: 
{vh.sentiment}</p>
                    </div>
                  ))}
                  <button className="mt-2 bg-amber-500 text-black px-4 
py-2 rounded-md hover:bg-amber-600">
                    Turn Into Campaign
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}

