const { PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const User = require("../models/User");
const File = require("../models/File");
const s3 = require("../config/s3Client");

exports.uploadToS3 = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("파일이 없습니다.");
  }

  const params = {
    Bucket: process.env.BUCKET,
    Key: `audio-${Date.now()}${path.extname(req.file.originalname)}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(params));
    req.s3Key = params.Key;

    next();
  } catch (error) {
    console.error("업로드 중 오류가 발생했습니다. : ", error);
    res.status(500).send("업로드 중 오류가 발생했습니다.");
  }
};

exports.saveFile = async (req, res, next) => {
  try {
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
      s3Location: req.s3Key,
      title,
      description,
    });

    await newFile.save();
    res.sendStatus(200);

    next();
  } catch (error) {
    console.error("업로드 중 오류가 발생했습니다.:", error);
    res.status(500).send("업로드 중 오류가 발생했습니다.");
  }
};
