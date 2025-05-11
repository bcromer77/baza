"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from 
"@/components/ui/tabs";
import SearchCreators from "@/components/brand-studio/SearchCreators";
import SmartCampaigns from "@/components/brand-studio/SmartCampaigns";
import Shortlist from "@/components/brand-studio/Shortlist";
import Bookings from "@/components/brand-studio/Bookings";
import ROINexus from "@/components/brand-studio/ROINexus";

export default function BrandStudioPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-white">Brand Studio</h1>
      <Tabs defaultValue="search">
        <TabsList className="bg-zinc-800 border border-zinc-700 
text-white">
          <TabsTrigger value="search">🔍 Search Creators</TabsTrigger>
          <TabsTrigger value="campaigns">🧠 Smart Campaigns</TabsTrigger>
          <TabsTrigger value="shortlist">📋 Shortlist</TabsTrigger>
          <TabsTrigger value="bookings">🧾 Bookings</TabsTrigger>
          <TabsTrigger value="roi">📈 ROI Nexus</TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <SearchCreators />
        </TabsContent>
        <TabsContent value="campaigns">
          <SmartCampaigns />
        </TabsContent>
        <TabsContent value="shortlist">
          <Shortlist />
        </TabsContent>
        <TabsContent value="bookings">
          <Bookings />
        </TabsContent>
        <TabsContent value="roi">
          <ROINexus />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// File: components/brand-studio/SearchCreators.tsx
import React from "react";

export default function SearchCreators() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-4">Voice-First Creator 
Search</h2>
      <p>🗣️ Try: “Mentions Bali wellness retreats with excited tone”</p>
      <p>🎯 Filter by: Sentiment, Topics, Engagement Rate</p>
    </div>
  );
}

// File: components/brand-studio/SmartCampaigns.tsx
import React from "react";

export default function SmartCampaigns() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-4">AI Campaign Builder</h2>
      <p>🤖 Campaign Idea: “10 creators mentioned Tulum this week. Want to 
offer a surf + villa package?”</p>
      <p>📦 Click to package + generate ROI estimate</p>
    </div>
  );
}

// File: components/brand-studio/Shortlist.tsx
import React from "react";

export default function Shortlist() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-4">Your Saved Creators</h2>
      <p>📍 Lena – Food Tourism | Lisbon | Passionate</p>
      <p>📍 Jamal – Cultural Explorer | Marrakech | Adventurous</p>
    </div>
  );
}

// File: components/brand-studio/Bookings.tsx
import React from "react";

export default function Bookings() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-4">Your Active 
Bookings</h2>
      <p>✅ Tulum Retreat with Sophia — €4,800 paid</p>
      <p>🔄 Lisbon Villa with Elena — In progress</p>
    </div>
  );
}

// File: components/brand-studio/ROINexus.tsx
import React from "react";

export default function ROINexus() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-4">ROI & Campaign 
Performance</h2>
      <p>📈 Tulum Retreat ROI: 3.4x | CTR: 9% | Sentiment Shift: +21%</p>
      <p>📊 Brand Mentions Trend: “Bali” up 47% last 10 days</p>
    </div>
  );
}

