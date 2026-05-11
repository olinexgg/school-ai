'use client'

import React from 'react'

interface ChatInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  placeholder?: string
}

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  placeholder = 'Ask Apertus anything...'
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) {
        handleSubmit(e as any)
      }
    }
  }

  return (
    <div className="relative z-20 px-6 pb-8 pt-4">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="relative glass rounded-[2rem] p-2 pr-3 flex items-end gap-2 border-white/10 focus-within:border-premium-violet/40 transition-all duration-500 shadow-2xl"
        >
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-zinc-500 py-4 px-6 resize-none max-h-60 min-h-[60px] text-sm leading-relaxed"
          />

          <button
            type="submit"
            disabled={!input.trim()}
            className="mb-1.5 w-11 h-11 rounded-full bg-white text-zinc-950 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-20 disabled:grayscale disabled:scale-100 shadow-xl"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
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
              >
                <path d="m5 12 7-7 7 7" />
                <path d="M12 19V5" />
              </svg>
            )}
          </button>
        </form>
        <p className="text-[10px] text-zinc-600 text-center mt-4 uppercase tracking-[0.2em] font-bold">
          Apertus AI can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  )
}
