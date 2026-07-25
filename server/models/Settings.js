import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  siteTitle: String,
  footerText: String,
  copyrightText: String,
  password: { type: String }, // Hashed password yahan store hoga
});

export default mongoose.model("Settings", settingsSchema);