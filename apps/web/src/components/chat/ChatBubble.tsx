import React from 'react'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === 'user'

  return (
    <div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500`}
    >
      <div
        className={`relative flex flex-col max-w-[85%] md:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}
      >
        {/* Role Label */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-3 ml-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-premium flex items-center justify-center text-sm shadow-premium">
              <span>🦉</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-premium-violet uppercase tracking-[0.2em] leading-none">
                AI Tutor
              </span>
              <span className="text-sm font-display font-bold text-white">APERTUS</span>
            </div>
          </div>
        )}

        {isUser && (
          <div className="flex items-center gap-2 mb-3 mr-1">
            <span className="text-[10px] font-bold text-premium-blue uppercase tracking-[0.2em] leading-none">
              Student
            </span>
          </div>
        )}

        {/* Message Content */}
        <div
          className={`relative overflow-hidden rounded-3xl px-6 py-4 shadow-2xl transition-all duration-300 min-w-[120px] ${
            isUser
              ? 'bg-premium-blue text-white rounded-tr-sm shadow-[0_0_30px_rgba(59,130,246,0.3)]'
              : 'bg-zinc-900/80 backdrop-blur-xl rounded-tl-sm text-zinc-100 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]'
          }`}
        >
          {/* Subtle reflection effect for assistant bubble */}
          {!isUser && (
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none"></div>
          )}

          <div className="relative leading-relaxed whitespace-pre-wrap text-[15px] md:text-base font-medium selection:bg-white/20">
            {content}
          </div>
        </div>

        {/* Time / Status (Optional) */}
        <div
          className={`mt-2 px-2 text-[10px] font-medium text-zinc-600 uppercase tracking-widest ${isUser ? 'text-right' : 'text-left'}`}
        >
          {isUser ? 'Delivered' : 'AI Response'}
        </div>
      </div>
    </div>
  )
}
