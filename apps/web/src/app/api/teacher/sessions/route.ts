import { db } from 'database'
import { getSessionUser } from '../../../../lib/server-auth'

export async function GET() {
  try {
    const user = await getSessionUser()
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (user.role !== 'TEACHER') {
      return Response.json({ error: 'Forbidden' }, { status: 403 })
    }

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
