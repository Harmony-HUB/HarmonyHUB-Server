const express = require("express");
const File = require("../models/File");
const { authenticateJWT } = require("../middleware/authenticateJWT");

const router = express.Router();

router.get("/", authenticateJWT, async (req, res) => {
  try {
    const files = await File.find().populate("userID");

    const songs = files.map(file => {
      const fileExtension = file.fileName.split(".").pop().toLowerCase();
      const mimeType = fileExtension === "wav" ? "audio/wav" : "audio/mpeg";

      return {
        key: file.s3Location,
        url: `https://${process.env.BUCKET}.s3.${process.env.REGION}.amazonaws.com/${file.s3Location}`,
        mimeType,
        title: file.title,
        creationTime: file.creationTime,
        userID: file.userID,
      };
    });

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).send("노래 파일 불러오는 중 오류 발생");
  }
});

module.exports = router;
