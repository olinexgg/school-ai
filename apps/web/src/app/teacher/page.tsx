'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

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
  const [sessions, setSessions] = useState<AuditSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/teacher/sessions')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSessions(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Audit Load Error:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-premium-blue/30">
      {/* Navigation Header */}
      <nav className="border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center shadow-premium">
              <span className="text-xl">🏫</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                SchoolAI <span className="text-zinc-500 font-medium">Admin</span>
              </h1>
              <p className="text-[10px] font-bold text-premium-blue uppercase tracking-widest">
                Teacher Portal v1.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/chat"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Switch to Student View
            </Link>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-premium-blue/20 border border-premium-blue/30 flex items-center justify-center text-[10px] font-bold text-premium-blue">
                TR
              </div>
              <span className="text-sm font-semibold text-zinc-200">Teacher Mode</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-8 rounded-3xl border-white/5">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
              Total Students
            </p>
            <h2 className="text-4xl font-bold">1</h2>
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <span>+100% from last week</span>
            </div>
          </div>
          <div className="glass p-8 rounded-3xl border-white/5">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
              Active Sessions
            </p>
            <h2 className="text-4xl font-bold">{sessions.length}</h2>
            <div className="mt-4 flex items-center gap-2 text-premium-blue text-xs font-bold">
              <span>Live Monitoring Active</span>
            </div>
          </div>
          <div className="glass p-8 rounded-3xl border-white/5">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">
              AI Compliance
            </p>
            <h2 className="text-4xl font-bold">98.4%</h2>
            <div className="mt-4 flex items-center gap-2 text-zinc-400 text-xs font-bold">
              <span>Socratic Method Enforced</span>
            </div>
          </div>
        </div>

        {/* Audit Table */}
        <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <h3 className="text-xl font-bold">Live Session Audit Logs</h3>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all">
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.01] text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <th className="px-8 py-6">Student</th>
                  <th className="px-8 py-6">Last Activity</th>
                  <th className="px-8 py-6">Recent Message</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-zinc-500 italic">
                      Loading audit data...
                    </td>
                  </tr>
                ) : sessions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-zinc-500 italic">
                      No audit logs found.
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
                          "{session.messages[0]?.content || 'Empty Session'}"
                        </p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Link
                          href={`/teacher/audit/${session.id}`}
                          className="px-4 py-2 rounded-xl bg-premium-blue/10 text-premium-blue text-xs font-bold hover:bg-premium-blue/20 transition-all active:scale-95"
                        >
                          Audit Chat
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
    </div>
  )
}
