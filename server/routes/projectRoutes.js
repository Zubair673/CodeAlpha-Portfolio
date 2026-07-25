import express from "express";

import {
  getProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ===============================
// Public Routes
// ===============================

router.get("/", getProjects);

router.get("/:id", getProject);

// ===============================
// Protected Routes
// ===============================

// Add Project
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  addProject
);

// Update Project
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateProject
);

// Delete Project
router.delete(
  "/:id",
  authMiddleware,
  deleteProject
);

export default router;