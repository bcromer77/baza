"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhylloConnect from "@/components/phyllo-connect";

export default function JoinPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [persona, setPersona] = useState<"creator" | "brand">("creator");
  const [sdkToken, setSdkToken] = useState("");
  const [phylloReady, setPhylloReady] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, persona })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("phyllo_user_id", data.userId);
        setSdkToken(data.sdk_token || "mock_sdk_token");
        setPhylloReady(true);

        setTimeout(() => {
          router.push(`/creator-studio?user_id=${data.userId}`);
        }, 3000);
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong while signing up.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Join Audiantix</h1>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 rounded bg-zinc-800 text-white placeholder-zinc-500"
        />

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded bg-zinc-800 text-white placeholder-zinc-500"
        />

        <select
          value={persona}
          onChange={(e) => setPersona(e.target.value as any)}
          className="w-full p-3 rounded bg-zinc-800 text-white"
        >
          <option value="creator">I'm a Creator</option>
          <option value="brand">I'm a Brand</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-amber-400 to-pink-500 text-black rounded-lg font-semibold"
        >
          Join Now
        </button>
      </form>

      {phylloReady && (
        <PhylloConnect
          sdkToken={sdkToken}
          onSuccess={() => console.log("Phyllo success")}
        />
      )}
    </div>
  );
}

