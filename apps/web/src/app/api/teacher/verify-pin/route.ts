import { cookies } from 'next/headers'
import { getSessionUser } from '../../../../lib/server-auth'
import {
  TEACHER_GATE_COOKIE_NAME,
  teacherGateCookieOptions
} from '../../../../lib/auth-cookie'
import { teacherPinMatches } from '../../../../lib/teacher-pin'
import { teacherPinRateLimit, teacherPinReset } from '../../../../lib/teacher-pin-rate-limit'
import { signTeacherGate, teacherGateConfigured } from '../../../../lib/teacher-gate'

export async function POST(req: Request) {
  try {
    if (!teacherGateConfigured()) {
      return Response.json({ error: 'Teacher PIN is not configured' }, { status: 503 })
    }

    const user = await getSessionUser()
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (user.role !== 'TEACHER') {
      return Response.json({ error: 'Forbidden' }, { status: 403 })
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'local'
    const rlKey = `${user.id}:${ip}`
    const rl = teacherPinRateLimit(rlKey)
    if (!rl.ok) {
      return Response.json(
        { error: 'Too many PIN attempts. Try again later.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
      )
    }

    const { pin } = (await req.json()) as { pin?: string }
    const envPin = process.env.TEACHER_PORTAL_PIN as string
    const secret = process.env.TEACHER_GATE_HMAC_SECRET as string

    if (!pin || !teacherPinMatches(envPin, pin)) {
      return Response.json({ error: 'Invalid PIN' }, { status: 401 })
    }

    teacherPinReset(rlKey)
    const token = signTeacherGate(user.id, secret)
    ;(await cookies()).set(TEACHER_GATE_COOKIE_NAME, token, teacherGateCookieOptions())

    return Response.json({ ok: true })
  } catch (e) {
    console.error('verify-pin', e)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
