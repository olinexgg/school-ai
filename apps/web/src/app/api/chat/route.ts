import { createOpenAI } from '@ai-sdk/openai'
import { streamText, UIMessage } from 'ai'
import { db } from 'database'
import { getSessionUser } from '../../../lib/server-auth'
import {
  mergePolicyWithDefaults,
  policyAppendixDe,
  policyAppendixEn
} from '../../../lib/teacher-policy-prompt'

const ollama = createOpenAI({
  baseURL: 'http://127.0.0.1:11435/v1',
  apiKey: 'ollama'
})

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      messages,
      id: chatId,
      language = 'de'
    }: { messages: UIMessage[]; id?: string; language?: string } = await req.json()

    if (!chatId) {
      return Response.json({ error: 'Chat session id is required' }, { status: 400 })
    }

    const sanitizedMessages = messages.map((m) => ({
      ...m,
      content:
        (m as any).parts
          ?.filter((p: any) => p.type === 'text')
          .map((p: any) => p.text)
          .join('') || ''
    }))

    const existing = await db.chatSession.findUnique({
      where: { id: chatId },
      select: { userId: true }
    })

    if (existing) {
      if (existing.userId !== user.id) {
        return Response.json({ error: 'Forbidden' }, { status: 403 })
      }
      await db.chatSession.update({
        where: { id: chatId },
        data: { updatedAt: new Date() }
      })
    } else {
      await db.chatSession.create({
        data: {
          id: chatId,
          userId: user.id
        }
      })
    }

    const session = await db.chatSession.findUniqueOrThrow({
      where: { id: chatId }
    })

    const lastUserMessage = sanitizedMessages[sanitizedMessages.length - 1]
    if (lastUserMessage && lastUserMessage.role === 'user') {
      await db.message.create({
        data: {
          sessionId: session.id,
          role: 'user',
          content: lastUserMessage.content
        }
      })
    }

    const policyRow = await db.teacherPolicy.findUnique({ where: { id: 'global' } })
    const policyFlags = mergePolicyWithDefaults(policyRow)
    const policyExtra =
      language === 'en' ? policyAppendixEn(policyFlags) : policyAppendixDe(policyFlags)

    const systemPrompt =
      language === 'en'
        ? `
        You are Apertus, a Socratic tutor. 
        Your goal is to help students find the answer themselves.
        Never give the direct solution. 
        Instead, ask targeted counter-questions that encourage the student to think.
        Be motivating, patient, and friendly.
        Always respond in English.
      `.trim() + policyExtra
        : `
        Du bist Apertus, ein sokratischer Tutor. 
        Deine Aufgabe ist es, Schülern zu helfen, die Antwort selbst zu finden.
        Gib niemals die direkte Lösung. 
        Stelle stattdessen gezielte Gegenfragen, die den Schüler zum Nachdenken anregen.
        Sei motivierend, geduldig und freundlich.
        Antworte immer auf Deutsch.
      `.trim() + policyExtra

    const result = await streamText({
      model: ollama('apertus-tutor'),
      messages: sanitizedMessages,
      system: systemPrompt,
      onFinish: async ({ text }) => {
        try {
          await db.message.create({
            data: {
              sessionId: session.id,
              role: 'assistant',
              content: text
            }
          })
        } catch (dbError) {
          console.error('Failed to save AI message to DB:', dbError)
        }
      }
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(JSON.stringify({ error: 'Database or AI Connection Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
