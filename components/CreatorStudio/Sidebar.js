import { motion } from "framer-motion";
import { DollarSign, Calendar, Link, Lightbulb } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab, creator }) {
  const tabs = [
    { id: "campaigns", label: "Campaigns", icon: DollarSign },
    { id: "events", label: "Events", icon: Calendar },
    { id: "affiliates", label: "Affiliates", icon: Link },
    { id: "suggestions", label: "Suggestions", icon: Lightbulb },
  ];

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 bg-gray-800/50 backdrop-blur-md p-6 border-r 
border-white/10"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <img src={creator.avatar} alt={creator.username} 
className="object-cover w-full h-full" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{creator.username}</h2>
          <p className="text-sm text-gray-400">{creator.niche}</p>
        </div>
      </div>

      <nav className="space-y-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === tab.id ? "bg-blue-500/20 text-blue-400" : 
"text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="mt-8">
        <p className="text-sm text-gray-400">Tier: <span 
className="capitalize">{creator.tier}</span></p>
        <p className="text-sm text-gray-400">Badges: 
{creator.badges.length}</p>
      </div>
    </motion.div>
  );
}
