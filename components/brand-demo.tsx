"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

// TypeScript interface for creators
interface Creator {
  id: number;
  name: string;
  handle: string;
  location: string;
  mention: string;
  tags: string[];
  followers: string;
  engagement: string;
  niche: string;
  predictedROI: number; // Mock AI-predicted ROI
}

export function BrandDemo() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [selectedCreator, setSelectedCreator] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Diverse creator dataset
  const creators: Creator[] = useMemo(
    () => [
      {
        id: 1,
        name: "Emma Johnson",
        handle: "@emma_beauty",
        location: "London, UK",
        mention: "This makeup brush is too hard on my skin",
        tags: ["Makeup", "Beauty", "Morning Routine"],
        followers: "45.2K",
        engagement: "4.8%",
        niche: "Beauty",
        predictedROI: 92,
      },
      {
        id: 2,
        name: "James Wilson",
        handle: "@james_tech",
        location: "Surrey, UK",
        mention: "AI is transforming supper clubs in Surrey",
        tags: ["Technology", "AI", "Food"],
        followers: "32.7K",
        engagement: "3.9%",
        niche: "Tech",
        predictedROI: 85,
      },
      {
        id: 3,
        name: "Sarah Miller",
        handle: "@sarah_style",
        location: "Manchester, UK",
        mention: "These brushes aren't as good as they were last year",
        tags: ["Style", "Beauty", "Product Review"],
        followers: "28.5K",
        engagement: "5.2%",
        niche: "Fashion",
        predictedROI: 88,
      },
      {
        id: 4,
        name: "Alex Rivera",
        handle: "@alextravel",
        location: "Brighton, UK",
        mention: "This hotel in Brighton has the best sea views",
        tags: ["Travel", "Lifestyle", "Adventure"],
        followers: "56.8K",
        engagement: "4.5%",
        niche: "Travel",
        predictedROI: 90,
      },
      {
        id: 5,
        name: "Kathy Nguyen",
        handle: "@kathyfit",
        location: "Leeds, UK",
        mention: "This protein shake boosted my gym results",
        tags: ["Fitness", "Health", "Workouts"],
        followers: "39.4K",
        engagement: "5.0%",
        niche: "Fitness",
        predictedROI: 87,
      },
      {
        id: 6,
        name: "Lila Crafts",
        handle: "@lilacrafts",
        location: "Edinburgh, UK",
        mention: "Made a Polaroid-style card with this new paper stock",
        tags: ["Crafts", "DIY", "Card Making"],
        followers: "25.6K",
        engagement: "4.2%",
        niche: "Crafts",
        predictedROI: 84,
      },
      {
        id: 7,
        name: "Mark Gamer",
        handle: "@markthegamer",
        location: "Bristol, UK",
        mention: "This deck is unbeatable in Magic: The Gathering",
        tags: ["Gaming", "Card Games", "MTG"],
        followers: "42.1K",
        engagement: "4.7%",
        niche: "Gaming",
        predictedROI: 89,
      },
      {
        id: 8,
        name: "Sophie Eats",
        handle: "@sophie_eats",
        location: "Glasgow, UK",
        mention: "This vegan restaurant in Glasgow is a game-changer",
        tags: ["Food", "Vegan", "Restaurants"],
        followers: "37.9K",
        engagement: "5.1%",
        niche: "Food",
        predictedROI: 91,
      },
      {
        id: 9,
        name: "Tina Vlogs",
        handle: "@tinavlogs",
        location: "Cardiff, UK",
        mention: "Captured this sunset with my Polaroid Go camera",
        tags: ["Photography", "Vlogging", "Polaroid"],
        followers: "31.2K",
        engagement: "4.3%",
        niche: "Photography",
        predictedROI: 86,
      },
      {
        id: 10,
        name: "Ryan Eco",
        handle: "@ryan_eco",
        location: "Birmingham, UK",
        mention: "This sustainable brand makes the best reusable bags",
        tags: ["Sustainability", "Eco-Friendly", "Lifestyle"],
        followers: "29.8K",
        engagement: "4.6%",
        niche: "Sustainability",
        predictedROI: 88,
      },
    ],
    []
  );

  // Handle search with loading state
  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setHasSearched(true);
      setIsSearching(false);
    }, 1000); // Simulate API delay
  };

  // Handle creator selection
  const handleCreatorSelect = (id: number) => {
    setSelectedCreator(id);
  };

  // Memoized filtered creators
  const filteredCreators = useMemo(() => {
    return searchTerm.length > 0
      ? creators.filter(
          (creator) =>
            creator.mention.toLowerCase().includes(searchTerm.toLowerCase()) ||
            creator.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
            creator.niche.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : creators;
  }, [searchTerm, creators]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
    >
      {/* Search Interface */}
      <div className="mb-8">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl font-bold mb-4 text-gray-900"
        >
          Discover Influencers Who Love Your Brand
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-600 mb-6"
        >
          Search for authentic voices in beauty, tech, travel, and more—perfect for startups, agencies, and global brands.
        </motion.p>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for makeup, AI, travel, crafts, etc..."
            className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            aria-label="Search for influencers"
          />
          <Button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-amber-500 hover:bg-amber-600 text-black"
            onClick={handleSearch}
            disabled={isSearching}
            aria-label={isSearching ? "Searching influencers" : "Search for influencers"}
          >
            {isSearching ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {["makeup", "AI", "travel", "crafts", "gaming"].map((tag) => (
            <Button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              variant="outline"
              className="text-xs border-amber-300 text-amber-600 hover:bg-amber-50"
              aria-label={`Search for ${tag}`}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Polaroid-Style Results */}
      <AnimatePresence>
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                Found {filteredCreators.length} influencers mentioning "{searchTerm || "all topics"}"
              </p>
              <Button variant="ghost" size="sm" className="text-xs" aria-label="Filter results">
                Filter Results
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCreators.map((creator) => (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: Math.random() * 4 - 2 }} // Slight random tilt
                  transition={{ duration: 0.4, delay: creator.id * 0.1 }}
                  className={`bg-white border-8 border-white shadow-lg rounded-md overflow-hidden transform transition-all duration-300 cursor-pointer ${
                    selectedCreator === creator.id
                      ? "scale-105 ring-2 ring-amber-500"
                      : "hover:-translate-y-2 hover:shadow-xl"
                  }`}
                  onClick={() => handleCreatorSelect(creator.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${creator.name}`}
                >
                  {/* Polaroid Image Placeholder */}
                  <div className="relative h-48 bg-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                      <h4 className="font-bold text-lg">{creator.name}</h4>
                      <p className="text-sm opacity-90">{creator.handle}</p>
                    </div>
                    {selectedCreator === creator.id && (
                      <div className="absolute top-2 right-2 bg-amber-500 rounded-full p-1">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Polaroid Content */}
                  <div className="p-4 bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs text-gray-600">{creator.location}</div>
                      <div className="text-xs font-medium text-amber-600">
                        {creator.predictedROI}% ROI
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 italic mb-2">"{creator.mention}"</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {creator.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-600">
                      <span>{creator.followers} followers</span>
                      <span>{creator.engagement} engagement</span>
                    </div>
                    {selectedCreator === creator.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 pt-3 border-t border-amber-200 flex justify-between items-center"
                      >
                        <div className="flex items-center text-green-600 text-sm">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Perfect match!
                        </div>
                        <Button
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600 text-white text-xs"
                          aria-label={`Contact ${creator.name}`}
                        >
                          Contact <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}