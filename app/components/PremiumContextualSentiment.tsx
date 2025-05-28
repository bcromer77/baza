"use client";

import React from "react";

type PremiumContextualSentimentProps = {
  sentimentScore: number;
  tone: string;
  topic: string;
};

const PremiumContextualSentiment: React.FC<PremiumContextualSentimentProps> = ({
  sentimentScore,
  tone,
  topic,
}) => {
  return (
    <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500 to-pink-500 text-black shadow-md">
      <h3 className="text-lg font-bold mb-2">Contextual Sentiment</h3>
      <p className="text-sm">
        <strong>Topic:</strong> {topic}
      </p>
      <p className="text-sm">
        <strong>Tone:</strong> {tone}
      </p>
      <p className="text-sm">
        <strong>Sentiment Score:</strong> {sentimentScore}
      </p>
    </div>
  );
};

export default PremiumContextualSentiment;

