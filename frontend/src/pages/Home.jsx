"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import api from "../services/api"
import "../styles/Home.css"

const Home = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const { data } = await api.get("/jobs")
      setJobs(data.jobs)
    } catch (err) {
      setError("Failed to fetch jobs")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar">
        <h1>JobHub</h1>
        <nav className="nav-links">
          <span>Welcome, {user?.name}</span>
          {user?.role === "employer" && (
            <button onClick={() => navigate("/post-job")} className="btn-primary">
              Post a Job
            </button>
          )}
          <button onClick={handleLogout} className="btn-danger">
            Logout
          </button>
        </nav>
      </nav>

      <div className="container">
        {error && <div className="error">{error}</div>}

        <h2>Available Jobs</h2>

        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <p>No jobs available at the moment.</p>
        ) : (
          <div className="jobs-list">
            {jobs.map((job) => (
              <div key={job._id} className="job-card" onClick={() => navigate(`/job/${job._id}`)}>
                <h3>{job.title}</h3>
                <p>
                  <strong>Company:</strong> {job.company}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>{job.description.substring(0, 100)}...</p>
                {job.salary && (
                  <p className="salary">
                    ${job.salary.min} - ${job.salary.max} {job.salary.currency}
                  </p>
                )}
                <p>
                  <strong>Type:</strong> {job.jobType}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
