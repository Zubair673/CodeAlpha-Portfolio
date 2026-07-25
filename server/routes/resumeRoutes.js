import express from "express";

import {
  getResume,
  uploadResume,
  deleteResume,
} from "../controllers/resumeController.js";

import upload from "../middleware/multer.js";

const router = express.Router();

// Get Resume

router.get("/", getResume);

// Upload Resume

router.post(
  "/",
  upload.single("resume"),
  uploadResume
);

// Delete Resume

router.delete(
  "/",
  deleteResume
);

export default router;