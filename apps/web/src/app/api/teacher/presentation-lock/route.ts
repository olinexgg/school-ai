import { cookies } from 'next/headers'
import { getSessionUser } from '../../../../lib/server-auth'
import { TEACHER_DEMO_COOKIE_NAME } from '../../../../lib/auth-cookie'

export async function POST() {
  const user = await getSessionUser()
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  ;(await cookies()).delete(TEACHER_DEMO_COOKIE_NAME)
  return Response.json({ ok: true })
}
