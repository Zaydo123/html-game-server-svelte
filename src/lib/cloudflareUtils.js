import {SECRET_CLOUDFLARE_ACCESS_KEY_ID, SECRET_CLOUDFLARE_ACCESS_KEY, SECRET_CLOUDFLARE_TOKEN_VALUE, SECRET_CLOUDFLARE_ENPOINT, SECRET_CLOUDFLARE_BUCKET_NAME, SECRET_CLOUDFLARE_BUCKET_URL} from '$env/static/private';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';


async function newS3Client() {
    return new S3Client({
      region: 'auto',
      credentials: {
          accessKeyId: SECRET_CLOUDFLARE_ACCESS_KEY_ID,
          secretAccessKey: SECRET_CLOUDFLARE_ACCESS_KEY
      },
      endpoint: SECRET_CLOUDFLARE_ENPOINT
    });
}



async function uploadFileToS3(directory, file, metadata) {



    const s3 = await newS3Client();
    const params = {
        Bucket: SECRET_CLOUDFLARE_BUCKET_NAME,
        Key: `${directory}/${metadata.name}`,
        Body: file,
        ContentType: metadata.type,
        ACL: 'public-read'
    };

    console.log('S3 Params:', params);
    const command = new PutObjectCommand(params);
    let result = await s3.send(command);
    let url = `${SECRET_CLOUDFLARE_BUCKET_URL}/${SECRET_CLOUDFLARE_BUCKET_NAME}/${directory}/${metadata.name}`;
    return {"result": result, "url": url};
}


export {uploadFileToS3};