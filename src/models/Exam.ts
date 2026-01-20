import mongoose, { Schema, Types } from "mongoose";

const ExamSchema = new Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    exam_type: { type: String, enum: ["National", "State"] },
    overview: String,
    eligibility: String,
    exam_pattern: String,
    syllabus: String,
    important_dates: String,
    is_active: { type: Boolean, default: true },
    created_by: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
