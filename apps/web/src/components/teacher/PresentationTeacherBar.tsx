'use client'

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

type Status = { unlocked: boolean; pinConfigured: boolean }

function BarInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<Status | null>(null)
  const [pin, setPin] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const refresh = useCallback(() => {
    fetch('/api/teacher/presentation-status', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => {
        if (d && typeof d.unlocked === 'boolean') {
          setStatus({ unlocked: d.unlocked, pinConfigured: Boolean(d.pinConfigured) })
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const pinRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchParams.get('teacherPin') === '1') {
      setPin('')
      setErr('')
      queueMicrotask(() => pinRef.current?.focus())
    }
  }, [searchParams])

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setErr('')
    try {
      const res = await fetch('/api/teacher/presentation-unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ pin })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErr(data.error || 'Could not unlock')
        setBusy(false)
        return
      }
      setPin('')
      refresh()
      router.replace('/chat')
      router.refresh()
    } catch {
      setErr('Network error')
    } finally {
      setBusy(false)
    }
  }

  const lock = async () => {
    setBusy(true)
    await fetch('/api/teacher/presentation-lock', { method: 'POST', credentials: 'include' })
    refresh()
    setBusy(false)
    router.refresh()
  }

  if (!status) {
    return (
      <div className="shrink-0 z-[60] border-b border-amber-500/30 bg-amber-950/90 px-4 py-2 text-amber-100 text-xs">
        Teacher mode…
      </div>
    )
  }

  const showPinForm = status.pinConfigured && !status.unlocked

  return (
    <div className="shrink-0 z-[60] border-b border-amber-500/40 bg-gradient-to-r from-amber-950 via-zinc-900 to-zinc-950 px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-amber-300 font-black text-xs uppercase tracking-[0.2em] shrink-0">
            Teacher mode
          </span>
          {!status.pinConfigured && (
            <span className="text-zinc-500 text-xs truncate">
              (No PIN on server — dashboard open to any logged-in user)
            </span>
          )}
          {status.pinConfigured && status.unlocked && (
            <span className="text-emerald-400 text-xs font-bold">Unlocked</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {showPinForm && (
            <form onSubmit={unlock} className="flex items-center gap-2">
              {err && <span className="text-red-400 text-xs max-w-[140px]">{err}</span>}
              <input
                ref={pinRef}
                type="password"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-28 bg-black/40 border border-amber-500/40 rounded-lg px-2 py-1.5 text-sm text-white placeholder:text-zinc-600"
                maxLength={32}
              />
              <button
                type="submit"
                disabled={busy || !pin.trim()}
                className="px-3 py-1.5 rounded-lg bg-amber-400 text-zinc-950 text-xs font-bold disabled:opacity-40"
              >
                {busy ? '…' : 'Unlock'}
              </button>
            </form>
          )}

          {status.unlocked && (
            <>
              <Link
                href="/teacher"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10"
              >
                Open dashboard
              </Link>
              {status.pinConfigured && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={lock}
                  className="px-3 py-1.5 rounded-lg border border-zinc-600 text-zinc-300 text-xs font-bold hover:bg-white/5"
                >
                  Lock
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function PresentationTeacherBar() {
  return (
    <Suspense
      fallback={
        <div className="shrink-0 z-[60] border-b border-amber-500/30 bg-amber-950/90 px-4 py-2 text-amber-100 text-xs">
          Teacher mode…
        </div>
      }
    >
      <BarInner />
    </Suspense>
  )
}
