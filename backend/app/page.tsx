"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NavBar from "@/components/nav-bar"
import JobCard from "@/components/job-card"

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$150,000 - $180,000",
      description: "We are looking for a talented frontend engineer to join our growing team.",
      type: "Full-time",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "New York, NY",
      salary: "$120,000 - $150,000",
      description: "Lead product strategy and drive innovation across our platforms.",
      type: "Full-time",
      posted: "1 day ago",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Design Studio",
      location: "Remote",
      salary: "$80,000 - $110,000",
      description: "Create beautiful and intuitive user interfaces for web and mobile applications.",
      type: "Full-time",
      posted: "3 days ago",
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: "CloudTech",
      location: "Austin, TX",
      salary: "$140,000 - $170,000",
      description: "Build scalable backend systems with modern technologies.",
      type: "Full-time",
      posted: "5 days ago",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <NavBar user={user} onLogout={handleLogout} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
                  Find Your Next Opportunity
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Connect with top employers and discover your dream job. Whether you're looking to advance your career
                  or find the right talent, JobHub is your gateway to success.
                </p>
              </div>
              <div className="flex gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Featured Jobs Preview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Featured Opportunities</h2>
              {jobs.slice(0, 2).map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                    <p className="text-sm font-semibold text-primary">{job.salary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">
            {user.role === "job_seeker"
              ? "Browse and apply to exciting job opportunities."
              : "Manage your job postings and view applications."}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search jobs by title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Action Buttons */}
        {user.role === "employer" && (
          <div className="mb-8">
            <Link href="/post-job">
              <Button className="bg-primary hover:bg-primary/90">Post a New Job</Button>
            </Link>
          </div>
        )}

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} userRole={user.role} onApply={() => alert(`Applied to ${job.title}`)} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="mt-8">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No jobs found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
