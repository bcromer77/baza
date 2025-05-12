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

