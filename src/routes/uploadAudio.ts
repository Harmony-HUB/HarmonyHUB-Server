import express from "express";
import multer from "multer";
import authenticateJWT from "../middleware/authenticateJWT";
const {
  uploadToS3,
  saveFile,
} = require("../controllers/uploadAudioController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", authenticateJWT, upload.single("audio"), uploadToS3, saveFile);

module.exports = router;
