'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  id: number
  name: string
  avatar: string
}

interface Message {
  id: number
  senderId: number
  receiverId: number
  content: string
  timestamp: string
}

export default function NetworkPage() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    // In a real application, you would fetch users and messages from an API
    setUsers([
      { id: 1, name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 2, name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 3, name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    ])
  }, [])

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    // In a real application, you would fetch messages for the selected user
    setMessages([
      { id: 1, senderId: 1, receiverId: 2, content: "Hey, how are you?", timestamp: "2023-06-10T10:00:00Z" },
      { id: 2, senderId: 2, receiverId: 1, content: "I'm good, thanks! How about you?", timestamp: "2023-06-10T10:05:00Z" },
    ])
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const newMsg: Message = {
        id: messages.length + 1,
        senderId: 1, // Assuming current user's ID is 1
        receiverId: selectedUser.id,
        content: newMessage,
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Network</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => handleUserSelect(user)}
              >
                <Avatar className="mr-2">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{selectedUser ? `Chat with ${selectedUser.name}` : 'Select a user to start chatting'}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedUser ? (
              <>
                <div className="h-64 overflow-y-auto mb-4 border rounded p-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-2 ${message.senderId === 1 ? 'text-right' : 'text-left'}`}
                    >
                      <span className="bg-blue-100 rounded px-2 py-1 inline-block">
                        {message.content}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow mr-2"
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
              </>
            ) : (
              <p>Select a user from the contacts list to start a conversation.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

