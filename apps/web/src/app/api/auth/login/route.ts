import { db } from 'database'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { SESSION_COOKIE_NAME, sessionCookieOptions } from '../../../../lib/auth-cookie'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    ;(await cookies()).set(SESSION_COOKIE_NAME, user.id, sessionCookieOptions())

    return Response.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login Error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
