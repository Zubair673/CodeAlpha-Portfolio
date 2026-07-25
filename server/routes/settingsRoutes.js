import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js"; // getSettings bhi import karein

const router = express.Router();

router.get("/", getSettings);  // Ye line miss thi
router.put("/", updateSettings);

export default router;