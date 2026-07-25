import express from "express";

import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// Public Route
// ==========================================

router.get("/", getExperiences);

// ==========================================
// Admin Routes
// ==========================================

router.post("/", authMiddleware, addExperience);

router.put("/:id", authMiddleware, updateExperience);

router.delete("/:id", authMiddleware, deleteExperience);

export default router;