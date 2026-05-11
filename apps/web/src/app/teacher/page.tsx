'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface AuditSession {
  id: string
  updatedAt: string
  user: {
    email: string
    role: string
  }
  messages: {
    content: string
    role: string
  }[]
}

export default function TeacherDashboard() {
  const router = useRouter()
  const [sessions, setSessions] = useState<AuditSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/teacher/sessions', { credentials: 'include' })
      .then(async (res) => {
        if (res.status === 401) {
          router.push('/login?next=/teacher')
          return null
        }
        if (res.status === 403) {
          const body = await res.json().catch(() => ({}))
          if (body?.code === 'TEACHER_PIN_REQUIRED') {
            router.push('/teacher/unlock?next=%2Fteacher')
            return null
          }
          router.push('/chat')
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data)) setSessions(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Audit Load Error:', err)
        setLoading(false)
      })
  }, [router])

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="text-zinc-500 text-sm mt-2">
          Live sessions and audit trail. Configure{' '}
          <Link href="/teacher/settings" className="text-premium-blue font-semibold hover:underline">
            chat protection
          </Link>{' '}
          for all students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass p-8 rounded-3xl border-white/5">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Active sessions</p>
          <h2 className="text-4xl font-bold">{sessions.length}</h2>
          <p className="mt-4 text-premium-blue text-xs font-bold">Across all students</p>
        </div>
        <div className="glass p-8 rounded-3xl border-white/5">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Unique students</p>
          <h2 className="text-4xl font-bold">
            {new Set(sessions.map((s) => s.user.email)).size}
          </h2>
          <p className="mt-4 text-zinc-400 text-xs font-bold">In current snapshot</p>
        </div>
        <div className="glass p-8 rounded-3xl border-white/5">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Protection</p>
          <h2 className="text-4xl font-bold">Live</h2>
          <p className="mt-4 text-zinc-400 text-xs font-bold">
            <Link href="/teacher/settings" className="hover:text-white underline">
              Edit rules
            </Link>
          </p>
        </div>
      </div>

      <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <h3 className="text-xl font-bold">Session audit</h3>
          <span className="text-xs text-zinc-500 uppercase tracking-widest">Read-only</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.01] text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Student</th>
                <th className="px-8 py-6">Last activity</th>
                <th className="px-8 py-6">Recent message</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-zinc-500 italic">
                    Loading audit data…
                  </td>
                </tr>
              ) : sessions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-zinc-500 italic">
                    No sessions yet.
                  </td>
                </tr>
              ) : (
                sessions.map((session) => (
                  <tr key={session.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500 border border-white/5">
                          ST
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{session.user.email}</p>
                          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                            {session.user.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-zinc-400">
                      {new Date(session.updatedAt).toLocaleString('de-DE')}
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-zinc-300 max-w-xs truncate italic">
                        {session.messages[0]?.content || 'Empty session'}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link
                        href={`/teacher/audit/${session.id}`}
                        className="px-4 py-2 rounded-xl bg-premium-blue/10 text-premium-blue text-xs font-bold hover:bg-premium-blue/20 transition-all active:scale-95"
                      >
                        Open transcript
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
