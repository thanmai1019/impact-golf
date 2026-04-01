'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [score, setScore] = useState('');
  const [scoresList, setScoresList] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserAndFetchScores = async () => {
      // 1. Get the current logged-in user securely
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Kick them out to the login page if they aren't signed in!
        router.push('/login');
        return;
      }
      
      setUser(session.user);

      // 2. Fetch ONLY this user's scores from the database
      const { data: userScores, error } = await supabase
        .from('scores')
        .select('*')
        .eq('user_id', session.user.id) // This is the magic filter!
        .order('created_at', { ascending: false });

      if (userScores) {
        setScoresList(userScores);
      }
      setLoading(false);
    };

    checkUserAndFetchScores();
  }, [router]);

  const submitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    const scoreNum = parseInt(score);

    // Enforce the PRD rule: Stableford scores only (1-45)
    if (scoreNum < 1 || scoreNum > 45) {
      alert("Score must be a Stableford score between 1 and 45!");
      return;
    }

    // 3. Save the score using their REAL user ID
    const { error } = await supabase
      .from('scores')
      .insert([
        { 
          user_id: user.id, 
          score: scoreNum, 
          date_played: new Date().toISOString().split('T')[0] 
        }
      ]);

    
    if (error) {
      // This forces the console to print every single detail of the error
      console.error("Supabase Error Details:", JSON.stringify(error, null, 2));
      
      // This will pop the actual error message right on your screen!
      alert(`Database Error: ${error.message}`);
    } else {
      setScore('');
      window.location.reload(); 
    }
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center bg-slate-50">Loading your player profile...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Player Dashboard</h1>
        <p className="text-slate-600 mb-8">Welcome back! Log your latest rounds to enter the monthly draw.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Score Entry Form */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-semibold mb-4">Log a New Score</h2>
            <form onSubmit={submitScore} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Stableford Score (1-45)</label>
                <input 
                  type="number" 
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g., 36"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Submit Score
              </button>
            </form>
          </div>

          {/* Past Scores List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-semibold mb-4">Your Recent Rounds</h2>
            {scoresList.length === 0 ? (
              <p className="text-slate-500 italic">No scores logged yet. Get out on the course!</p>
            ) : (
              <ul className="space-y-3">
                {scoresList.map((s) => (
                  <li key={s.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-500 text-sm">{s.date_played}</span>
                    <span className="font-bold text-blue-900 text-lg">{s.score} pts</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}