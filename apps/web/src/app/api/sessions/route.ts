import { db } from 'database'

export async function GET() {
  try {
    // Hole alle Sessions für den Demo-User
    const sessions = await db.chatSession.findMany({
      where: { userId: 'demo-user-1' },
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 1
        }
      }
    })

    return Response.json(sessions)
  } catch (error) {
    console.error('Failed to fetch sessions:', error)
    return Response.json({ error: 'Failed to fetch sessions' }, { status: 500 })
  }
}
