import { S3Client } from "@aws-sdk/client-s3";
import CONFIG from "./config";

const { S3_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = CONFIG;

const s3 = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
  },
});

export default s3;
