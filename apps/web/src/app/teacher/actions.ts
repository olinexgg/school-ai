'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { TEACHER_DEMO_COOKIE_NAME } from '../../lib/auth-cookie'

export async function lockTeacherPortal() {
  ;(await cookies()).delete(TEACHER_DEMO_COOKIE_NAME)
  redirect('/chat')
}
