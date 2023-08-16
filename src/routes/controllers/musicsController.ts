import File from "../../models/File";
import { ExpressMiddleware } from "../../types/types";
import CONFIG from "../../config/config";

const { S3_BUCKET, S3_REGION } = CONFIG;

const getUserFile: ExpressMiddleware = async (req, res, next) => {
  try {
    const files = await File.find({ userID: req.user.id }).populate("userID");

    const songs = files.map(file => {
      const fileExtension = file.fileName.split(".").pop()?.toLowerCase();
      const mimeType = fileExtension === "wav" ? "audio/wav" : "audio/mpeg";

      return {
        key: file.s3Location,
        url: `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${file.s3Location}`,
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
};

export default getUserFile;
