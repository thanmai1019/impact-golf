"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);

  // Set your admin email here
  const ADMIN_EMAIL = "nandueduu@gmail.com"; 

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const prizes = [
    { title: "Titleist TSR3 Driver", value: "$599", draw: "April Draw", image: "🏌️‍♂️" },
    { title: "Scotty Cameron Putter", value: "$429", draw: "May Draw", image: "⛳" },
    { title: "Pro V1 Golf Balls (12 Dozen)", value: "$650", draw: "June Draw", image: "⚪" },
  ];

  const faqs = [
    { q: "How are my draw numbers generated?", a: "Once you log a valid 18-hole score, our algorithm generates a unique 5-digit number for that month's draw." },
    { q: "How much goes to charity?", a: "A minimum of 10% of every subscription tier goes directly to the charity you select in your profile settings." },
    { q: "Is this a lottery?", a: "No. ImpactGolf is a membership. The monthly gear vault is a free promotional perk included." },
    { q: "How do I claim my prize if I win?", a: "Winners are notified via email and in their dashboard." }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-emerald-200">
      
      {/* 1. STICKY NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform text-white font-bold italic">I</div>
            <span className="text-2xl font-black tracking-tighter uppercase text-slate-900">
              Impact<span className="text-emerald-700">Golf</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
            <Link href="#vault" className="hover:text-emerald-700 transition-colors">The Vault</Link>
            <Link href="#process" className="hover:text-emerald-700 transition-colors">How it Works</Link>
            
            {/* ADMIN BUTTON: Only shows if you are logged in with the admin email */}
            {user?.email === ADMIN_EMAIL && (
              <Link href="/admin" className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-md border border-red-100 transition-all">
                Admin Portal
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link href="/dashboard" className="px-6 py-2.5 bg-emerald-800 text-white text-sm font-bold rounded-lg shadow-md uppercase tracking-wider">
                My Dashboard
              </Link>
            ) : (
              <Link href="/login" className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg shadow-md uppercase tracking-wider">
                Login / Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-slate-900 uppercase leading-[0.95]">
            Play Better. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-900">Win Bigger.</span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={user ? "/dashboard" : "/login"} className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-emerald-800 transition-all text-lg uppercase tracking-wider shadow-xl">
              {user ? "View My Scores" : "Start Your Journey"}
            </Link>
          </div>
        </div>
      </section>

      {/* PRIZES SECTION (Same as yours) */}
      <section id="vault" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-12">The Prize Vault</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {prizes.map((p, i) => (
              <div key={i} className="rounded-3xl border p-8 bg-slate-50">
                <div className="text-6xl mb-4">{p.image}</div>
                <h3 className="text-xl font-black uppercase">{p.title}</h3>
                <p className="text-emerald-700 font-bold">{p.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-16">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border rounded-2xl overflow-hidden">
                <button onClick={() => toggleFaq(index)} className="w-full px-8 py-6 text-left flex justify-between font-bold">
                  {faq.q}
                  <span>{activeFaq === index ? '−' : '+'}</span>
                </button>
                {activeFaq === index && <div className="px-8 pb-6 text-slate-500">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-10 border-t border-slate-900 text-center">
          <p className="text-slate-600 text-sm mb-4 italic">© {new Date().getFullYear()} ImpactGolf Inc.</p>
          {user?.email === ADMIN_EMAIL && (
             <Link href="/admin" className="text-[10px] text-slate-800 uppercase tracking-widest hover:text-red-500">Admin Login</Link>
          )}
      </footer>
    </div>
  );
}