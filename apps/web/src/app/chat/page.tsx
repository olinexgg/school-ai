'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Sidebar } from '../../components/chat/Sidebar'
import { ChatBubble } from '../../components/chat/ChatBubble'
import { ChatInput } from '../../components/chat/ChatInput'
import { translations, Language } from '../../lib/translations'

export default function ChatPage() {
  const router = useRouter()
  const [sessionId, setSessionId] = useState<string | undefined>(undefined)
  const [language, setLanguage] = useState<Language>('de')

  const t = React.useMemo(() => translations[language], [language])

  const transport = React.useMemo(
    () => new DefaultChatTransport({ credentials: 'include' }),
    []
  )

  useEffect(() => {
    queueMicrotask(() => {
      if (typeof window === 'undefined') return
      const savedId = localStorage.getItem('schoolai_current_session')
      const savedLang = localStorage.getItem('schoolai_language') as Language

      setSessionId(savedId || crypto.randomUUID())
      if (savedLang) setLanguage(savedLang)
    })
  }, [])

  const { messages, sendMessage, status, error, clearError, setMessages } = useChat({
    id: sessionId,
    transport
  })

  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isLoading = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    if (!sessionId) return

    fetch(`/api/messages?sessionId=${encodeURIComponent(sessionId)}`, {
      credentials: 'include'
    })
      .then((res) => {
        if (res.status === 401) {
          router.push('/login?next=/chat')
          return null
        }
        if (res.status === 403 || res.status === 404) {
          const nextId = crypto.randomUUID()
          localStorage.setItem('schoolai_current_session', nextId)
          setSessionId(nextId)
          setMessages([])
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (!data || !Array.isArray(data)) return
        const formattedMessages = data.map((m) => ({
          id: m.id,
          role: m.role as 'user' | 'assistant',
          parts: [{ type: 'text' as const, text: m.content }]
        }))
        setMessages(formattedMessages)
      })
      .catch((err) => console.error('Error loading historical messages:', err))
  }, [sessionId, setMessages, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    if (error) clearError()

    sendMessage({ text: input }, { body: { language } })
    setInput('')
  }

  const handleNewChat = () => {
    const newId = crypto.randomUUID()
    localStorage.setItem('schoolai_current_session', newId)
    setSessionId(newId)
    setMessages([])
  }

  const handleSessionSelect = (id: string) => {
    localStorage.setItem('schoolai_current_session', id)
    setSessionId(id)
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('schoolai_language', lang)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex h-screen w-full bg-zinc-950 overflow-hidden">
      <Sidebar
        onNewChat={handleNewChat}
        onSessionSelect={handleSessionSelect}
        currentSessionId={sessionId}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      <main className="flex-1 flex flex-col relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-violet/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-premium-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="flex-1 overflow-y-auto px-6 py-10 lg:px-12 lg:py-16 z-10 scroll-smooth">
          <div className="max-w-3xl mx-auto flex flex-col min-h-full">
            {error && (
              <div className="mb-8 p-5 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center justify-between backdrop-blur-xl">
                <span>
                  {t.errorTitle}: {error.message}
                </span>
                <button
                  onClick={() => clearError()}
                  className="underline font-bold hover:text-red-300 transition-colors"
                >
                  {t.delete}
                </button>
              </div>
            )}

            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center mb-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-premium-violet to-premium-blue rounded-[2.5rem] mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.4)] animate-pulse">
                  <span className="text-5xl">🦉</span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4 font-display tracking-tight">
                  {t.welcomeTitle}
                </h1>
                <p className="text-zinc-400 max-w-md mx-auto text-lg leading-relaxed">
                  {t.welcomeSub}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((m) => {
                  const textContent =
                    m.parts
                      ?.filter((part) => part.type === 'text')
                      .map((part) => ('text' in part ? part.text : ''))
                      .join('') || ''

                  return (
                    <ChatBubble
                      key={m.id}
                      role={m.role as 'user' | 'assistant'}
                      content={textContent}
                    />
                  )
                })}
              </div>
            )}

            {isLoading && (
              <div className="flex items-center gap-2 mt-4 ml-2">
                <div className="w-2 h-2 rounded-full bg-premium-violet animate-ping"></div>
                <span className="text-xs text-premium-violet font-medium">{t.thinking}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          placeholder={t.inputPlaceholder}
        />
      </main>
    </div>
  )
}
