import React from 'react'

export default function LandingPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 p-6 lg:p-24">
      {/* Background Glows */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-white/10 bg-gradient-to-b from-zinc-900 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-zinc-900/50 lg:p-4">
          <code className="font-bold text-premium-violet">v1.0.0-staging</code>
        </p>
      </div>

      <div className="relative flex flex-col items-center place-items-center">
        <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight mb-4 text-center">
          School<span className="text-gradient">AI</span>
        </h1>
        <p className="text-zinc-400 text-lg lg:text-2xl text-center max-w-2xl mb-12">
          Experience the future of learning. A patient, intelligent tutor that helps you understand,
          not just finish.
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          <a
            href="/chat"
            className="glass group px-8 py-4 rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-all duration-300"
          >
            <span className="font-semibold">Start Learning</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <button className="px-8 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <span className="font-semibold text-zinc-400">Teacher Portal</span>
          </button>
        </div>
      </div>

      <div className="mt-24 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left gap-8">
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-2xl font-semibold mb-3 text-premium-violet">Socratic Method</h2>
          <p className="text-zinc-400 text-sm">
            Our AI (Apertus) never gives you the answer. It asks the right questions to lead you
            there.
          </p>
        </div>
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-2xl font-semibold mb-3 text-premium-blue">Privacy First</h2>
          <p className="text-zinc-400 text-sm">
            Everything runs on local hardware. Your data never leaves the school network.
          </p>
        </div>
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-2xl font-semibold mb-3 text-emerald-500">Teacher Audit</h2>
          <p className="text-zinc-400 text-sm">
            Complete transparency. Teachers can review chat logs to see where students are
            struggling.
          </p>
        </div>
      </div>
    </main>
  )
}
