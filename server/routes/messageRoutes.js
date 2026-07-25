import express from "express";
import { getMessages, deleteMessage, createMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/", getMessages);
router.post("/", createMessage); // YEH LINE ADD KAREIN
router.delete("/:id", deleteMessage);

export default router;