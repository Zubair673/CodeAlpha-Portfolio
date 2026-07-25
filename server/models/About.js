import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: "",
    },

    imageId: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    university: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    goal: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    projects: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const About = mongoose.model("About", aboutSchema);

export default About;