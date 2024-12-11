import { NextResponse } from 'next/server'

// This is a mock database. In a real application, you would use a real database.
let subscriptions: { [key: string]: string[] } = {}

export async function POST(request: Request) {
  try {
    const { currentUser, targetUser } = await request.json()

    if (!currentUser || !targetUser) {
      return NextResponse.json({ success: false, message: 'Both currentUser and targetUser are required' }, { status: 400 })
    }

    if (!subscriptions[currentUser]) {
      subscriptions[currentUser] = []
    }

    if (subscriptions[currentUser].includes(targetUser)) {
      // Unsubscribe
      subscriptions[currentUser] = subscriptions[currentUser].filter(user => user !== targetUser)
      return NextResponse.json({ success: true, message: 'Unsubscribed successfully', isSubscribed: false })
    } else {
      // Subscribe
      subscriptions[currentUser].push(targetUser)
      return NextResponse.json({ success: true, message: 'Subscribed successfully', isSubscribed: true })
    }
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred during subscription',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const user = searchParams.get('user')

  if (!user) {
    return NextResponse.json({ success: false, message: 'User parameter is required' }, { status: 400 })
  }

  const followers = Object.entries(subscriptions)
    .filter(([_, subscribed]) => subscribed.includes(user))
    .map(([follower]) => follower)

  const following = subscriptions[user] || []

  return NextResponse.json({ success: true, followers, following })
}

