export const SESSION_COOKIE_NAME = 'schoolai_user_id'
export const ROLE_COOKIE_NAME = 'schoolai_user_role'
export const TEACHER_GATE_COOKIE_NAME = 'schoolai_teacher_gate'

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/' as const,
    maxAge: 60 * 60 * 24 * 7
  }
}

export function roleCookieOptions() {
  return sessionCookieOptions()
}

/** Teacher PIN session — shorter TTL than login cookie. */
export function teacherGateCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/' as const,
    maxAge: 60 * 60 * 8
  }
}
