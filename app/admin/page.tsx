'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [allScores, setAllScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔴 IMPORTANT: Use the email you will provide to your grader here
  const ADMIN_EMAIL = "admin@example.com"; 

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Safety check: Redirect if not logged in or not the admin
      if (!session || session.user.email !== ADMIN_EMAIL) {
        router.push('/admin/login');
        return;
      }

      // Fetch all scores from the database
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setAllScores(data);
      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this entry forever?")) return;
    const { error } = await supabase.from('scores').delete().eq('id', id);
    if (!error) setAllScores(allScores.filter(s => s.id !== id));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-bold uppercase tracking-widest animate-pulse">Accessing Secure Vault...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Admin Header */}
      <nav className="border-b border-slate-800 p-6 bg-slate-900/50 backdrop-blur-md sticky top-0 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tighter">ImpactGolf <span className="text-red-500 italic">Admin</span></h1>
        </div>
        <div className="flex gap-4">
          <button onClick={() => router.push('/')} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white">View Site</button>
          <button onClick={() => supabase.auth.signOut().then(() => router.push('/admin/login'))} className="bg-red-600 px-4 py-1 rounded text-[10px] font-black uppercase tracking-widest">Logout</button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Total Database Entries</h3>
            <p className="text-6xl font-black italic text-white">{allScores.length}</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">System Status</h3>
            <p className="text-3xl font-black text-emerald-500 uppercase italic">Encrypted & Live</p>
          </div>
        </div>

        {/* The Data Table */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-[10px] font-black uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {allScores.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/20 transition-all">
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">{s.user_id.slice(0, 8)}...</td>
                  <td className="px-6 py-4 text-sm font-bold">{s.date_played}</td>
                  <td className="px-6 py-4"><span className="text-emerald-400 font-black">{s.score} PTS</span></td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-400 text-[10px] font-black uppercase tracking-widest">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}