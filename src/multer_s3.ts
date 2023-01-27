import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: 'YOUR_S3_REGION',
    credentials: {
        accessKeyId: 'YOUR_S3_ACCESS_KEY',
        secretAccessKey: 'YOUR_S3_SECRET_KEY'
    }
});

export const s3Upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'YOUR_S3_BUCKET',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: async (req, file, cb) => {

            cb(null, {fieldName: file.fieldname});
        },
        key: async (req, file, cb) => {

            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) return cb(new Error('Wrong image type'))

            const fileName = Date.now() + '_' + Math.random().toString(36).slice(2)
            const mimeType = file.mimetype.split("/")

            cb(null, `YOUR_BUCKET_DIRECTORY_PATH/${fileName}.${mimeType[1]}`)
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})

export const s3Delete = async (fileDir:string , fileName:string): Promise<boolean> => {

    const bucketParams = {
      Bucket: 'YOUR_S3_BUCKET',
      Key: fileDir.concat('/', fileName)
    };

    try {

        await s3.send(new DeleteObjectCommand(bucketParams))
        return true

    } catch(e) {

        console.error(e)
        return false
    }

}