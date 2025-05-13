"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

type Campaign = {
  title: string;
  roi: string;
  quote: string;
};

const fallbackCampaigns: Campaign[] = [
  { title: "Eco Makeup in UK", roi: "3.2x", quote: "vegan glow" },
  { title: "Lisbon Surf Collab", roi: "2.8x", quote: "surfboard retreat" },
  { title: "Female Speakers Campaign", roi: "3.5x", quote: "confidence is magnetic" },
];

const SmartCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("/api/prism-campaign-agent");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCampaigns(data?.campaigns || fallbackCampaigns);
      } catch (error) {
        console.warn("Using fallback campaigns due to error:", error);
        setCampaigns(fallbackCampaigns);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <Card className="mb-6 shadow-xl">
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2 text-lg font-medium">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Smart Campaign Suggestions
        </div>

        <p className="text-sm text-muted-foreground">
          These campaigns are optimized by Prism for reach, sentiment fit, and ROI.
        </p>

        <div className="mt-2 space-y-2">
          {campaigns === null
            ? [1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-4 w-full rounded bg-muted" />
              ))
            : campaigns.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm"
                >
                  <span className="font-semibold">• {c.title}</span> — ROI {c.roi} <br />
                  <span className="text-xs text-muted-foreground">"{c.quote}"</span>
                </motion.div>
              ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartCampaigns;

