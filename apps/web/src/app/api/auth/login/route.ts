import { db } from 'database'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

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

    // Set a simple cookie (In a production app, use JWT)
    ;(await cookies()).set('schoolai_user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

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
