import { db } from 'database'
import bcrypt from 'bcryptjs'

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

    return Response.json({ message: 'User created successfully', userId: user.id })
  } catch (error) {
    console.error('Registration Error:', error)
    return Response.json({ error: 'Failed to register user' }, { status: 500 })
  }
}
