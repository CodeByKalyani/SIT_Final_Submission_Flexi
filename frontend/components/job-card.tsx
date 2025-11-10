"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function JobCard({ job, userRole, onApply }) {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg">{job.title}</CardTitle>
            <CardDescription>{job.company}</CardDescription>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">
            {job.type}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground flex items-center gap-2">📍 {job.location}</p>
          <p className="text-sm font-semibold text-primary">{job.salary}</p>
          <p className="text-sm text-muted-foreground">{job.description}</p>
        </div>

        <div className="pt-4 border-t border-border flex flex-col gap-2 mt-auto">
          <p className="text-xs text-muted-foreground">Posted {job.posted}</p>
          {userRole === "job_seeker" ? (
            <Button onClick={onApply} className="w-full bg-primary hover:bg-primary/90">
              Apply Now
            </Button>
          ) : (
            <Link href={`/job/${job.id}`} className="w-full">
              <Button variant="outline" className="w-full bg-transparent">
                View Details
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
