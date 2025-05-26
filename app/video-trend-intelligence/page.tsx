"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dummyTrends = [
  {
    title: "Lisbon Beach Retreat",
    mentionCount: 45,
    peakSentiment: 0.8,
    videoCount: 12,
  },
  {
    title: "Bali Wellness Retreat",
    mentionCount: 30,
    peakSentiment: 0.9,
    videoCount: 8,
  },
  {
    title: "Confidence Coaching",
    mentionCount: 25,
    peakSentiment: 0.7,
    videoCount: 10,
  },
];

export default function VideoTrendIntelligence() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Video Trend Intelligence</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dummyTrends.map((trend, idx) => (
          <Card key={idx} className="bg-zinc-900 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{trend.title}</h3>
            <p className="text-zinc-300 mt-2">Mentions: {trend.mentionCount}</p>
            <p className="text-zinc-300">Peak Sentiment: {trend.peakSentiment}</p>
            <p className="text-zinc-400">Videos: {trend.videoCount}</p>
          </Card>
        ))}
      </div>

      <div className="mt-4">
        <Button
          variant="outline"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </Button>
      </div>

      {showMore && (
        <p className="text-zinc-400 mt-2">
          These trends were extracted from recent creator videos using our sentiment and topic proximity models.
        </p>
      )}
    </div>
  );
}

