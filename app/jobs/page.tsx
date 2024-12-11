'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const jobs = [
  { id: 1, title: 'Software Engineer', company: 'TechCorp', location: 'San Francisco, CA' },
  { id: 2, title: 'Product Manager', company: 'InnovateCo', location: 'New York, NY' },
  { id: 3, title: 'Data Scientist', company: 'DataDriven', location: 'Boston, MA' },
  { id: 4, title: 'UX Designer', company: 'DesignHub', location: 'Seattle, WA' },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-4">Find Jobs</h1>
      <div className="mb-4 d-flex gap-2">
        <Input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button>Search</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map(job => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{job.company}</p>
              <p className="text-muted-foreground">{job.location}</p>
              <Button className="mt-2">Apply Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

