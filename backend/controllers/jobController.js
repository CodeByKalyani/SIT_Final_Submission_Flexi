import Job from "../models/Job.js"

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" }).populate("postedBy", "name email")
    res.status(200).json({ success: true, jobs })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email")
    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }
    res.status(200).json({ success: true, job })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary, jobType, experience, skills } = req.body

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      experience,
      skills,
      postedBy: req.user._id,
    })

    res.status(201).json({ success: true, job })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    const alreadyApplied = job.applications.some((app) => app.userId.toString() === req.user._id.toString())
    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied for this job" })
    }

    job.applications.push({ userId: req.user._id })
    await job.save()

    res.status(200).json({ success: true, message: "Applied successfully", job })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
