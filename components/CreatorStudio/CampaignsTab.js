import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

export default function CampaignsTab({ creator }) {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await fetch("/api/campaigns", {
        headers: { "x-phyllo-user-id": creator.userId },
      });
      const data = await response.json();
      setCampaigns(data);
    };
    fetchCampaigns();
  }, [creator]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
gap-6">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg 
border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold">{campaign.title}</h3>
            </div>
            <p className="text-gray-400 mb-2">Earnings: 
${campaign.earnings}</p>
            <p className="text-gray-400">Status: {campaign.status}</p>
          </motion.div>
        ))}
        {campaigns.length === 0 && (
          <p className="text-gray-400">No campaigns yet. Check your 
suggestions for opportunities!</p>
        )}
      </div>
    </div>
  );
}
