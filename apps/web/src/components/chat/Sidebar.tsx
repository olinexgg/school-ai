'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { translations, Language } from '../../lib/translations'

interface Session {
  id: string
  updatedAt: string
  messages: { content: string }[]
}

interface SidebarProps {
  onNewChat?: () => void
  onSessionSelect?: (sessionId: string) => void
  currentSessionId?: string
  language: Language
  onLanguageChange: (lang: Language) => void
}

export function Sidebar({
  onNewChat,
  onSessionSelect,
  currentSessionId,
  language,
  onLanguageChange
}: SidebarProps) {
  const [sessions, setSessions] = useState<Session[]>([])
  const t = translations[language]

  const fetchSessions = () => {
    fetch('/api/sessions')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSessions(data)
      })
      .catch((err) => console.error('Error fetching sessions:', err))
  }

  useEffect(() => {
    fetchSessions()
    const interval = setInterval(fetchSessions, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <aside className="hidden lg:flex w-80 h-full border-r border-white/5 bg-zinc-950/80 backdrop-blur-2xl flex-col z-30">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform duration-500">
            <span className="text-xl">🏫</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-white leading-tight">
              School<span className="text-gradient">AI</span>
            </span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none mt-1">
              Apertus v1.2
            </span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-1">
        <div className="px-4 py-2 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-2">
          {t.recentSessions}
        </div>

        {sessions.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-xs text-zinc-600 italic">{t.noSessions}</p>
          </div>
        ) : (
          sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSessionSelect?.(session.id)}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-300 group ${session.id === currentSessionId ? 'glass-lighter border-premium-violet/20' : 'hover:bg-white/[0.03]'}`}
            >
              <div className="flex items-center gap-3">
                {session.id === currentSessionId && (
                  <div className="w-1.5 h-1.5 rounded-full bg-premium-violet shadow-[0_0_8px_rgba(139,92,246,0.6)]"></div>
                )}
                <p
                  className={`text-sm font-semibold truncate ${session.id === currentSessionId ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'} ${session.id !== currentSessionId && 'ml-4'}`}
                >
                  {session.messages[0]?.content || t.emptySession}
                </p>
              </div>
              <p
                className={`text-[10px] font-bold mt-2 uppercase tracking-wider ml-4 ${session.id === currentSessionId ? 'text-zinc-500' : 'text-zinc-600'}`}
              >
                {session.id === currentSessionId
                  ? t.currentSession
                  : new Date(session.updatedAt).toLocaleDateString()}
              </p>
            </button>
          ))
        )}
      </div>

      <div className="p-6 border-t border-white/5 space-y-4">
        {/* Language Switcher */}
        <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
          <button
            onClick={() => onLanguageChange('de')}
            className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${language === 'de' ? 'bg-white text-zinc-950 shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            DEUTSCH
          </button>
          <button
            onClick={() => onLanguageChange('en')}
            className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${language === 'en' ? 'bg-white text-zinc-950 shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            ENGLISH
          </button>
        </div>

        <button
          onClick={onNewChat}
          className="w-full py-4 rounded-2xl bg-white text-zinc-950 hover:bg-zinc-200 transition-all duration-300 font-bold text-sm flex justify-center items-center gap-3 shadow-xl active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          {t.newChat}
        </button>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs border border-white/5 text-zinc-400 font-bold">
              DU
            </div>
            <span className="text-xs font-bold text-zinc-400">{t.demoUser}</span>
          </div>
          <button className="text-zinc-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}
