import express from "express";
import { addCertificate, getCertificates, deleteCertificate, updateCertificate } from "../controllers/certificateController.js";
import upload from "../middleware/multer.js"; // Aapka multer middleware

const router = express.Router();

router.post("/", upload.single("image"), addCertificate);
router.get("/", getCertificates);
router.put("/:id", upload.single("image"), updateCertificate); // Edit mein bhi image support
router.delete("/:id", deleteCertificate);

export default router;