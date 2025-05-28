"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function JoinAgency() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white flex flex-col items-center justify-center px-6 py-16">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Join Audiantix as an Agency
      </motion.h1>

      <motion.p
        className="text-zinc-300 text-center max-w-xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Manage creators. Discover brand deals. Let us turn your roster into revenue — automatically.
      </motion.p>

      <form className="w-full max-w-md space-y-4">
        <Input
          type="text"
          placeholder="Agency Name"
          className="bg-zinc-900 text-white"
        />
        <Input
          type="text"
          placeholder="Your Name"
          className="bg-zinc-900 text-white"
        />
        <Input
          type="email"
          placeholder="Work Email"
          className="bg-zinc-900 text-white"
        />
        <Input
          type="password"
          placeholder="Create a Password"
          className="bg-zinc-900 text-white"
        />
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-black rounded-full"
        >
          Create Agency Account
        </Button>
      </form>

      <div className="mt-12 text-sm text-zinc-500">
        Already have an account?{" "}
        <a href="/login" className="underline">
          Log in
        </a>
      </div>
    </main>
  );
}

