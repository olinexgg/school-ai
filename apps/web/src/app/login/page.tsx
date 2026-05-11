'use client'

import React, { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('schoolai_user', JSON.stringify(data.user))
        const next = searchParams.get('next')
        const safe =
          next && next.startsWith('/') && !next.startsWith('//') ? next : '/chat'
        router.push(safe)
      } else {
        setError(data.error || 'Login failed')
      }
    } catch {
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md z-10">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-premium rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-premium animate-slow-glow">
          <span className="text-3xl">🏫</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 font-display">
          Welcome Back
        </h1>
        <p className="text-zinc-500 font-medium">Log in to your SchoolAI account</p>
      </div>

      <div className="glass p-10 rounded-[2.5rem] border-white/5 shadow-2xl">
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-premium-violet/50 transition-all"
              placeholder="name@school.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-premium-violet/50 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-zinc-950 font-bold py-5 rounded-2xl hover:bg-zinc-200 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-premium-violet font-bold hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>

      <p className="mt-12 text-[10px] text-zinc-600 text-center uppercase tracking-[0.3em] font-bold">
        Safe & Private AI Tutoring
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-premium-violet/10 rounded-full blur-[120px] pointer-events-none" />
      <Suspense
        fallback={
          <div className="w-full max-w-md z-10 flex justify-center py-24">
            <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  )
}
