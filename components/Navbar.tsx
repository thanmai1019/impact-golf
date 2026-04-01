'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Add a scroll listener for the premium "frosted glass" effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Smart authentication check
    const checkUserAndRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      if (session?.user) {
        // Look up this specific user in the database to see if they are an Admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (profile && profile.role === 'admin') {
          setIsAdmin(true);
        }
      }
    };

    checkUserAndRole();

    // Listen for logins/logouts in real-time
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (!session) setIsAdmin(false);
      checkUserAndRole(); // Re-check role on login
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    router.push('/login');
  };

  // Helper function to highlight the active page
  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${
      isScrolled 
        ? 'bg-slate-900/80 backdrop-blur-md border-slate-800 shadow-lg py-3' 
        : 'bg-slate-900 border-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        
        {/* Premium Gradient Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">⛳</span>
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight">
            ImpactGolf
          </span>
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center font-medium text-sm">
          <Link 
            href="/charities" 
            className={`transition-colors ${isActive('/charities') ? 'text-emerald-400' : 'text-slate-300 hover:text-white'}`}
          >
            Charities
          </Link>
          <Link 
            href="/pricing" 
            className={`transition-colors ${isActive('/pricing') ? 'text-emerald-400' : 'text-slate-300 hover:text-white'}`}
          >
            Pricing
          </Link>
          
          {/* Authenticated Links */}
          {user ? (
            <div className="flex items-center gap-6 border-l border-slate-700 pl-6">
              <Link 
                href="/dashboard" 
                className={`transition-colors ${isActive('/dashboard') ? 'text-emerald-400' : 'text-slate-300 hover:text-white'}`}
              >
                Dashboard
              </Link>
              
              {/* Only show this if the user is an Admin! */}
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors bg-amber-400/10 px-3 py-1.5 rounded-md border border-amber-400/20"
                >
                  ⚙️ Admin Panel
                </Link>
              )}

              <button 
                onClick={handleLogout} 
                className="text-slate-400 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 border-l border-slate-700 pl-6">
              <Link 
                href="/login" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/login" 
                className="bg-emerald-500 text-slate-950 px-5 py-2.5 rounded-full font-bold hover:bg-emerald-400 transition-all hover:shadow-[0_0_15px_rgba(52,211,153,0.4)]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}