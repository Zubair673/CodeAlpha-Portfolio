import express from "express";

import {
  getHero,
  updateHero,
} from "../controllers/heroController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ==========================================
// Public Route
// ==========================================

router.get("/", getHero);

// ==========================================
// Protected Route
// ==========================================

router.put(
  "/",
  authMiddleware,
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  updateHero
);

export default router;