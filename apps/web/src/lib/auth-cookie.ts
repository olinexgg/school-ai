export const SESSION_COOKIE_NAME = 'schoolai_user_id'
export const ROLE_COOKIE_NAME = 'schoolai_user_role'
/** Set after correct presentation PIN — any logged-in user may hold this for demos. */
export const TEACHER_DEMO_COOKIE_NAME = 'schoolai_teacher_demo'

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

export function teacherDemoCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/' as const,
    maxAge: 60 * 60 * 12
  }
}
