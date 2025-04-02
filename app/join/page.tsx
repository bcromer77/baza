"use client";

import { useState, useEffect } from 'react';

export default function CreatorTorchDemo() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"creator" | "agency" | null>(null);
  const [creatorData, setCreatorData] = useState({
    platform: 'youtube',
    handle: 'Gigantes de Nazaré',
    email: '',
    consent: false,
    userId: '',
    sdkToken: '',
  });
  const [liveData, setLiveData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState({});

  useEffect(() => {
    if (step === 4 && userType === 'creator') {
      setApplications({ surfco: 'pending', visitportugal: 'pending' });
      setIsLoading(true);
      fetch(`http://localhost:3000/creator/${creatorData.handle}`)
        .then(res => res.json())
        .then(data => {
          setLiveData(data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [step, userType, creatorData.handle]);

  const handleCreatorChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreatorData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const nextStep = () => setStep(step + 1);

  const submitCreatorSignup = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creatorData),
      });
      const data = await response.json();
      setCreatorData((prev) => ({
        ...prev,
        userId: data.userId,
        sdkToken: data.sdkToken,
      }));

      // Mock Phyllo SDK flow for pitch
      await new Promise((resolve) => setTimeout(resolve, 1500));
      nextStep();
    } catch (error) {
      console.error("Signup error:", error);
      setIsLoading(false);
    }
  };

  const submitAgencySignup = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/agency-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: creatorData.handle, // Using handle as name for simplicity
          email: creatorData.email,
          consent: creatorData.consent,
        }),
      });
      await response.json();
      window.location.href = '/find-creators'; // Redirect to find-creators for agency/brand
    } catch (error) {
      console.error("Agency signup error:", error);
      setIsLoading(false);
    }
  };

  const applyToGig = async (gigId) => {
    setIsLoading(true);
    try {
      await fetch('http://localhost:3000/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creatorHandle: creatorData.handle, gigId }),
      });
      setApplications((prev) => ({ ...prev, [gigId]: 'applied' }));
    } catch (error) {
      console.error("Apply error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-black mb-8 tracking-tight animate-fade-in">CreatorTorch</h1>
      <p className="text-lg text-gray-700 mb-12 max-w-md text-center">
        Your platform for creators, brands, and agencies—built by us, for you.
      </p>

      {step === 1 && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-slide-up text-center">
          <h2 className="text-2xl font-semibold text-black mb-6">Join CreatorTorch</h2>
          <button
            onClick={() => { setUserType('creator'); nextStep(); }}
            className="w-full bg-black text-white text-lg py-4 rounded-lg mb-4 hover:bg-gray-900 transition-all"
          >
            I’m a Creator
          </button>
          <button
            onClick={() => { setUserType('agency'); nextStep(); }}
            className="w-full bg-black text-white text-lg py-4 rounded-lg hover:bg-gray-900 transition-all"
          >
            I’m an Agency
          </button>
        </div>
      )}

      {(userType === 'creator' || userType === 'agency') && step === 2 && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-slide-up">
          <h2 className="text-2xl font-semibold text-black mb-6">
            Sign Up with CreatorTorch
          </h2>
          {userType === 'creator' && (
            <select
              name="platform"
              value={creatorData.platform}
              onChange={handleCreatorChange}
              className="w-full p-4 text-lg border-none rounded-lg bg-gray-100 mb-4 focus:ring-2 focus:ring-blue-500"
            >
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
            </select>
          )}
          <input
            type="text"
            name="handle"
            value={creatorData.handle}
            onChange={handleCreatorChange}
            placeholder={userType === 'creator' ? "Your Handle" : "Agency Name"}
            className="w-full p-4 text-lg border-none rounded-lg bg-gray-100 mb-6 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={nextStep}
            disabled={!creatorData.handle}
            className="w-full bg-black text-white text-lg py-4 rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition-all"
          >
            Next
          </button>
        </div>
      )}

      {(userType === 'creator' || userType === 'agency') && step === 3 && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-slide-up">
          <h2 className="text-2xl font-semibold text-black mb-6">Complete Your Signup</h2>
          <input
            type="email"
            name="email"
            value={creatorData.email}
            onChange={handleCreatorChange}
            placeholder="Your Email"
            className="w-full p-4 text-lg border-none rounded-lg bg-gray-100 mb-4 focus:ring-2 focus:ring-blue-500"
          />
          <label className="flex items-center text-sm text-gray-600 mb-6">
            <input
              type="checkbox"
              name="consent"
              checked={creatorData.consent}
              onChange={handleCreatorChange}
              className="mr-2"
            />
            I consent to share my data with CreatorTorch (required)
          </label>
          <button
            onClick={userType === 'creator' ? submitCreatorSignup : submitAgencySignup}
            disabled={!creatorData.email || !creatorData.consent || isLoading}
            className="w-full bg-black text-white text-lg py-4 rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition-all"
          >
            {isLoading ? 'Processing...' : 'Sign Up'}
          </button>
        </div>
      )}

      {userType === 'creator' && step === 4 && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-slide-up text-center">
          <h2 className="text-2xl font-semibold text-black mb-6">Welcome, {creatorData.handle}!</h2>
          <p className="text-gray-700 mb-6">
            {isLoading
              ? 'Loading your stats...'
              : liveData
              ? `Your ${liveData.followers.toLocaleString()} ${liveData.platform} followers are live—Powered by CreatorTorch.`
              : 'No data yet—stats coming soon!'}
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-black font-semibold">@SurfCo (Brand)</p>
            <p className="text-sm text-gray-600">“Promote our surfboards—$5K offer.”</p>
            <button
              onClick={() => applyToGig('surfco')}
              disabled={isLoading || applications['surfco'] === 'applied'}
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-green-700 disabled:bg-gray-400 transition-all"
            >
              {applications['surfco'] === 'pending' ? 'Apply Now' : 'Applied'}
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-black font-semibold">Visit Portugal (Agency)</p>
            <p className="text-sm text-gray-600">“Showcase Nazaré waves—$10K campaign.”</p>
            <button
              onClick={() => applyToGig('visitportugal')}
              disabled={isLoading || applications['visitportugal'] === 'applied'}
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-green-700 disabled:bg-gray-400 transition-all"
            >
              {applications['visitportugal'] === 'pending' ? 'Apply Now' : 'Applied'}
            </button>
          </div>

          {liveData && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-black font-semibold">Your Top Post</p>
              <p className="text-sm text-gray-600">
                “Big Wave Surfing”—{liveData.topVideoViews.toLocaleString()} views
              </p>
            </div>
          )}

          <button
            onClick={() => setStep(5)}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-all"
          >
            Explore CreatorTorch
          </button>
        </div>
      )}

      {step === 5 && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-slide-up text-center">
          <h2 className="text-2xl font-semibold text-black mb-6">CreatorTorch in Action</h2>
          <p className="text-gray-700 mb-6">
            Gigantes drives 500 signups today. Brands and agencies join. One platform, built by us for millions.
          </p>
          <img
            src="https://via.placeholder.com/300x150?text=Creators+Brands+Agencies"
            alt="MCP"
            className="mx-auto mb-6 rounded-lg"
          />
        </div>
      )}

      <style jsx>{`
        .animate-fade-in { animation: fadeIn 1s ease-in; }
        .animate-slide-up { animation: slideUp 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}