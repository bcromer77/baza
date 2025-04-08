'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function Home() {
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
    const res = await fetch('/api/brands/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });
    const data = await res.json();
    setBrandResults(data.results || []);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email');
    console.log('Sign-up submitted:', { email });
    setIsSignUpOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400 text-center">
        Creator Prism
      </h1>

      {/* Prompt Search */}
      <section className="mb-10">
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

      {/* Call to Action */}
      <div className="text-center mt-10">
        <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg shadow-lg">
              See Your Match Now
            </Button>
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
  );
}
