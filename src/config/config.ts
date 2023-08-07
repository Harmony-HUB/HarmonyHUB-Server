import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
  CLIENT_URL: process.env.CLIENT_URL,
  MONGOOSE_ID: process.env.MONGOOSE_ID,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_CREDENTIAL_KEY: process.env.S3_CREDENTIAL_KEY,
  S3_REGION: process.env.S3_REGION,
  S3_BUCKET: process.env.S3_BUCKET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
};

export default CONFIG;
