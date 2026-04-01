'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planType: 'monthly' | 'yearly') => {
    setLoading(true);

    try {
      // 1. Get the current logged-in user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert("Please log in first!");
        window.location.href = '/login';
        return;
      }

      // 2. Call the API we built in the last step!
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: planType,
          userId: session.user.id, // We pass the real user ID securely
        }),
      });

      const data = await response.json();

      // 3. If Stripe gives us a checkout URL, send the user there!
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Choose Your Impact</h1>
      <p className="text-slate-600 mb-12 text-center max-w-lg">
        Subscribe to enter the monthly prize draws. Remember, a minimum of 10% of your fee goes directly to your chosen charity!
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Monthly Plan Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-2">Monthly Player</h2>
          <p className="text-4xl font-extrabold text-blue-600 mb-6">$10<span className="text-lg text-slate-500 font-medium">/mo</span></p>
          <ul className="text-slate-600 space-y-3 mb-8 text-left w-full">
            <li>✅ Entry into monthly 3, 4, & 5-number draws</li>
            <li>✅ Unlimited score tracking</li>
            <li>✅ 10% Charity Contribution</li>
          </ul>
          <button 
            onClick={() => handleSubscribe('monthly')}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
          >
            {loading ? 'Loading...' : 'Subscribe Monthly'}
          </button>
        </div>

        {/* Yearly Plan Card (Discounted as per PRD) */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-8 rounded-2xl shadow-xl text-white flex flex-col items-center text-center relative transform md:-translate-y-4">
          <div className="absolute top-0 -translate-y-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold shadow">
            Best Value
          </div>
          <h2 className="text-2xl font-bold mb-2 mt-4">Yearly Legend</h2>
          <p className="text-4xl font-extrabold mb-6">$100<span className="text-lg text-blue-200 font-medium">/yr</span></p>
          <ul className="text-blue-100 space-y-3 mb-8 text-left w-full">
            <li>✅ 2 Months Free!</li>
            <li>✅ Entry into all monthly draws</li>
            <li>✅ Unlimited score tracking</li>
            <li>✅ 10% Charity Contribution</li>
          </ul>
          <button 
            onClick={() => handleSubscribe('yearly')}
            disabled={loading}
            className="w-full bg-white text-blue-900 py-3 rounded-full font-bold hover:bg-slate-100 transition"
          >
            {loading ? 'Loading...' : 'Subscribe Yearly'}
          </button>
        </div>
      </div>
    </div>
  );
}