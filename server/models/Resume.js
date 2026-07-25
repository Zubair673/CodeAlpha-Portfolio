import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "My Resume",
    },

    fileUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resume", resumeSchema);