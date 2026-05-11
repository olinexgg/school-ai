import { db } from 'database'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return Response.json({ error: 'Session ID is required' }, { status: 400 })
    }

    const messages = await db.message.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' }
    })

    return Response.json(messages)
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return Response.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}
