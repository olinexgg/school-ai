import { cookies } from 'next/headers'
import { getSessionUser } from '../../../../lib/server-auth'
import {
  TEACHER_DEMO_COOKIE_NAME,
  teacherDemoCookieOptions
} from '../../../../lib/auth-cookie'
import { teacherPinMatches } from '../../../../lib/teacher-pin'
import { teacherPinRateLimit, teacherPinReset } from '../../../../lib/teacher-pin-rate-limit'

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const envPin = process.env.TEACHER_PRESENTATION_PIN?.trim()
    if (!envPin) {
      return Response.json({ error: 'Presentation PIN is not configured on the server' }, { status: 400 })
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'local'
    const rlKey = `pres:${user.id}:${ip}`
    const rl = teacherPinRateLimit(rlKey)
    if (!rl.ok) {
      return Response.json(
        { error: 'Too many attempts' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
      )
    }

    const { pin } = (await req.json()) as { pin?: string }
    if (!pin || !teacherPinMatches(envPin, pin)) {
      return Response.json({ error: 'Wrong PIN' }, { status: 401 })
    }

    teacherPinReset(rlKey)
    ;(await cookies()).set(TEACHER_DEMO_COOKIE_NAME, '1', teacherDemoCookieOptions())
    return Response.json({ ok: true })
  } catch (e) {
    console.error('presentation-unlock', e)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
