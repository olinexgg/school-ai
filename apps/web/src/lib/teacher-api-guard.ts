import { cookies } from 'next/headers'
import type { SessionUser } from './server-auth'
import { getSessionUser } from './server-auth'
import {
  readTeacherGateCookieValue,
  teacherGateConfigured,
  teacherGateDevBypass,
  verifyTeacherGate
} from './teacher-gate'

export type TeacherGuardFailure = {
  ok: false
  status: number
  error: string
  code?: string
}

export type TeacherGuardOk = { ok: true; user: SessionUser }

export async function requireTeacherWithGate(): Promise<TeacherGuardOk | TeacherGuardFailure> {
  const user = await getSessionUser()
  if (!user) {
    return { ok: false, status: 401, error: 'Unauthorized' }
  }
  if (user.role !== 'TEACHER') {
    return { ok: false, status: 403, error: 'Forbidden' }
  }

  if (teacherGateDevBypass()) {
    return { ok: true, user }
  }

  if (!teacherGateConfigured()) {
    if (process.env.NODE_ENV === 'production') {
      return {
        ok: false,
        status: 503,
        error: 'Teacher portal is not configured (set TEACHER_PORTAL_PIN and TEACHER_GATE_HMAC_SECRET)',
        code: 'TEACHER_NOT_CONFIGURED'
      }
    }
    return { ok: true, user }
  }

  const secret = process.env.TEACHER_GATE_HMAC_SECRET
  const gate = readTeacherGateCookieValue(await cookies())
  if (!verifyTeacherGate(gate, user.id, secret)) {
    return {
      ok: false,
      status: 403,
      error: 'Teacher PIN session required',
      code: 'TEACHER_PIN_REQUIRED'
    }
  }

  return { ok: true, user }
}
