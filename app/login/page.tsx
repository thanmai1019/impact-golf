'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase'; // Our database connection
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // 1. Check if the user is already logged in when the page loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        router.push('/dashboard'); // Send them straight to the dashboard if logged in!
      }
    });

    // 2. Listen for login events (like when they click 'Sign In')
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to the Platform</h1>
        <p className="text-center text-sm text-gray-600 mb-4">Sign in or create an account to start tracking your scores.</p>
        
        {/* This is the magic Supabase component that creates the form for us! */}
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]} // We are just using Email/Password for now to keep it simple
        />
      </div>
    </div>
  );
}