import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      required: true,
    },

    icon: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    percentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;