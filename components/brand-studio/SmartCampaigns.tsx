"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const SmartCampaigns = () => {
  return (
    <Card className="mb-6 shadow-xl">
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-lg font-medium">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Smart Campaign Suggestions
        </div>
        <p className="text-sm text-muted-foreground">
          Based on your budget and creator fit, we suggest 3 ready-to-launch campaigns:
        </p>
        <ul className="list-disc pl-5 text-sm">
          <li>🌿 Eco Makeup in UK — ROI 3.2x</li>
          <li>🏄 Lisbon Surf Collab — 14 mentions last week</li>
          <li>💬 Female Speakers in Wellness — High trust signals</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default SmartCampaigns;

