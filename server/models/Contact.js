import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  github: { type: String },    // Naya field
  linkedin: { type: String },  // Naya field
});

export default mongoose.model("Contact", contactSchema);