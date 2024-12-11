import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.email || !body.password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 })
    }

    const { email, password } = body

    // In a real application, you would validate the credentials against a database
    if (email === 'user@example.com' && password === 'password') {
      const token = sign({ email }, SECRET_KEY, { expiresIn: '1h' })
      
      const response = NextResponse.json({ success: true, message: 'Login successful' })
      response.cookies.set('token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 // 1 hour
      })
      
      return response
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred during login',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

