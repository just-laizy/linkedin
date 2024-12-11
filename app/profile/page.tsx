'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Profile() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [followers, setFollowers] = useState<string[]>([])
  const [following, setFollowing] = useState<string[]>([])

  const currentUser = 'user@example.com' // This should be the logged-in user's email
  const profileUser = 'john.doe@example.com' // This should be the profile owner's email

  useEffect(() => {
    fetchSubscriptionData()
  }, [])

  const fetchSubscriptionData = async () => {
    const response = await fetch(`/api/subscribe?user=${profileUser}`)
    const data = await response.json()
    if (data.success) {
      setFollowers(data.followers)
      setFollowing(data.following)
      setIsSubscribed(data.followers.includes(currentUser))
    }
  }

  const handleSubscribe = async () => {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentUser, targetUser: profileUser }),
    })
    const data = await response.json()
    if (data.success) {
      setIsSubscribed(data.isSubscribed)
      fetchSubscriptionData()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">John Doe</CardTitle>
              <p className="text-gray-500">Software Engineer at TechCorp</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-gray-600">Passionate software engineer with 5+ years of experience in web development. Skilled in React, Node.js, and cloud technologies.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Experience</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Software Engineer at TechCorp (2020 - Present)</li>
                <li>Junior Developer at StartupX (2018 - 2020)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Education</h3>
              <p className="text-gray-600">B.S. in Computer Science, University of Technology (2014 - 2018)</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm">React</Button>
                <Button variant="secondary" size="sm">Node.js</Button>
                <Button variant="secondary" size="sm">TypeScript</Button>
                <Button variant="secondary" size="sm">AWS</Button>
                <Button variant="secondary" size="sm">Docker</Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Connections</h3>
              <p className="text-gray-600">Followers: {followers.length} | Following: {following.length}</p>
            </div>
            {currentUser !== profileUser && (
              <Button onClick={handleSubscribe}>
                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

