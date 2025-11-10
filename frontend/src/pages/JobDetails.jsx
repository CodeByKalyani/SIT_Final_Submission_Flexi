"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import api from "../services/api"
import "../styles/JobDetails.css"

const JobDetails = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
    try {
      const { data } = await api.get(`/jobs/${id}`)
      setJob(data.job)
    } catch (err) {
      setError("Failed to fetch job details")
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    try {
      await api.post(`/jobs/${id}/apply`, {})
      setSuccessMsg("Applied successfully!")
      setTimeout(() => navigate("/"), 2000)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply")
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (loading) return <div className="loading">Loading...</div>
  if (!job) return <div className="error">Job not found</div>

  return (
    <div>
      <nav className="navbar">
        <h1>JobHub</h1>
        <div>
          <button onClick={() => navigate("/")} className="btn-secondary">
            Back
          </button>
          <button onClick={handleLogout} className="btn-danger">
            Logout
          </button>
        </div>
      </nav>

      <div className="container">
        {error && <div className="error">{error}</div>}
        {successMsg && <div className="success">{successMsg}</div>}

        <div className="job-detail">
          <h2>{job.title}</h2>
          <p>
            <strong>Company:</strong> {job.company}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Job Type:</strong> {job.jobType}
          </p>

          {job.salary && (
            <p className="salary">
              Salary: ${job.salary.min} - ${job.salary.max} {job.salary.currency}
            </p>
          )}

          <h3>Description</h3>
          <p>{job.description}</p>

          {job.experience && (
            <>
              <h3>Experience Required</h3>
              <p>{job.experience}</p>
            </>
          )}

          {job.skills && job.skills.length > 0 && (
            <>
              <h3>Required Skills</h3>
              <div className="skills">
                {job.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}

          {user?.role === "jobseeker" && (
            <button onClick={handleApply} className="btn-primary">
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobDetails
