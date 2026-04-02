import Link from 'next/link';

export default function AdminDashboard() {
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
          <div className="px-4 py-3 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center gap-3 font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Dashboard Overview
          </div>
          <div className="px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3 font-medium transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            User Management
          </div>
          <div className="px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3 font-medium transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Draw System
          </div>
          <div className="px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-3 font-medium transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            Charities
          </div>
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Exit to User View
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8">
          
          {/* Top Bar */}
          <header className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                System Overview
              </h1>
              <p className="text-slate-400 mt-2 text-sm">Platform metrics and operational controls.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Stripe Webhooks: Active
              </span>
            </div>
          </header>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Subscribers", value: "1,204", trend: "+12%", up: true },
              { label: "Monthly Revenue", value: "$12,040", trend: "+12%", up: true },
              { label: "Charity Pool", value: "$1,204", trend: "10% Cut", up: true },
              { label: "Pending Verifications", value: "3", trend: "Needs Action", up: false, alert: true }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
                <p className="text-3xl font-bold mt-2 text-white">{stat.value}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium">
                  <span className={`px-2 py-1 rounded-md ${stat.alert ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pt-4">
            
            {/* Left Column: Users & Charities (Takes up 2/3) */}
            <div className="xl:col-span-2 space-y-8">
              
              {/* User Management Table */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    Recent Registrations
                  </h2>
                  <button className="text-sm font-medium text-emerald-400 hover:text-emerald-300">View All Users &rarr;</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="text-slate-400 border-b border-white/5">
                        <th className="pb-3 font-medium">Golfer</th>
                        <th className="pb-3 font-medium">Handicap</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Joined</th>
                        <th className="pb-3 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { name: "testuser@example.com", hdcp: "12.4", status: "Subscribed", date: "Today", active: true },
                        { name: "admin@example.com", hdcp: "Scratch", status: "Admin", date: "Apr 2", active: true },
                        { name: "sarah.j@gmail.com", hdcp: "18.1", status: "Free Tier", date: "Apr 1", active: false }
                      ].map((user, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-900 font-bold text-xs">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </td>
                          <td className="py-4 text-slate-300">{user.hdcp}</td>
                          <td className="py-4">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${user.active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 text-slate-400">{user.date}</td>
                          <td className="py-4 text-right">
                            <button className="text-slate-500 hover:text-white p-1 rounded hover:bg-white/10 transition-colors">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Charity Management */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Charity Distribution Network
                  </h2>
                  <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors border border-white/5">
                    + Add Charity
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-white/5 bg-black/20 rounded-xl flex justify-between items-center group hover:border-emerald-500/30 transition-all">
                    <div>
                      <h4 className="font-medium text-white group-hover:text-emerald-400 transition-colors">St. Jude Children's Hospital</h4>
                      <p className="text-xs text-slate-400 mt-1">42% of users selected</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="p-4 border border-white/5 bg-black/20 rounded-xl flex justify-between items-center group hover:border-cyan-500/30 transition-all">
                    <div>
                      <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors">World Wildlife Fund</h4>
                      <p className="text-xs text-slate-400 mt-1">38% of users selected</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Draw System & Winners (Takes up 1/3) */}
            <div className="space-y-8">
              
              {/* Draw System Execution */}
              <div className="relative bg-gradient-to-b from-emerald-900/40 to-[#0a0f1a] border border-emerald-500/20 rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  Monthly Draw Engine
                </h2>
                <p className="text-sm text-slate-400 mb-6">Executes the random selection algorithm for the current prize pool.</p>
                
                <div className="bg-black/40 border border-white/5 rounded-xl p-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Current Prize:</span>
                    <span className="font-bold text-white">Titleist TSR Driver</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Eligible Entries:</span>
                    <span className="font-bold text-white">842 Scores</span>
                  </div>
                </div>

                <button className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex justify-center items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Run Official Draw
                </button>
              </div>

              {/* Winner Verification Queue */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Verification Queue
                </h2>
                
                <div className="space-y-3">
                  <div className="p-4 bg-black/30 border border-white/5 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-white text-sm">Marcus Johnson</p>
                        <p className="text-xs text-slate-400 mt-0.5">April Draw • Score: 78</p>
                      </div>
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] uppercase font-bold tracking-wider rounded">Pending</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded border border-emerald-500/20 transition-colors">
                        Approve
                      </button>
                      <button className="flex-1 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium rounded border border-red-500/20 transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-black/30 border border-white/5 rounded-xl opacity-60">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-white text-sm">David Miller</p>
                        <p className="text-xs text-slate-400 mt-0.5">March Draw • Score: 82</p>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-wider rounded flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}