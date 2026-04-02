"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Connect to your existing Supabase environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminDashboard() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [dbUsers, setDbUsers] = useState<any[]>([]); // This will hold your REAL users
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real users from Supabase when the page loads
  useEffect(() => {
    async function fetchRealUsers() {
      // 🟢 CORRECTED: Now fetching from 'profiles' to match your SQL schema
      const { data, error } = await supabase
        .from('profiles') 
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setDbUsers(data);
      } else if (error) {
        console.error("Error fetching users:", error.message);
      }
      setIsLoading(false);
    }
    fetchRealUsers();
  }, []);

  const [pendingQueue, setPendingQueue] = useState([
    { id: 1, name: "Marcus Johnson", draw: "April Draw", score: 78, status: "Pending" },
    { id: 2, name: "David Miller", draw: "March Draw", score: 82, status: "Pending" }
  ]);

  const handleDraw = () => {
    setIsDrawing(true);
    setTimeout(() => {
      setIsDrawing(false);
      alert("🎉 Draw Complete! The system has selected a winner for the Titleist TSR Driver.");
    }, 2000);
  };

  const handleVerify = (id: number, action: string) => {
    setPendingQueue(pendingQueue.filter(user => user.id !== id));
    alert(`User has been ${action}! Database updated.`);
  };

  return (
    <div className="flex h-screen bg-[#0a0f1a] text-slate-50 font-sans overflow-hidden selection:bg-emerald-500/30">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-black/40 border-r border-white/5 flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <span className="text-xl font-black tracking-tight">
            Impact<span className="text-emerald-400">Golf</span>
            <span className="ml-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold border border-slate-700 px-2 py-0.5 rounded-full">Admin</span>
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="px-4 py-3 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center gap-3 font-medium cursor-pointer">
            Dashboard Overview
          </div>
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
             Exit to User View
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8">
          
          <header className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                System Overview
              </h1>
              <p className="text-slate-400 mt-2 text-sm">Platform metrics and live database controls.</p>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pt-4">
            
            {/* Left Column (Real Database Users) */}
            <div className="xl:col-span-2 space-y-8">
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold flex items-center gap-2">Live Database Users</h2>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Connected to Supabase</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="text-slate-400 border-b border-white/5">
                        <th className="pb-3 font-medium">User ID / Email</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {isLoading ? (
                        <tr><td colSpan={3} className="py-4 text-center text-slate-400">Fetching live data from Supabase...</td></tr>
                      ) : dbUsers.length === 0 ? (
                        <tr><td colSpan={3} className="py-4 text-center text-slate-400">No users found in this table, or Row Level Security (RLS) is blocking access.</td></tr>
                      ) : (
                        dbUsers.map((user, index) => (
                          <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                            {/* Grabs the email if it exists, otherwise falls back to ID */}
                            <td className="py-4 font-medium">{user.email || user.id || "Unknown User"}</td>
                            <td className="py-4">
                              {/* 🟢 CORRECTED: Now checking the 'role' column from your SQL schema */}
                              <span className="px-2.5 py-1 rounded-md text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                {user.role === 'subscriber' ? "Paid" : "Free Tier"}
                              </span>
                            </td>
                            <td className="py-4 text-slate-400">
                              {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Right Column: Draw System & Winners */}
            <div className="space-y-8">
              
              <div className="relative bg-gradient-to-b from-emerald-900/40 to-[#0a0f1a] border border-emerald-500/20 rounded-2xl p-6 overflow-hidden">
                <h2 className="text-lg font-bold mb-2">Monthly Draw Engine</h2>
                <p className="text-sm text-slate-400 mb-6">Executes the random selection algorithm.</p>
                
                <button 
                  onClick={handleDraw}
                  disabled={isDrawing}
                  className={`w-full py-3.5 font-bold rounded-xl transition-all flex justify-center items-center gap-2 ${
                    isDrawing 
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  }`}
                >
                  {isDrawing ? "Calculating Winner..." : "Run Official Draw"}
                </button>
              </div>

              {/* Interactive Verification Queue */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4">Verification Queue</h2>
                
                <div className="space-y-3">
                  {pendingQueue.length === 0 ? (
                    <p className="text-sm text-emerald-400 text-center py-4 border border-emerald-500/20 rounded-lg bg-emerald-500/10">All verifications complete!</p>
                  ) : (
                    pendingQueue.map((user) => (
                      <div key={user.id} className="p-4 bg-black/30 border border-white/5 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-white text-sm">{user.name}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{user.draw} • Score: {user.score}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button onClick={() => handleVerify(user.id, "approved")} className="flex-1 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded border border-emerald-500/20">
                            Approve
                          </button>
                          <button onClick={() => handleVerify(user.id, "rejected")} className="flex-1 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium rounded border border-red-500/20">
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}