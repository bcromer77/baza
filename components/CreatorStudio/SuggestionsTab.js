import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function SuggestionsTab({ creator }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await fetch("/api/suggestions", {
        headers: { "x-phyllo-user-id": creator.userId },
      });
      const data = await response.json();
      setSuggestions(data);
    };
    fetchSuggestions();
  }, [creator]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Suggestions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
gap-6">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg 
border border-blue-400/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="h-6 w-6 text-yellow-400 animate-pulse" 
/>
              <h3 className="text-lg font-semibold 
capitalize">{suggestion.type}</h3>
            </div>
            <p className="text-gray-300">{suggestion.content}</p>
          </motion.div>
        ))}
        {suggestions.length === 0 && (
          <p className="text-gray-400">No suggestions yet. Keep creating 
content to get personalized ideas!</p>
        )}
      </div>
    </div>
  );
}
