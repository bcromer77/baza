"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from 
"@/components/ui/tabs";
import ClientVault from "@/components/agency-hq/ClientVault";
import VoiceIntelligence from "@/components/agency-hq/VoiceIntelligence";
import CampaignDecks from "@/components/agency-hq/CampaignDecks";
import CreatorPitches from "@/components/agency-hq/CreatorPitches";
import ComplianceHub from "@/components/agency-hq/ComplianceHub";

export default function AgencyHQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-white">Agency HQ</h1>
      <Tabs defaultValue="clients">
        <TabsList className="bg-zinc-800 border border-zinc-700 
text-white">
          <TabsTrigger value="clients">🗂 Client Vault</TabsTrigger>
          <TabsTrigger value="voice">🧠 Voice Intelligence</TabsTrigger>
          <TabsTrigger value="decks">📦 Campaign Decks</TabsTrigger>
          <TabsTrigger value="pitches">🤝 Creator Pitches</TabsTrigger>
          <TabsTrigger value="compliance">🔒 Compliance Hub</TabsTrigger>
        </TabsList>
        <TabsContent value="clients"><ClientVault /></TabsContent>
        <TabsContent value="voice"><VoiceIntelligence /></TabsContent>
        <TabsContent value="decks"><CampaignDecks /></TabsContent>
        <TabsContent value="pitches"><CreatorPitches /></TabsContent>
        <TabsContent value="compliance"><ComplianceHub /></TabsContent>
      </Tabs>
    </div>
  );
}

