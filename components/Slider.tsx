"use client";

import { useState } from "react";

const steps = [
  {
    title: "1. Data Collection",
    description:
      "Creator Prism collects intelligence from your content performance, audience reactions, and social platforms.",
    icon: "📡",
  },
  {
    title: "2. Pattern Recognition",
    description:
      "Creator Prism finds monetizable patterns and insights that other platforms leave buried.",
    icon: "🧠",
  },
  {
    title: "3. Geographic Hotspot Analysis",
    description:
      "Creator Prism shows you where your most loyal audience lives—so you know where to host, launch, or scale.",
    icon: "📍",
  },
  {
    title: "4. Opportunity Generation",
    description:
      "With Creator Prism, every insight becomes a clear next step: events, partnerships, products, bookings.",
    icon: "💡",
  },
];

export default function Slider() {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep((prev) => (prev + 1) % steps.length);
  const handlePrev = () => setStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <div className="relative bg-[#111827] border border-gray-800 rounded-2xl p-6 min-h-[340px] w-full max-w-xl shadow-xl transition-all">
      <div className="text-4xl mb-4">{steps[step].icon}</div>
      <h3 className="text-xl font-semibold text-yellow-400 mb-2">
        {steps[step].title}
      </h3>
      <p className="text-gray-300 mb-6 leading-relaxed">
        {steps[step].description}
      </p>

      <div className="absolute bottom-6 right-6 flex items-center space-x-3">
        <button
          onClick={handlePrev}
          className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center"
        >
          ←
        </button>
        <div className="flex space-x-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === step ? "bg-yellow-400 scale-110" : "bg-gray-500"
              }`}
            ></div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center"
        >
          →
        </button>
      </div>
    </div>
  );
}
