const express = require("express");
require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const path = require("path");
const User = require("../models/User");
const File = require("../models/File");
const { authenticateJWT } = require("../middleware/authenticateJWT");

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

router.post("/", authenticateJWT, upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("업로드된 파일이 없습니다.");
  }

  const params = {
    Bucket: process.env.BUCKET,
    Key: `audio-${Date.now()}${path.extname(req.file.originalname)}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(params));

    const { userEmail, title, description } = req.body;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).send("유효하지 않은 유저 아이디 입니다.");
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
    console.error("업로드 중 오류가 발생했습니다.:", error);
    res.status(500).send("업로드 중 오류가 발생했습니다.");
  }
});

module.exports = router;
