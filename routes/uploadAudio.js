const express = require("express");
require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const path = require("path");
const User = require("../models/User");
const File = require("../models/File");

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
    console.log(response);

    const { userEmail, title, description } = req.body;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).send("Invalid user ID");
    }

    const newFile = new File({
      userID: user.id,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      s3Location: params.Key,
      title,
      description,
    });

    await newFile.save();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error uploading audio file:", error);
    res.status(500).send("Error uploading audio file");
  }
});

module.exports = router;
