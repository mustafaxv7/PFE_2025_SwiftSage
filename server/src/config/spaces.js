import { S3Client } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-provider-env";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const s3Client = new S3Client({
  region: "nyc3", 
  endpoint: process.env.SPACES_ENDPOINT,
  credentials: fromEnv(),
  forcePathStyle: false,
});

export default s3Client;
