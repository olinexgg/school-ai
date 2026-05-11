import { cookies } from 'next/headers'
import {
  ROLE_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  TEACHER_DEMO_COOKIE_NAME
} from '../../../../lib/auth-cookie'

export async function POST() {
  const store = await cookies()
  store.delete(SESSION_COOKIE_NAME)
  store.delete(ROLE_COOKIE_NAME)
  store.delete(TEACHER_DEMO_COOKIE_NAME)
  return Response.json({ ok: true })
}
