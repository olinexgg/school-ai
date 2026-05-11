import { db } from 'database'
import { requireTeacherWithGate } from '../../../../lib/teacher-api-guard'

export async function GET() {
  try {
    const gate = await requireTeacherWithGate()
    if (!gate.ok) {
      return Response.json({ error: gate.error, code: gate.code }, { status: gate.status })
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
