"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from 
"@/components/ui/tabs";
import MonetizeMe from "@/components/creator-studio/MonetizeMe";
import DiscoveryFeed from "@/components/creator-studio/DiscoveryFeed";
import EventsDashboard from "@/components/creator-studio/EventsDashboard";
import InsightsPanel from "@/components/creator-studio/InsightsPanel";
import EarningsCenter from "@/components/creator-studio/EarningsCenter";

export default function CreatorStudioPage() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const returnedUserId = searchParams.get("user_id");
    const localUserId = localStorage.getItem("phyllo_user_id");

    if (returnedUserId) {
      localStorage.setItem("phyllo_user_id", returnedUserId);
      setUserId(returnedUserId);
    } else if (localUserId) {
      setUserId(localUserId);
    }

    setLoading(false);
  }, [searchParams]);

  if (loading) return <div className="p-10 text-lg text-white">Loading 
your studio...</div>;

  if (!userId) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col 
items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Authentication 
Required</h1>
        <p className="text-zinc-400 mb-6">We couldn’t detect your creator 
ID. Please go through the onboarding flow again.</p>
        <a href="/">
          <button className="bg-gradient-to-r from-amber-400 to-pink-500 
text-black px-6 py-3 rounded-full">
            Go Back Home
          </button>
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-white">Creator 
Studio</h1>
      <Tabs defaultValue="monetize">
        <TabsList className="bg-zinc-800 border border-zinc-700 
text-white">
          <TabsTrigger value="monetize">💡 Monetize Me</TabsTrigger>
          <TabsTrigger value="discover">🔍 Discovery</TabsTrigger>
          <TabsTrigger value="events">📅 Events</TabsTrigger>
          <TabsTrigger value="insights">📊 Insights</TabsTrigger>
          <TabsTrigger value="earnings">💰 Earnings</TabsTrigger>
        </TabsList>
        <TabsContent value="monetize">
          <MonetizeMe />
        </TabsContent>
        <TabsContent value="discover">
          <DiscoveryFeed />
        </TabsContent>
        <TabsContent value="events">
          <EventsDashboard />
        </TabsContent>
        <TabsContent value="insights">
          <InsightsPanel />
        </TabsContent>
        <TabsContent value="earnings">
          <EarningsCenter />
        </TabsContent>
      </Tabs>
    </div>
  );
}

