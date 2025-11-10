import mongoose from "mongoose"

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a job title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a job description"],
    },
    company: {
      type: String,
      required: [true, "Please provide company name"],
    },
    location: {
      type: String,
      required: [true, "Please provide job location"],
    },
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "USD",
      },
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time",
    },
    experience: String,
    skills: [String],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        status: {
          type: String,
          enum: ["applied", "shortlisted", "rejected"],
          default: "applied",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true },
)

export default mongoose.model("Job", jobSchema)
