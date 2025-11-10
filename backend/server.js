import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import jobRoutes from "./routes/jobRoutes.js"
import { connectDB } from "./config/db.js"

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect Database
connectDB()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/jobs", jobRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
