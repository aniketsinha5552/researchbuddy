import {GetObjectCommand, PutObjectCommand, S3, S3Client} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"


const s3Client = new S3Client({
    region: "us-east-1",
    credentials:{
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
})

export async function getObjectUrl(key){
    const command = new  GetObjectCommand({
        Bucket: "researchbuddy5552",
        Key : key
    })
    const url = await getSignedUrl(s3Client,command);
    return url;
}

export async function putObjectUrl(fileName, contentType){
    
    const command = new PutObjectCommand({
        Bucket: "researchbuddy5552",
        Key: `uploads/${fileName}`,
        ContentType: contentType
    })
    const url = await getSignedUrl(s3Client,command, {expiresIn: 60})
    return url
}

// console.log('Url for file', getObjectUrl('Aniket Sinha.pdf'))