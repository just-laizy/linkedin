'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const freelanceJobs = [
  { id: 1, title: 'Website Redesign', client: 'SmallBiz Inc.', budget: '$1000 - $2000' },
  { id: 2, title: 'Mobile App Development', client: 'StartupX', budget: '$5000 - $10000' },
  { id: 3, title: 'Logo Design', client: 'BrandMe', budget: '$500 - $1000' },
  { id: 4, title: 'Content Writing', client: 'BlogMaster', budget: '$200 - $500' },
]

export default function FreelancePage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredJobs = freelanceJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.budget.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-4">Find Freelance Jobs</h1>
      <div className="mb-4 d-flex gap-2">
        <Input
          type="text"
          placeholder="Search freelance jobs..."
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
              <p className="text-muted-foreground">Client: {job.client}</p>
              <p className="text-muted-foreground">Budget: {job.budget}</p>
              <Button className="mt-2">Submit Proposal</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

