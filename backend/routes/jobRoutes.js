import express from "express"
import { getAllJobs, getJobById, createJob, applyJob } from "../controllers/jobController.js"
import { protect, authorize } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", getAllJobs)
router.get("/:id", getJobById)
router.post("/", protect, authorize("employer"), createJob)
router.post("/:id/apply", protect, authorize("jobseeker"), applyJob)

export default router
