tsx

// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HTMLAttributes } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

// VideoPlayer Component (local)
function VideoPlayer({ src, autoPlay, muted, loop, className, ...props }: HTMLAttributes<HTMLVideoElement> & {
  src: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}) {
  return (
    <video
      src={src}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      className={className}
      {...props}
      onError={(e) => console.error('Video failed to load:', src, e)}
    />
  );
}

const SLIDER_OPTIONS: EmblaOptionsType = {
  loop: true,
  duration: 6000, // 6s per slide
};

const slideVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel(SLIDER_OPTIONS);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

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
    // Add your backend integration here (e.g., send to MongoDB via API)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Slider */}
      <section className="relative h-screen embla" ref={emblaRef}>
        <div className="embla__container">
          {/* Slide 1: Creator Input */}
          <div className="embla__slide">
            <VideoPlayer src="/videos/nazare.mp4" autoPlay muted loop className="w-full h-full object-cover opacity-80" />
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              className="absolute inset-0 flex items-center justify-center flex-col gap-6"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Your Audience Speaks.</h1>
              <div className="text-xl flex flex-col gap-2 text-center">
                <p>Surfers: Portugal 38%</p>
                <p>Foodies: NYC 45%</p>
                <p>Gamers: Tokyo 29%</p>
              </div>
              <p className="text-lg">Whoever you are, we hear you.</p>
            </motion.div>
          </div>

          {/* Slide 2: Prism Processing */}
          <div className="embla__slide">
            <VideoPlayer src="/videos/nazare.mp4" autoPlay muted loop className="w-full h-full object-cover opacity-60" />
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              className="absolute inset-0 flex items-center justify-center flex-col gap-6"
            >
              <div className="relative w-32 h-32">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 border-4 border-blue-500 rounded-full"
                />
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl">MCP</p>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold">Prism Hears All.</h2>
              <p className="text-lg">Hotspots • Potential • Matches—for everyone.</p>
            </motion.div>
          </div>

          {/* Slide 3: Match Reveal */}
          <div className="embla__slide">
            <VideoPlayer src="/videos/nazare.mp4" autoPlay muted loop className="w-full h-full object-cover opacity-80" />
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              className="absolute inset-0 flex items-center justify-center flex-col gap-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="bg-white text-black p-6 rounded-lg shadow-2xl rotate-2"
              >
                <p className="text-lg font-semibold">Nazaré x Patagonia</p>
                <p className="text-3xl font-bold">$5K Deal</p>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold">Your Win Awaits.</h2>
              <p className="text-lg">One of thousands of matches made.</p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
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
      </section>

      {/* Creators Section */}
      <section className="py-20 px-6 text-center">
        <h3 className="text-4xl font-bold mb-6">Creators: Leave Nothing Behind</h3>
        <div className="relative max-w-4xl mx-auto">
          <VideoPlayer src="/videos/nazare2.mp4" autoPlay muted loop className="rounded-lg opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <p className="text-lg max-w-xl">
              Nazaré turned 38% Lisbon fans into $5K. A foodie could host NYC dinners. A gamer could land Tokyo sponsors. Prism unlocks every opportunity—yours included.
            </p>
            <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full">Unlock Your Potential</Button>
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
            Nazaré met Patagonia in seconds—92% alignment, $10K ROI. Prism matches surfers, artists, chefs—anyone—to your brand or campaign. Fast. Flawless.
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
        <VideoPlayer src="/videos/nazare2.mp4" autoPlay muted loop className="max-w-md rounded-lg opacity-80" />
      </section>

      {/* Footer */}
      <footer className="py-10 text-center">
        <p className="text-xl mb-4">Join 1,247 creators and $2.3M unlocked—for all, not just one.</p>
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

