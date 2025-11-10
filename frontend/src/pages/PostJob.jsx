"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import api from "../services/api"
import "../styles/PostJob.css"

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: { min: "", max: "", currency: "USD" },
    jobType: "Full-time",
    experience: "",
    skills: "",
  })
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("salary-")) {
      const salaryField = name.split("-")[1]
      setFormData((prev) => ({
        ...prev,
        salary: { ...prev.salary, [salaryField]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const jobData = {
        ...formData,
        salary: {
          min: Number.parseInt(formData.salary.min),
          max: Number.parseInt(formData.salary.max),
          currency: formData.salary.currency,
        },
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
      }
      await api.post("/jobs", jobData)
      setSuccessMsg("Job posted successfully!")
      setTimeout(() => navigate("/"), 2000)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post job")
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
        <div className="post-job-form">
          <h2>Post a New Job</h2>
          {error && <div className="error">{error}</div>}
          {successMsg && <div className="success">{successMsg}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Job Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Company Name *</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Job Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Minimum Salary</label>
                <input type="number" name="salary-min" value={formData.salary.min} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Maximum Salary</label>
                <input type="number" name="salary-max" value={formData.salary.max} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select name="salary-currency" value={formData.salary.currency} onChange={handleChange}>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select name="jobType" value={formData.jobType} onChange={handleChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="form-group">
              <label>Experience Required</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g., 2-5 years"
              />
            </div>

            <div className="form-group">
              <label>Required Skills (comma-separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>

            <button type="submit" className="btn-primary">
              Post Job
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostJob
