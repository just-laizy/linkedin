import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const { email, password } = JSON.parse(body)

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 })
    }

    // In a real application, you would save the user to a database
    // For this example, we'll just create a token
    const token = sign({ email }, SECRET_KEY, { expiresIn: '1h' })
    
    const response = NextResponse.json({ success: true, message: 'Registration successful' })
    response.cookies.set('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    })
    
    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred during registration',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

