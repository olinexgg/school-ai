'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChatBubble } from '../../../../components/chat/ChatBubble'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export default function AuditSessionPage() {
  const { id } = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetch(`/api/messages?sessionId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setMessages(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error('Audit Detail Load Error:', err)
          setLoading(false)
        })
    }
  }, [id])

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
      {/* Audit Header */}
      <nav className="border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/teacher"
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:-translate-x-1 transition-transform"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Monitoring Session</h1>
              <p className="text-[10px] font-bold text-premium-blue uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-premium-blue animate-pulse"></span>
                Audit ID: {id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest">
              Review Required
            </div>
            <button className="px-6 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-500/20 transition-all">
              Flag Session
            </button>
          </div>
        </div>
      </nav>

      {/* Chat History View (Read Only) */}
      <main className="flex-1 overflow-y-auto p-12 bg-zinc-950 relative">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 p-8 glass border-premium-blue/10 rounded-3xl text-center">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">
              Pedagogical Compliance Note
            </p>
            <h2 className="text-xl font-bold mb-2">Socratic Tutoring Mode</h2>
            <p className="text-zinc-400 text-sm max-w-lg mx-auto italic">
              "Verify that the AI is not giving direct answers. In this mode, the assistant should
              only provide hints and ask counter-questions."
            </p>
          </div>

          <div className="flex flex-col">
            {loading ? (
              <p className="text-center text-zinc-500 py-20">Loading chat logs...</p>
            ) : messages.length === 0 ? (
              <p className="text-center text-zinc-500 py-20">No messages found in this session.</p>
            ) : (
              messages.map((m) => <ChatBubble key={m.id} role={m.role} content={m.content} />)
            )}
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 text-center">
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
              End of Transcript
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
