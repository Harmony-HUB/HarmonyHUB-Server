import mongoose from "mongoose";

const File = new mongoose.Schema({
  fileID: mongoose.Schema.Types.ObjectId,
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  s3Location: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  creationTime: { type: Date, default: Date.now },
});

export default mongoose.model("File", File);
