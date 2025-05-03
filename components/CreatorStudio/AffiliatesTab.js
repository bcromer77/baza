import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, DollarSign } from "lucide-react";

export default function AffiliatesTab({ creator }) {
  const [accounts, setAccounts] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [linkHub, setLinkHub] = useState(null);
  const [newAccount, setNewAccount] = useState({ platform: "", apiKey: "" 
});

  useEffect(() => {
    const fetchAffiliates = async () => {
      const earningsResponse = await fetch("/api/affiliates/earnings", {
        headers: { "x-phyllo-user-id": creator.userId },
      });
      const linkHubResponse = await fetch("/api/affiliates/linkhub", {
        headers: { "x-phyllo-user-id": creator.userId },
      });
      const earningsData = await earningsResponse.json();
      const linkHubData = await linkHubResponse.json();
      setEarnings(earningsData.earnings);
      setLinkHub(linkHubData.url);
    };
    fetchAffiliates();
  }, [creator]);

  const handleConnectAccount = async () => {
    await fetch("/api/affiliates/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-phyllo-user-id": creator.userId,
      },
      body: JSON.stringify(newAccount),
    });
    setAccounts([...accounts, newAccount]);
    setNewAccount({ platform: "", apiKey: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Affiliate Hub</h2>

      {/* Connect Account */}
      <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg 
border border-white/10 mb-8">
        <h3 className="text-lg font-semibold mb-4">Connect an Affiliate 
Account</h3>
        <input
          type="text"
          placeholder="Platform (e.g., Amazon Associates)"
          value={newAccount.platform}
          onChange={(e) => setNewAccount({ ...newAccount, platform: 
e.target.value })}
          className="w-full p-3 bg-gray-700 rounded-lg text-white mb-4"
        />
        <input
          type="text"
          placeholder="API Key"
          value={newAccount.apiKey}
          onChange={(e) => setNewAccount({ ...newAccount, apiKey: 
e.target.value })}
          className="w-full p-3 bg-gray-700 rounded-lg text-white mb-4"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full 
px-6 py-3 font-semibold"
          onClick={handleConnectAccount}
        >
          Connect Account
        </motion.button>
      </div>

      {/* Link Hub */}
      {linkHub && (
        <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg 
border border-white/10 mb-8">
          <h3 className="text-lg font-semibold mb-4">Your Link Hub</h3>
          <p className="text-gray-400 mb-4">{linkHub}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white 
rounded-full px-6 py-3 font-semibold"
            onClick={() => navigator.clipboard.writeText(linkHub)}
          >
            Copy Link
          </motion.button>
        </div>
      )}

      {/* Earnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
gap-6">
        {earnings.map((earning, index) => (
          <motion.div
            key={earning._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg 
border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold">{earning.source}</h3>
            </div>
            <p className="text-gray-400 mb-2">Earnings: 
${earning.amount}</p>
            <p className="text-gray-400">Date: {new 
Date(earning.date).toLocaleDateString()}</p>
          </motion.div>
        ))}
        {earnings.length === 0 && (
          <p className="text-gray-400">No affiliate earnings yet. Connect 
an account above!</p>
        )}
      </div>
    </div>
  );
}
