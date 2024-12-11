'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, Users, Bell, MessageSquare, User, LogIn, LogOut, Briefcase } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { useEffect, useState } from 'react'

export default function Header() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = document.cookie.includes('token=')
    setIsLoggedIn(token)
  }, [])

  const handleLogout = async () => {
    const response = await fetch('/api/logout', { method: 'POST' })
    if (response.ok) {
      setIsLoggedIn(false)
      router.push('/login')
    }
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 d-flex align-items-center justify-content-between">
        <Link href="/" className="text-2xl font-bold text-primary text-decoration-none">
          LinkedClone
        </Link>
        <nav className="d-flex align-items-center gap-3">
          <Link href="/" className="text-secondary hover:text-primary">
            <Home className="w-6 h-6" />
          </Link>
          <Link href="/network" className="text-secondary hover:text-primary">
            <Users className="w-6 h-6" />
          </Link>
          <Link href="/jobs" className="text-secondary hover:text-primary">
            <Briefcase className="w-6 h-6" />
          </Link>
          <Link href="/freelance" className="text-secondary hover:text-primary">
            <MessageSquare className="w-6 h-6" />
          </Link>
          <Link href="/notifications" className="text-secondary hover:text-primary">
            <Bell className="w-6 h-6" />
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="text-secondary hover:text-primary">
                <User className="w-6 h-6" />
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 me-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => router.push('/login')}>
              <LogIn className="w-4 h-4 me-2" />
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}

