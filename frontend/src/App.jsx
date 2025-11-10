"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"
import { useState, useEffect } from "react"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import JobDetails from "./pages/JobDetails"
import PostJob from "./pages/PostJob"
import "./App.css"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = (userData, token) => {
    setUser(userData)
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/job/:id" element={user ? <JobDetails /> : <Navigate to="/login" />} />
          <Route path="/post-job" element={user && user.role === "employer" ? <PostJob /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
