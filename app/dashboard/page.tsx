'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [score, setScore] = useState('');
  const [scoresList, setScoresList] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Load user and scores
  useEffect(() => {
    const initDashboard = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUser(session.user);

      const { data } = await supabase
        .from('scores')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (data) setScoresList(data);
      setLoading(false);
    };
    initDashboard();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !user) return;

    const scoreNum = parseInt(score);
    if (isNaN(scoreNum) || scoreNum < 1 || scoreNum > 45) {
      alert("Please enter a valid score (1-45)");
      return;
    }

    setIsSubmitting(true);

    // Matches your exact table: user_id, score, and date_played
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
      alert(`Error: ${error.message}`);
      setIsSubmitting(false);
    } else {
      setScore('');
      // Refresh the list
      const { data } = await supabase
        .from('scores')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (data) setScoresList(data);
      setIsSubmitting(false);
      alert("Score saved!");
    }
  };

  if (loading) return <div className="p-10 text-center font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-slate-100">
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">ImpactGolf</h1>
          <p className="text-slate-500 mb-8 font-medium">Logged in as {user?.email}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Stableford Score</label>
              <input 
                type="number" 
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-3xl font-black focus:border-emerald-600 outline-none transition-all"
                placeholder="36"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-emerald-800 text-white font-black py-4 rounded-2xl hover:bg-emerald-900 transition-all uppercase tracking-widest shadow-lg shadow-emerald-800/20 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Submit Round'}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">History</h2>
          {scoresList.map((s) => (
            <div key={s.id} className="bg-white p-5 rounded-2xl flex justify-between items-center border border-slate-100 shadow-sm">
              <span className="font-bold text-slate-400 text-sm">{s.date_played}</span>
              <span className="font-black text-emerald-800 text-xl">{s.score} PTS</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}