'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Policy = {
  blockFullEssays: boolean
  blockDirectHomeworkAnswers: boolean
  blockExamSolutions: boolean
  requireSocraticStyle: boolean
}

const labels: Record<keyof Policy, { title: string; hint: string }> = {
  blockFullEssays: {
    title: 'No full essays',
    hint: 'Block the tutor from drafting complete essays or submission-ready long prose for students.'
  },
  blockDirectHomeworkAnswers: {
    title: 'No finished homework answers',
    hint: 'Keep answers Socratic—hints and guiding questions instead of full solutions.'
  },
  blockExamSolutions: {
    title: 'No model exam solutions',
    hint: 'Avoid fully worked exam papers; allow strategies and self-check prompts.'
  },
  requireSocraticStyle: {
    title: 'Strict Socratic tone',
    hint: 'Reinforce counter-questions instead of direct answers whenever appropriate.'
  }
}

export default function TeacherSettingsPage() {
  const router = useRouter()
  const [policy, setPolicy] = useState<Policy | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/teacher/policy', { credentials: 'include' })
      .then((res) => {
        if (res.status === 403) {
          router.push('/teacher/unlock?next=%2Fteacher%2Fsettings')
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data && typeof data.blockFullEssays === 'boolean') {
          setPolicy({
            blockFullEssays: data.blockFullEssays,
            blockDirectHomeworkAnswers: data.blockDirectHomeworkAnswers,
            blockExamSolutions: data.blockExamSolutions,
            requireSocraticStyle: data.requireSocraticStyle
          })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [router])

  const save = async () => {
    if (!policy) return
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/teacher/policy', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(policy)
      })
      if (res.status === 403) {
        router.push('/teacher/unlock?next=%2Fteacher%2Fsettings')
        return
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        setMessage(err.error || 'Save failed')
        return
      }
      setMessage('Saved. New chats will use these rules immediately.')
    } finally {
      setSaving(false)
    }
  }

  const toggle = (key: keyof Policy) => {
    setPolicy((p) => (p ? { ...p, [key]: !p[key] } : p))
  }

  if (loading || !policy) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16 text-zinc-500 text-sm">Loading policy…</main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/teacher" className="text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-widest">
          ← Back to overview
        </Link>
        <h1 className="text-3xl font-bold mt-4">Student chat protection</h1>
        <p className="text-zinc-500 mt-2 text-sm leading-relaxed">
          These options append strict rules to the tutor system prompt for every student message. They
          complement the built-in Socratic behaviour.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {(Object.keys(labels) as (keyof Policy)[]).map((key) => (
          <label
            key={key}
            className="flex gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors"
          >
            <input
              type="checkbox"
              checked={policy[key]}
              onChange={() => toggle(key)}
              className="mt-1 w-4 h-4 rounded border-zinc-600"
            />
            <div>
              <p className="font-bold text-white">{labels[key].title}</p>
              <p className="text-sm text-zinc-500 mt-1">{labels[key].hint}</p>
            </div>
          </label>
        ))}
      </div>

      {message && (
        <p className="text-sm text-emerald-400 mb-4" role="status">
          {message}
        </p>
      )}

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="px-8 py-4 rounded-2xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 disabled:opacity-40"
      >
        {saving ? 'Saving…' : 'Save protection profile'}
      </button>
    </main>
  )
}
