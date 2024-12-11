import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react'

const posts = [
  {
    id: 1,
    author: {
      name: 'John Doe',
      avatar: '/placeholder.svg?height=40&width=40',
      title: 'Software Engineer at TechCorp'
    },
    content: 'Excited to announce that I\'ve just joined TechCorp as a Software Engineer! Looking forward to new challenges and opportunities. #NewJob #SoftwareEngineering',
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    author: {
      name: 'Jane Smith',
      avatar: '/placeholder.svg?height=40&width=40',
      title: 'Marketing Manager at BrandCo'
    },
    content: 'Just published a new blog post on "10 Effective Social Media Strategies for 2023". Check it out and let me know your thoughts! #Marketing #SocialMedia',
    likes: 31,
    comments: 5,
  },
]

export default function Feed() {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{post.author.name}</h3>
                <p className="text-sm text-gray-500">{post.author.title}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm">
              <ThumbsUp className="w-4 h-4 mr-2" />
              {post.likes} Likes
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              {post.comments} Comments
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

