// /utils/uploadToS3.js
import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../config/spaces.js';
import { v4 as uuidv4 } from 'uuid';

const uploadImageToSpaces = async (fileBuffer, originalName, mimeType) => {
  const extension = originalName.split('.').pop();
  const fileName = `reports/${uuidv4()}.${extension}`;

  const uploadParams = {
    Bucket: process.env.DO_SPACES_BUCKET,
    Key: fileName,
    Body: fileBuffer,
    ACL: 'public-read',
    ContentType: mimeType
  };

  await s3Client.send(new PutObjectCommand(uploadParams));

  const publicUrl = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_REGION}.digitaloceanspaces.com/${fileName}`;
  return publicUrl;
};

export default uploadImageToSpaces;
