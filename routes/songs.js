/* eslint-disable no-unused-vars */
const express = require("express");
const { S3Client } = require("@aws-sdk/client-s3");
const File = require("../models/File");

const router = express.Router();

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

router.get("/", async (req, res) => {
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

    console.log(songs);

    res.status(200).json(songs);
  } catch (error) {
    console.error("Error fetching song files:", error);
    res.status(500).send("Error fetching song files");
  }
});

module.exports = router;
