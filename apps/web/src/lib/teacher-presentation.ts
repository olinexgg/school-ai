import { cookies } from 'next/headers'
import type { SessionUser } from './server-auth'
import { getSessionUser } from './server-auth'
import { TEACHER_DEMO_COOKIE_NAME } from './auth-cookie'

/** Used when `TEACHER_PRESENTATION_PIN` is unset (override in production). */
export const DEFAULT_TEACHER_PRESENTATION_PIN = '4545'

export function getEffectiveTeacherPresentationPin(): string {
  return process.env.TEACHER_PRESENTATION_PIN?.trim() || DEFAULT_TEACHER_PRESENTATION_PIN
}

/** PIN gate is always on (env overrides the default PIN). */
export function isPresentationPinConfigured(): boolean {
  return true
}

/** Teacher tools require the presentation cookie (set after correct PIN). */
export async function hasTeacherPresentationAccess(): Promise<boolean> {
  const user = await getSessionUser()
  if (!user) return false
  const demo = (await cookies()).get(TEACHER_DEMO_COOKIE_NAME)?.value
  return demo === '1'
}

export type TeacherPresentationOk = { ok: true; user: SessionUser }
export type TeacherPresentationFail = {
  ok: false
  status: number
  error: string
  code?: string
}

export async function requireTeacherPresentationMode(): Promise<
  TeacherPresentationOk | TeacherPresentationFail
> {
  const user = await getSessionUser()
  if (!user) {
    return { ok: false, status: 401, error: 'Unauthorized' }
  }
  if (!(await hasTeacherPresentationAccess())) {
    return {
      ok: false,
      status: 403,
      error: 'Enter the presentation PIN on the chat screen to open teacher mode.',
      code: 'TEACHER_PIN_REQUIRED'
    }
  }
  return { ok: true, user }
}
