export const SESSION_COOKIE_NAME = 'schoolai_user_id'

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/' as const,
    maxAge: 60 * 60 * 24 * 7
  }
}
