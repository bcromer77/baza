"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CreatorConnect() {
  const [sdkToken, setSdkToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = 
useState<string[]>([]);
  const [error, setError] = useState("");

  const getSDKToken = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/phyllo/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user_123",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to get SDK token");
      }
      const data = await response.json();
      setSdkToken(data.sdk_token);
    } catch (err) {
      console.error("Error getting SDK token:", err);
      setError("Failed to initialize connection. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (account_id: string, work_platform_id: string, 
user_id: string) => {
    setConnectedAccounts((prev) => [...prev, account_id]);
    fetch("/api/phyllo/save-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_id,
        work_platform_id,
        user_id,
      }),
    });
  };

  return (
    <div className="flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect Your 
Accounts</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Let us listen, not just look. We’ll find you the right gigs based 
on what you say.
      </p>

      {connectedAccounts.length > 0 && (
        <div className="mb-8 w-full max-w-md">
          <h4 className="font-semibold text-gray-900 mb-2">Connected 
Accounts</h4>
          <div className="bg-green-50 p-4 rounded-lg">
            <ul className="list-disc pl-5 text-gray-700">
              {connectedAccounts.map((account, index) => (
                <li key={index}>Account ID: {account}</li>
              ))}
            </ul>
          </div>
          <Link href="/creator-dashboard">
            <button className="mt-4 bg-blue-500 text-white rounded-lg py-2 
px-6 hover:bg-blue-600 transition-all duration-300 hover:glow">
              Go to Dashboard
            </button>
          </Link>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 w-full 
max-w-md">
          {error}
        </div>
      )}

      {!connectedAccounts.length && !sdkToken ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={getSDKToken}
          disabled={isLoading}
          className="bg-blue-500 text-white py-3 px-8 rounded-lg 
font-medium transition-all hover:bg-blue-600 hover:glow 
disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="w-5 h-5 border-2 border-white 
border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2">Connecting...</span>
            </div>
          ) : (
            "Connect Your Accounts"
          )}
        </motion.button>
      ) : (
        <p className="text-gray-600">Connecting...</p>
      )}
    </div>
  );
}
