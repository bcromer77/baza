// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const SLIDER_OPTIONS: EmblaOptionsType = {
  loop: true,
  duration: 6000,
};

const slideVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel(SLIDER_OPTIONS);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const [userPrompt, setUserPrompt] = useState('');
  const [brandResults, setBrandResults] = useState<any[]>([]);

  const promptToQuery = (prompt: string) => {
    if (prompt.includes("Portugal") && prompt.includes("Ozempic")) {
      return {
        topics: ["Ozempic"],
        location: "Portugal",
        budget: 5000,
        audienceSizeMin: 20000,
      };
    }
    return {};
  };

  const handlePromptSubmit = async (e: any) => {
    e.preventDefault();
    const query = promptToQuery(userPrompt);
    const res = await fetch('http://localhost:5000/api/brands/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    });
    const data = await res.json();
    setBrandResults(data.results || []);
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      console.log('Embla initialized');
    } else {
      console.error('Embla failed to initialize');
    }
  }, [emblaApi]);

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email');
    console.log('Sign-up submitted:', { email });
    setIsSignUpOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Prompt Search Bar */}
      <section className="mb-10 p-6">
        <h2 className="text-2xl font-semibold mb-4">🧠 Natural Language Brand Search</h2>
        <form onSubmit={handlePromptSubmit} className="space-y-4 max-w-lg">
          <input
            type="text"
            placeholder="e.g. Show me creators in Portugal talking about Ozempic"
            className="w-full p-2 rounded text-black"
            value={userPrompt}
            onChange={e => setUserPrompt(e.target.value)}
          />
          <button type="submit" className="w-full bg-yellow-400 text-black p-2 rounded">
            Search Brands
          </button>
        </form>
        <div className="mt-4">
          {brandResults.map((result, i) => (
            <div key={i} className="bg-gray-900 p-4 rounded-lg mt-2">
              <p>{result.name}</p>
              <p>{result.offer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Creators Section */}
      <section className="py-20 px-6 text-center">
        <h3 className="text-4xl font-bold mb-6">Creators: Leave Nothing Behind</h3>
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-800 p-10 rounded-lg opacity-90">
            <p className="text-lg max-w-xl mx-auto">
              Your audience is already listening. Creator Prism reveals where your followers live, what they love, and how you can monetize every insight.
            </p>
            <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
              <DialogTrigger asChild>
                <Button className="mt-6 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full">Unlock Your Potential</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign Up for Creator Prism</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  <Input name="email" type="email" placeholder="Enter your email" required />
                  <Button type="submit" className="w-full">Sign Up</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Brands & Agencies Section */}
      <section className="py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="max-w-md">
          <h3 className="text-4xl font-bold mb-4">Brands & Agencies: Perfect Fits</h3>
          <p className="text-lg">
            We connect brand-safe creators to high-ROI campaigns. Prism translates audience data into matches that deliver—fast.
          </p>
          <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full">Find Your Match</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign Up for Creator Prism</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                <Input name="email" type="email" placeholder="Enter your email" required />
                <Button type="submit" className="w-full">Sign Up</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="bg-gray-700 text-white p-10 rounded-lg max-w-md">
          <p className="text-xl font-semibold">“Nazaré x Patagonia”</p>
          <p className="text-3xl font-bold">$5K Deal</p>
          <p className="mt-2">Example of a match Prism surfaced in seconds.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center">
        <p className="text-xl mb-4">Join talented creators and turn your passion into profit.</p>
        <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full text-lg">Start Now</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign Up for Creator Prism</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <Input name="email" type="email" placeholder="Enter your email" required />
              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
          </DialogContent>
        </Dialog>
      </footer>
    </div>
  );
}
