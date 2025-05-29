import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Hero() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"brand" | "creator">("brand");

  return (
    <section
      className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 text-center"
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {mode === "brand" ? "Listen. Don't Guess." : "Say It. Get Found."}
      </motion.h1>

      <motion.p
        className="mt-4 text-lg md:text-xl text-gray-400 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {mode === "brand"
          ? "See what creators are already talking about before you spend a cent."
          : "Audiantix scans your voice content so the right brands find you."}
      </motion.p>

      <div className="mt-8 w-full max-w-xl bg-zinc-900 rounded-xl border border-zinc-700 shadow-xl">
        <div className="flex items-center px-4 py-3">
          <Search className="text-yellow-400 mr-2" />
          <Input
            className="flex-grow bg-transparent border-none text-white placeholder-gray-400"
            placeholder={
              mode === "brand"
                ? "Find creators talking about: Lisbon surf houses"
                : "What do you talk about in your content?"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button className="ml-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-black">
            {mode === "brand" ? "Reveal Creators" : "Join Now"}
          </Button>
        </div>

        <div className="flex justify-around py-3 border-t border-zinc-800">
          <Button
            variant={mode === "creator" ? "default" : "ghost"}
            className="rounded-full px-4"
            onClick={() => setMode("creator")}
          >
            I'm a Creator
          </Button>
          <Button
            variant={mode === "brand" ? "default" : "ghost"}
            className="rounded-full px-4"
            onClick={() => setMode("brand")}
          >
            I'm a Brand
          </Button>
        </div>
      </div>

      <motion.div
        className="mt-12 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {mode === "brand"
          ? "Powered by /server/routes/search.js and Prism Engine"
          : "Your voice connects to opportunities via /transcribe + /stripe"}
      </motion.div>
    </section>
  );
}

