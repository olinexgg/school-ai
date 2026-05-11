import { db } from 'database'
import { getSessionUser } from '../../../lib/server-auth'
import { requireTeacherPresentationMode } from '../../../lib/teacher-presentation'

export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return Response.json({ error: 'Session ID is required' }, { status: 400 })
    }

    const session = await db.chatSession.findUnique({
      where: { id: sessionId },
      select: { userId: true }
    })

    if (!session) {
      return Response.json({ error: 'Not found' }, { status: 404 })
    }

    const isOwner = session.userId === user.id
    if (!isOwner) {
      const mode = await requireTeacherPresentationMode()
      if (!mode.ok) {
        return Response.json({ error: mode.error, code: mode.code }, { status: mode.status })
      }
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
