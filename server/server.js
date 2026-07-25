import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
// New Imports
import messageRoutes from "./routes/messageRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/certificates", certificateRoutes);
// New Routes Registered
app.use("/api/messages", messageRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/settings", settingsRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Portfolio Backend API Running...");
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route Not Found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});