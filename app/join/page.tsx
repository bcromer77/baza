"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhylloConnect from "@/components/phyllo-connect";

export default function JoinPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");
  const [sdkToken, setSdkToken] = useState("");
  const [phylloReady, setPhylloReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          phoneNumber,
          instagram,
          tiktok,
          youtube,
        }),
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
        alert(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong.");
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 rounded bg-zinc-800 text-white placeholder-zinc-500"
        />

        <input
          type="text"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="w-full p-3 rounded bg-zinc-800 text-white placeholder-zinc-500"
        />

        <input
          type="url"
          placeholder="Instagram URL"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 text-white placeholder-zinc-500"
        />

        <input
          type="url"
          placeholder="TikTok URL"
          value={tiktok}
          onChange={(e) => setTiktok(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 text-white placeholder-zinc-500"
        />

        <input
          type="url"
          placeholder="YouTube URL"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 text-white placeholder-zinc-500"
        />

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
          onSuccess={() => console.log("✅ Phyllo onboarding complete")}
        />
      )}
    </div>
  );
}

