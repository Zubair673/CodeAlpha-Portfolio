import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
    },

    availability: {
      type: String,
      default: "",
    },

    typingTexts: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    profileImageId: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    resumeId: {
      type: String,
      default: "",
    },

    // ==========================
    // Hero Stats
    // ==========================

    stats: [
      {
        value: {
          type: String,
          default: "",
        },

        label: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;