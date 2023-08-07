import express from "express";
import multer from "multer";
import authenticateJWT from "./middleware/authenticateJWT";
import { uploadToS3, saveFile } from "./controllers/uploadAudioController";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", authenticateJWT, upload.single("audio"), uploadToS3, saveFile);

export default router;
