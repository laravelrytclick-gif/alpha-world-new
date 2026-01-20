import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    location: { type: String },

    rank: { type: String },
    tuition: { type: String },
    acceptance: { type: String },
    rating: { type: String },
    employability: { type: String },
    image: { type: String },
    tags: [{ type: String }],

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

// 🔥 IMPORTANT: prevent model overwrite issues
export default mongoose.models.College ||
  mongoose.model("College", CollegeSchema);
