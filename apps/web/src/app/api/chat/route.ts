import { createOpenAI } from '@ai-sdk/openai'
import { streamText, UIMessage } from 'ai'
import { db } from 'database'

// 1. Initialisiere den OpenAI-Provider mit der Ollama Basis-URL
const ollama = createOpenAI({
  baseURL: 'http://127.0.0.1:11435/v1',
  apiKey: 'ollama' // apiKey wird von Ollama ignoriert, ist aber für die Bibliothek nötig
})

export async function POST(req: Request) {
  try {
    const {
      messages,
      id: chatId,
      language = 'de'
    }: { messages: UIMessage[]; id?: string; language?: string } = await req.json()

    // Sanitize messages for AI SDK compatibility
    const sanitizedMessages = messages.map((m) => ({
      ...m,
      content:
        (m as any).parts
          ?.filter((p: any) => p.type === 'text')
          .map((p: any) => p.text)
          .join('') || ''
    }))

    // 2. Erstelle/Hole Demo-User
    const user = await db.user.upsert({
      where: { email: 'demo@schoolai.local' },
      update: {},
      create: {
        id: 'demo-user-1',
        email: 'demo@schoolai.local',
        role: 'STUDENT'
      }
    })

    // 3. Hole oder erstelle eine Chat-Session
    const sessionId = chatId || 'demo-session-1'

    const session = await db.chatSession.upsert({
      where: { id: sessionId },
      update: {
        updatedAt: new Date()
      },
      create: {
        id: sessionId,
        userId: user.id
      }
    })

    // Letzte Nachricht des Users in der DB speichern
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

    const systemPrompt =
      language === 'en'
        ? `
        You are Apertus, a Socratic tutor. 
        Your goal is to help students find the answer themselves.
        Never give the direct solution. 
        Instead, ask targeted counter-questions that encourage the student to think.
        Be motivating, patient, and friendly.
        Always respond in English.
      `
        : `
        Du bist Apertus, ein sokratischer Tutor. 
        Deine Aufgabe ist es, Schülern zu helfen, die Antwort selbst zu finden.
        Gib niemals die direkte Lösung. 
        Stelle stattdessen gezielte Gegenfragen, die den Schüler zum Nachdenken anregen.
        Sei motivierend, geduldig und freundlich.
        Antworte immer auf Deutsch.
      `

    // AI-Aufruf
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
