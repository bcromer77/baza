import { useState } from 'react';

export default function TranscriptionOptIn({ onToggle, isOptedIn }) {
  const [showPreview, setShowPreview] = useState(false);

  const dummyTranscript = `"I absolutely love styling these white jeans 
for late summer nights — they’re a staple in my Lisbon wardrobe."`;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">🎙️ Allow brands to search by 
what I say</h2>
        <input
          type="checkbox"
          checked={isOptedIn}
          onChange={(e) => onToggle(e.target.checked)}
          className="w-5 h-5"
        />
      </div>
      <p className="text-sm mt-2 text-gray-300">
        By opting in, your spoken content becomes searchable (e.g., "white 
jeans in Lisbon").
        This boosts discovery & bookings.
      </p>

      <button
        className="mt-3 text-blue-400 underline"
        onClick={() => setShowPreview(!showPreview)}
      >
        {showPreview ? 'Hide example' : 'See how this helps you get 
booked'}
      </button>

      {showPreview && (
        <div className="mt-3 bg-gray-800 p-3 rounded-md text-sm 
text-green-200 border border-green-400">
          <p><strong>📌 Preview Transcript:</strong></p>
          <p className="italic">"{dummyTranscript}"</p>
          <p className="mt-2 text-xs text-gray-400">🔍 Brand Example 
Search: “influencers who mention white jeans in Lisbon”</p>
        </div>
      )}
    </div>
  );
}

