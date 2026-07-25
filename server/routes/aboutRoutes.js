import express from "express";

import {
  getAbout,
  updateAbout,
} from "../controllers/aboutController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ==========================================
// Public Route
// ==========================================

router.get("/", getAbout);

// ==========================================
// Protected Route
// ==========================================

router.put(
  "/",
  authMiddleware,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  updateAbout
);

export default router;