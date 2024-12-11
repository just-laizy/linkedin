'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from 'lucide-react'

interface Notification {
  id: number
  message: string
  timestamp: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // In a real application, you would fetch notifications from an API
    setNotifications([
      { id: 1, message: "John Doe liked your post", timestamp: "2023-06-10T10:00:00Z" },
      { id: 2, message: "Jane Smith commented on your article", timestamp: "2023-06-09T15:30:00Z" },
      { id: 3, message: "You have a new follower", timestamp: "2023-06-08T09:45:00Z" },
    ])
  }, [])

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      {notifications.map((notification) => (
        <Card key={notification.id} className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2" />
              New Notification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{notification.message}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(notification.timestamp).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

