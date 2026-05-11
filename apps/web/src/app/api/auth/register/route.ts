import { db } from 'database'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import {
  ROLE_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  roleCookieOptions,
  sessionCookieOptions
} from '../../../../lib/auth-cookie'

export async function POST(req: Request) {
  try {
    const { email, password, role = 'STUDENT' } = await req.json()

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return Response.json({ error: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        role
      }
    })

    ;(await cookies()).set(SESSION_COOKIE_NAME, user.id, sessionCookieOptions())
    ;(await cookies()).set(ROLE_COOKIE_NAME, user.role, roleCookieOptions())

    return Response.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Registration Error:', error)
    return Response.json({ error: 'Failed to register user' }, { status: 500 })
  }
}
