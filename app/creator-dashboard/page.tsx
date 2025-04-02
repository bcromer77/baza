"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Trash2, RefreshCw, Shield, Calendar } from "lucide-react";
import mongoDB from "mongodb"; // MongoDB client (assumed setup)

export default function CreatorDashboardPage() {
  const [accounts, setAccounts] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [recommendedGigs, setRecommendedGigs] = useState([]);
  const [collabSuggestions, setCollabSuggestions] = useState([]);
  const [brandMentions, setBrandMentions] = useState({});
  const [postingStats, setPostingStats] = useState({ frequency: 0, lastPost: null });
  const [stripeBalance, setStripeBalance] = useState(0); // Mocked Stripe
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [newAccount, setNewAccount] = useState({ platform: "", handle: "", ageVerified: false });

  // MongoDB connection (assumed setup)
  const mongoClient = new mongoDB.MongoClient("mongodb://localhost:27017");
  const db = mongoClient.db("creatortorch");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch Phyllo accounts
        const accountsRes = await fetch("/api/accounts");
        const accountsData = (await accountsRes.json()).accounts;
        setAccounts(accountsData);

        // Fetch content & analyze
        const contentRes = await fetch("/api/content"); // Phyllo Content API
        const content = await contentRes.json();
        const mentions = analyzeMentions(content);
        setBrandMentions(mentions);

        // Posting stats
        const stats = calculatePostingStats(content);
        setPostingStats(stats);

        // Fetch gigs from MongoDB
        const gigsData = await db.collection("gigs").find().toArray();
        setGigs(gigsData);

        // Match gigs
        const matched = matchCreatorToGigs({ text: content.text, sentiment: content.sentiment, followers: accountsData[0]?.followers }, gigsData);
        setRecommendedGigs(matched);

        // Collab suggestions
        const collabs = await suggestCollabs(accountsData[0]?.followers, mentions);
        setCollabSuggestions(collabs);

        // Mock Stripe balance
        setStripeBalance(7500); // $7,500 earned (mocked)
      } catch (err) {
        setError("Couldn’t load your world—refresh to retry.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [refreshTrigger]);

  const connectAccount = async () => {
    if (!newAccount.handle || !newAccount.ageVerified) {
      setError("Verify your age and enter a handle!");
      return;
    }
    setIsConnecting(true);
    try {
      const userId = await db.collection("users").findOne({ handle: newAccount.handle })._id; // MongoDB user
      const response = await fetch("/api/connect-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const { sdk_token } = await response.json();
      const config = {
        clientDisplayName: "CreatorTorch",
        environment: "sandbox",
        token: sdk_token,
        userId,
        workPlatformIds: [newAccount.platform],
        onAccountConnected: () => {
          setRefreshTrigger((prev) => prev + 1);
          setNewAccount({ platform: "", handle: "", ageVerified: false });
        },
        onExit: () => setIsConnecting(false),
      };
      new PhylloConnect(config).open();
    } catch (err) {
      setError("Connection failed—check your details.");
      setIsConnecting(false);
    }
  };

  const applyToGig = async (gigId) => {
    setGigs((prev) => prev.map((gig) => (gig.id === gigId ? { ...gig, status: "applied" } : gig)));
    await db.collection("gigs").updateOne({ id: gigId }, { $set: { status: "applied" } });
    // Mock Stripe payment intent later
  };

  const disconnectAccount = async (accountId) => {
    if (confirm("Disconnect this lifeline?")) {
      await fetch("/api/disconnect", { method: "POST", body: JSON.stringify({ account_id: accountId }) });
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  const analyzeMentions = (content) => {
    const mentions = {};
    content.forEach((post) => {
      const brands = (post.text.match(/(surfco|visitportugal|nazaré)/gi) || []);
      brands.forEach((brand) => (mentions[brand] = (mentions[brand] || 0) + 1));
    });
    return mentions;
  };

  const calculatePostingStats = (content) => {
    const postsThisMonth = content.filter((p) => new Date(p.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    return { frequency: postsThisMonth.length, lastPost: postsThisMonth[0]?.created_at };
  };

  const matchCreatorToGigs = (creatorContent, gigs) => {
    const scores = gigs.map((gig) => {
      const keywordMatches = (creatorContent.text.match(new RegExp(gig.keywords.join("|"), "gi")) || []).length;
      const sentimentScore = creatorContent.sentiment?.positive / (creatorContent.sentiment?.total || 1);
      const followerWeight = Math.log(creatorContent.followers) / Math.log(1000000);
      return { gig, score: keywordMatches * sentimentScore * followerWeight };
    });
    return scores.sort((a, b) => b.score - a.score).slice(0, 3).map((s) => s.gig);
  };

  const suggestCollabs = async (followers, mentions) => {
    const creators = await db.collection("creators").find({ followers: { $gt: followers / 2 } }).limit(3).toArray();
    return creators.map((c) => ({ handle: c.handle, followers: c.followers }));
  };

  const getPlatformInfo = (platformId) => {
    const platforms = {
      youtube: { name: "YouTube", icon: "🎥", color: "text-red-700" },
      instagram: { name: "Instagram", icon: "📸", color: "text-pink-700" },
      tiktok: { name: "TikTok", icon: "🎵", color: "text-black" },
      default: { name: "Platform", icon: "🔗", color: "text-gray-700" },
    };
    return platforms[platformId.toLowerCase()] || platforms.default;
  };

  return (
    <div className="flex flex-col items-center py-8 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <div className="max-w-5xl w-full px-6">
        <motion.h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Your Creator Universe
        </motion.h1>
        <motion.p className="text-2xl text-gray-700 mb-8 italic" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          “Your voice matters—connect, shine, earn. This is your stage.”
        </motion.p>

        {error && (
          <motion.div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {error}
          </motion.div>
        )}

        {/* Account Connection */}
        <div className="mb-10">
          <motion.h2 className="text-3xl font-bold text-gray-900 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Link Your Legacy
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <select
              value={newAccount.platform}
              onChange={(e) => setNewAccount({ ...newAccount, platform: e.target.value })}
              className="border rounded-lg p-2 bg-white text-gray-700"
            >
              <option value="">Select Platform</option>
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
            </select>
            <input
              type="text"
              placeholder="Your Handle (e.g., @Gigantes)"
              value={newAccount.handle}
              onChange={(e) => setNewAccount({ ...newAccount, handle: e.target.value })}
              className="border rounded-lg p-2 flex-1"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newAccount.ageVerified}
                onChange={(e) => setNewAccount({ ...newAccount, ageVerified: e.target.checked })}
                className="mr-2"
              />
              <Shield size={16} className="text-green-600" /> Age 18+ Verified
            </label>
          </div>
          <motion.button
            onClick={connectAccount}
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isConnecting ? "Connecting Your Star..." : "Ignite Your Journey"}
          </motion.button>
        </div>

        {/* Connected Accounts */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <motion.h2 className="text-3xl font-bold text-gray-900" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              Your Reach
            </motion.h2>
            <motion.button onClick={() => setRefreshTrigger((prev) => prev + 1)} className="text-gray-500 hover:text-blue-500" whileHover={{ scale: 1.1 }}>
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            </motion.button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Unveiling Your Impact...</span>
            </div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No accounts yet—connect to shine!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {accounts.map((account) => {
                const platform = getPlatformInfo(account.work_platform_id);
                return (
                  <motion.div key={account.account_id} className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center">
                      <span className={`text-xl mr-4 ${platform.color}`}>{platform.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {platform.name} - {account.followers?.toLocaleString()} Souls Inspired
                        </h3>
                        <p className="text-sm text-gray-400">Connected {new Date(account.connected_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <motion.button className="text-gray-500 hover:text-blue-500 mr-3" whileHover={{ scale: 1.1 }} title="Dive into Insights">
                        <ExternalLink size={18} />
                      </motion.button>
                      <motion.button onClick={() => disconnectAccount(account.account_id)} className="text-red-500 hover:text-red-700" whileHover={{ scale: 1.1 }}>
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Your Impact Stats */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div className="bg-white p-6 rounded-xl shadow-md" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="text-lg font-semibold text-gray-900">Brand Mentions</h3>
            <p className="text-3xl font-bold text-blue-600">{Object.keys(brandMentions).length || 0}</p>
            <p className="text-sm text-gray-500">Brands You’ve Amplified This Month</p>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-xl shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-lg font-semibold text-gray-900">Posting Rhythm</h3>
            <p className="text-3xl font-bold text-green-600">{postingStats.frequency}</p>
            <p className="text-sm text-gray-500">Posts This Month—Your Voice Echoes</p>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-xl shadow-md" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="text-lg font-semibold text-gray-900">Earnings</h3>
            <p className="text-3xl font-bold text-indigo-600">${stripeBalance.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Your Stripe Balance—Mocked Glory</p>
          </motion.div>
        </div>

        {/* Recommended Gigs */}
        <div className="mb-10">
          <motion.h2 className="text-3xl font-bold text-gray-900 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Gigs Crafted for You
          </motion.h2>
          <div className="space-y-4">
            {recommendedGigs.map((gig) => (
              <motion.div key={gig.id} className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-md">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{gig.name}</p>
                  <p className="text-gray-600">{gig.description}</p>
                </div>
                <motion.button
                  onClick={() => applyToGig(gig.id)}
                  disabled={gig.status === "applied"}
                  className={`px-4 py-2 rounded-lg ${gig.status === "applied" ? "bg-gray-400" : "bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"} text-white shadow`}
                  whileHover={{ scale: 1.05 }}
                >
                  {gig.status === "applied" ? "Applied" : "Claim Your Spotlight"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Collab Suggestions */}
        <div className="mb-10">
          <motion.h2 className="text-3xl font-bold text-gray-900 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Collab Constellations
          </motion.h2>
          <div className="space-y-4">
            {collabSuggestions.map((collab) => (
              <motion.div key={collab.handle} className="border rounded-xl p-4 flex justify-between items-center bg-white shadow-md">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{collab.handle}</p>
                  <p className="text-gray-600">{collab.followers.toLocaleString()} Followers</p>
                </div>
                <motion.button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600" whileHover={{ scale: 1.05 }}>
                  Connect
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Invite Friends */}
        <motion.div className="text-center py-10 bg-white rounded-xl shadow-md" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Bring Your Crew</h3>
          <p className="text-gray-600 mb-6">Invite friends to test CreatorTorch—more creators, more magic, more gigs.</p>
          <motion.button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700" whileHover={{ scale: 1.05 }}>
            Invite Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}