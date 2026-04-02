"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function AdminDashboard() {
  // State to make the page interactive!
  const [isDrawing, setIsDrawing] = useState(false);
  const [pendingQueue, setPendingQueue] = useState([
    { id: 1, name: "Marcus Johnson", draw: "April Draw", score: 78, status: "Pending" },
    { id: 2, name: "David Miller", draw: "March Draw", score: 82, status: "Pending" }
  ]);

  // Fake loading function for the draw
  const handleDraw = () => {
    setIsDrawing(true);
    setTimeout(() => {
      setIsDrawing(false);
      alert("🎉 Draw Complete! The system has selected a winner for the Titleist TSR Driver. An automated email has been sent.");
    }, 2000);
  };

  // Function to remove people from the queue when clicked
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
          <div onClick={() => alert("Navigating to User Management...")} className="px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3 font-medium transition-colors cursor-pointer">
            User Management
          </div>
          <div onClick={() => alert("Loading Draw System Settings...")} className="px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3 font-medium transition-colors cursor-pointer">
            Draw System
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
              <p className="text-slate-400 mt-2 text-sm">Platform metrics and operational controls.</p>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pt-4">
            
            {/* Left Column (Users & Charities) */}
            <div className="xl:col-span-2 space-y-8">
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold flex items-center gap-2">Recent Registrations</h2>
                  <button onClick={() => alert("Loading full database table...")} className="text-sm font-medium text-emerald-400 hover:text-emerald-300">View All Users &rarr;</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="text-slate-400 border-b border-white/5">
                        <th className="pb-3 font-medium">Golfer</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 font-medium">testuser@example.com</td>
                        <td className="py-4"><span className="px-2.5 py-1 rounded-md text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Subscribed</span></td>
                        <td className="py-4 text-slate-400">Today</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 font-medium">admin@example.com</td>
                        <td className="py-4"><span className="px-2.5 py-1 rounded-md text-xs font-medium border bg-slate-800 text-slate-400 border-slate-700">Admin</span></td>
                        <td className="py-4 text-slate-400">Apr 2</td>
                      </tr>
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