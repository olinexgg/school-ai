import { cookies } from 'next/headers'
import { db } from 'database'
import { SESSION_COOKIE_NAME } from './auth-cookie'

export type SessionUser = {
  id: string
  email: string
  role: string
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const id = (await cookies()).get(SESSION_COOKIE_NAME)?.value
  if (!id) return null

  const user = await db.user.findUnique({
    where: { id },
    select: { id: true, email: true, role: true }
  })

  return user
}
