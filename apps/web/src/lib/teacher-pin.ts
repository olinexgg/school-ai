import { createHash, timingSafeEqual } from 'crypto'

export function teacherPinMatches(envPin: string, input: string): boolean {
  const a = createHash('sha256').update(envPin.trim(), 'utf8').digest()
  const b = createHash('sha256').update(input.trim(), 'utf8').digest()
  try {
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}
