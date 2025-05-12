import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UpsellCard() {
  return (
    <div className="bg-zinc-800 border border-zinc-600 rounded-xl p-6 text-center text-white">
      <Lock className="inline-block mb-2 text-yellow-400" size={32} />
      <h3 className="font-semibold text-lg mb-2">Premium Feature</h3>
      <p className="text-zinc-400 mb-4">
        Unlock advanced sentiment analysis, proximity word detection, and chronemic insights by upgrading to Premium.
      </p>
      <Button variant="premium" className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black">
        Upgrade to Premium
      </Button>
    </div>
  );
}

