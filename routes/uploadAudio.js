const express = require("express");
require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file was uploaded.");
  }

  const params = {
    Bucket: process.env.BUCKET,
    Key: `audio-${Date.now()}${path.extname(req.file.originalname)}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  try {
    const response = await s3.send(new PutObjectCommand(params));
    console.log("Audio file uploaded:", response);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error uploading audio file:", error);
    res.status(500).send("Error uploading audio file");
  }
});

module.exports = router;
