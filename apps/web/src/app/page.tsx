import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-premium-violet/10 rounded-full blur-[120px] pointer-events-none animate-slow-glow"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-premium-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="h-24 px-8 lg:px-16 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center shadow-premium">
            <span className="text-xl">🏫</span>
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            School<span className="text-gradient">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-8">
          <Link
            href="/login"
            className="text-sm font-bold text-zinc-400 hover:text-white transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-white text-zinc-950 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Apertus v1.2 is now live
          </span>
        </div>

        <h1 className="text-6xl lg:text-8xl font-extrabold text-white tracking-tighter mb-8 font-display max-w-4xl leading-[0.9]">
          The Socratic AI <br /> <span className="text-gradient">Tutor for Schools.</span>
        </h1>

        <p className="text-zinc-400 text-lg lg:text-xl max-w-2xl mb-12 leading-relaxed">
          Not just another AI. Apertus guides you through your homework with targeted hints and
          counter-questions. No shortcuts, just pure learning.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link
            href="/register"
            className="px-10 py-5 bg-white text-zinc-950 rounded-2xl font-bold text-lg hover:bg-zinc-200 transition-all active:scale-95 shadow-2xl"
          >
            Start Learning for Free
          </Link>
          <Link
            href="/teacher"
            className="px-10 py-5 glass border-white/5 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
          >
            Teacher Portal
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="h-24 flex items-center justify-center px-6 border-t border-white/5">
        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">
          Designed for the Future of Education
        </p>
      </div>
    </main>
  )
}
