import { S3Client } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-provider-env';

const s3Client = new S3Client({
    region: process.env.DO_SPACES_REGION || 'nyc3',
    endpoint: process.env.SPACES_ENDPOINT,
    credentials: fromEnv(),
    forcePathStyle: false,
});

export default s3Client;
