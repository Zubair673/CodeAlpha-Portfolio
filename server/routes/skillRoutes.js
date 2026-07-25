import express from "express";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// Public Route
// ==========================================

router.get("/", getSkills);

// ==========================================
// Protected Routes
// ==========================================

router.post(
  "/",
  authMiddleware,
  createSkill
);

router.put(
  "/:id",
  authMiddleware,
  updateSkill
);

router.delete(
  "/:id",
  authMiddleware,
  deleteSkill
);

export default router;