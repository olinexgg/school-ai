import { createHmac, timingSafeEqual } from 'crypto'
import { TEACHER_GATE_COOKIE_NAME } from './auth-cookie'

const SEP = '.'

export function signTeacherGate(userId: string, secret: string): string {
  const exp = Math.floor(Date.now() / 1000) + 8 * 3600
  const payload = Buffer.from(JSON.stringify({ u: userId, exp })).toString('base64url')
  const sig = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}${SEP}${sig}`
}

export function verifyTeacherGate(
  token: string | undefined,
  userId: string,
  secret: string | undefined
): boolean {
  if (!token || !secret) return false
  const i = token.lastIndexOf(SEP)
  if (i <= 0) return false
  const payload = token.slice(0, i)
  const sig = token.slice(i + 1)
  const expectedSig = createHmac('sha256', secret).update(payload).digest('base64url')
  try {
    const a = Buffer.from(sig, 'utf8')
    const b = Buffer.from(expectedSig, 'utf8')
    if (a.length !== b.length) return false
    if (!timingSafeEqual(a, b)) return false
  } catch {
    return false
  }
  try {
    const raw = Buffer.from(payload, 'base64url').toString('utf8')
    const data = JSON.parse(raw) as { u?: string; exp?: number }
    if (data.u !== userId) return false
    if (typeof data.exp !== 'number' || data.exp < Math.floor(Date.now() / 1000)) return false
    return true
  } catch {
    return false
  }
}

export function teacherGateConfigured(): boolean {
  return Boolean(
    process.env.TEACHER_PORTAL_PIN?.trim() && process.env.TEACHER_GATE_HMAC_SECRET?.trim()
  )
}

export function teacherGateDevBypass(): boolean {
  return (
    process.env.NODE_ENV === 'development' && process.env.TEACHER_GATE_DEV_BYPASS === '1'
  )
}

export function readTeacherGateCookieValue(cookieStore: {
  get: (n: string) => { value: string } | undefined
}): string | undefined {
  return cookieStore.get(TEACHER_GATE_COOKIE_NAME)?.value
}
