import {SECRET_CLOUDFLARE_ACCESS_KEY_ID, SECRET_CLOUDFLARE_ACCESS_KEY, SECRET_CLOUDFLARE_TOKEN_VALUE, SECRET_CLOUDFLARE_ENDPOINT, SECRET_CLOUDFLARE_BUCKET_NAME, SECRET_CLOUDFLARE_BUCKET_URL} from '$env/static/private';
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
    console.log('[TRYING] - Uploading file to S3:', directory, file, metadata);
    const s3 = await newS3Client();
    let fileName = '';
    let fileType = '';
    //Metadata: Learn-To-Fly-3-main/IQmkWMUDh5bn.swf
    if(typeof metadata == 'string'){
        fileName = metadata.split('/').pop();
        fileType = fileName.split('.').pop();
    } else{
        try{
            console.log('Trying to get file type from metadata:', metadata);
            fileName = metadata.name;
            fileType = metadata.type;
        } catch(error) {
            console.error('Error getting file type:', error);
            fileType = 'application/octet-stream';
            fileName = 'unknown';
        }
    }
    if(!fileType) fileType = 'application/octet-stream';
    console.log('File type:', fileType);


    const params = {
        Bucket: SECRET_CLOUDFLARE_BUCKET_NAME,
        Key: `${directory}/${fileName}`,
        Body: file,
        ContentType: fileType,
        ACL: 'public-read'
    };

    const command = new PutObjectCommand(params);
    let result = await s3.send(command);
    let url = `${SECRET_CLOUDFLARE_BUCKET_URL}/${directory}/${fileName}`;
    return {"result": result, "url": url};
}


export {uploadFileToS3};