'use client'

import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function UnlockForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason')
  const next = searchParams.get('next') || '/teacher'
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (reason === 'config') {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 rounded-3xl border border-amber-500/30 bg-amber-500/10 text-amber-100 text-sm leading-relaxed">
        <p className="font-bold text-amber-200 mb-2">Teacher portal not configured</p>
        <p>
          Set environment variables <code className="text-amber-50">TEACHER_PORTAL_PIN</code> and{' '}
          <code className="text-amber-50">TEACHER_GATE_HMAC_SECRET</code> on the server, then redeploy.
        </p>
      </div>
    )
  }

  const safeNext =
    next.startsWith('/') && !next.startsWith('//') ? next : '/teacher'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/teacher/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ pin })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'PIN verification failed')
        setLoading(false)
        return
      }
      router.push(safeNext)
      router.refresh()
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 px-6">
      <h1 className="text-2xl font-bold mb-2">Teacher PIN</h1>
      <p className="text-zinc-500 text-sm mb-8">
        Enter the school PIN to open the teacher portal on this device. Session lasts 8 hours.
      </p>
      <form onSubmit={submit} className="space-y-4">
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
            {error}
          </div>
        )}
        <input
          type="password"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white tracking-widest text-center text-lg"
          placeholder="••••••"
          maxLength={32}
        />
        <button
          type="submit"
          disabled={loading || !pin.trim()}
          className="w-full py-4 rounded-2xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 disabled:opacity-40"
        >
          {loading ? 'Checking…' : 'Unlock'}
        </button>
      </form>
    </div>
  )
}

export default function TeacherUnlockPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto mt-20 text-center text-zinc-500 text-sm">Loading…</div>
      }
    >
      <UnlockForm />
    </Suspense>
  )
}
