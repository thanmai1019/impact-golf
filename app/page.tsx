import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-50 font-sans selection:bg-emerald-500/30 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 flex flex-col items-center text-center">
        {/* Complex Multi-Layered Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-slate-300 text-sm font-medium tracking-wide mb-8 hover:bg-white/10 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            Live: Monthly Draw Engine Active
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
            Play Golf. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-teal-300 to-cyan-500">
              Impact the World.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            The world&apos;s first charity subscription platform for amateur golfers. Log your scores, win massive monthly cash prizes, and guarantee <span className="text-emerald-400 font-semibold">10% of your fee</span> goes to a charity of your choice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link 
              href="/pricing" 
              className="group relative w-full sm:w-auto px-8 py-4 bg-emerald-500 text-slate-950 font-bold rounded-full transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95 text-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative z-10">Start Your Membership</span>
            </Link>
            <Link 
              href="/charities" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 transition-all text-lg backdrop-blur-sm"
            >
              Explore Charities
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID STATS SECTION */}
      <section className="py-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-slate-800/50 p-8 rounded-3xl backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] text-center">
            <h4 className="text-4xl font-black text-white mb-2">$10<span className="text-xl text-slate-500 font-medium">/mo</span></h4>
            <p className="text-slate-400 text-sm">Flat subscription fee</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800/50 p-8 rounded-3xl backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px]"></div>
            <h4 className="text-4xl font-black text-emerald-400 mb-2">10%</h4>
            <p className="text-slate-400 text-sm">Guaranteed charity split</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800/50 p-8 rounded-3xl backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] text-center">
            <h4 className="text-4xl font-black text-white mb-2">3-5</h4>
            <p className="text-slate-400 text-sm">Number matches to win</p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">The Mechanics</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Everything is automated. You focus on your golf swing, our platform handles the payouts and donations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-20 right-20 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent z-0"></div>

            {/* Steps */}
            {[
              { num: "01", title: "Subscribe & Select", desc: "Pay $10/month via our secure Stripe integration. Pick your favorite charity from our global database to receive your donation.", color: "from-emerald-400 to-cyan-400" },
              { num: "02", title: "Log Your Rounds", desc: "Hit the course. Every time you play, log your Stableford score (1-45) in your dashboard. These scores become your draw numbers.", color: "from-cyan-400 to-blue-500" },
              { num: "03", title: "Monthly Draw", desc: "Our engine automatically pulls 5 winning numbers. Match 3 or more of your scores to win a percentage of the massive global prize pool.", color: "from-blue-500 to-indigo-500" }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:bg-slate-800/60 transition-colors shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]">
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${step.color} p-[1px]`}>
                  <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-xl font-bold text-white">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA SECTION */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900/10"></div>
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-slate-700 p-12 md:p-16 rounded-[2.5rem] text-center relative z-10 backdrop-blur-xl shadow-2xl shadow-black/50">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to tee off?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto font-light">
            Join hundreds of amateur golfers who are winning cash and making a difference.
          </p>
          <Link 
            href="/login" 
            className="inline-block px-10 py-5 bg-white text-slate-950 font-black rounded-full transition-all hover:bg-slate-200 hover:scale-105 active:scale-95 text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* 5. MINIMAL FOOTER */}
      <footer className="py-8 border-t border-slate-800/50 bg-[#0a0f1a] text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 ImpactGolf Platform.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}