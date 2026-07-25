import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      enum: ["work", "education"],
      default: "work",
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model(
  "Experience",
  experienceSchema
);

export default Experience;