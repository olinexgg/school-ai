const attempts = new Map<string, { count: number; windowStart: number }>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 12

export function teacherPinRateLimit(key: string): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now()
  const cur = attempts.get(key)
  if (!cur || now - cur.windowStart > WINDOW_MS) {
    attempts.set(key, { count: 1, windowStart: now })
    return { ok: true }
  }
  if (cur.count >= MAX_ATTEMPTS) {
    const retryAfterSec = Math.ceil((WINDOW_MS - (now - cur.windowStart)) / 1000)
    return { ok: false, retryAfterSec: Math.max(1, retryAfterSec) }
  }
  cur.count += 1
  return { ok: true }
}

export function teacherPinReset(key: string) {
  attempts.delete(key)
}
