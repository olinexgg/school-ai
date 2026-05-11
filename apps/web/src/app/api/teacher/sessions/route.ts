import { db } from 'database'

export async function GET() {
  try {
    // Hole alle Sessions inklusive Nutzer-Infos und der letzten Nachricht
    const sessions = await db.chatSession.findMany({
      include: {
        user: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    return Response.json(sessions)
  } catch (error) {
    console.error('Teacher API Error:', error)
    return Response.json({ error: 'Failed to fetch audit logs' }, { status: 500 })
  }
}
