import { db } from 'database'
import { getSessionUser } from '../../../lib/server-auth'

export async function GET() {
  try {
    const user = await getSessionUser()
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessions = await db.chatSession.findMany({
      where: { userId: user.id },
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
