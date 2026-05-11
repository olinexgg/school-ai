'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ChatBubble } from '../../../../components/chat/ChatBubble'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export default function AuditSessionPage() {
  const { id } = useParams()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetch(`/api/messages?sessionId=${encodeURIComponent(String(id))}`, {
        credentials: 'include'
      })
        .then(async (res) => {
          if (res.status === 403) {
            const body = await res.json().catch(() => ({}))
            if (body?.code === 'TEACHER_PIN_REQUIRED') {
              router.push('/chat?teacherPin=1')
              return null
            }
          }
          return res.json()
        })
        .then((data) => {
          if (Array.isArray(data)) setMessages(data)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [id, router])

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
      <div className="border-b border-white/5 bg-zinc-900/40 px-6 py-4 flex items-center justify-between">
        <Link
          href="/teacher"
          className="text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-widest"
        >
          ← Back to overview
        </Link>
        <span className="text-[10px] text-zinc-600 font-mono">Session {id}</span>
      </div>

      <main className="flex-1 overflow-y-auto p-12 bg-zinc-950 relative">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 p-8 glass border-premium-blue/10 rounded-3xl text-center">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">
              Pedagogical compliance
            </p>
            <h2 className="text-xl font-bold mb-2">Socratic tutoring mode</h2>
            <p className="text-zinc-400 text-sm max-w-lg mx-auto italic">
              Verify that the AI avoids direct answers. It should give hints and counter-questions only.
            </p>
          </div>

          <div className="flex flex-col">
            {loading ? (
              <p className="text-center text-zinc-500 py-20">Loading transcript…</p>
            ) : messages.length === 0 ? (
              <p className="text-center text-zinc-500 py-20">No messages in this session.</p>
            ) : (
              messages.map((m) => <ChatBubble key={m.id} role={m.role} content={m.content} />)
            )}
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 text-center">
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
              End of transcript
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
