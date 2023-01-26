import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

export class MulterS3 {

    constructor(readonly s3: S3Client, readonly s3Bucket: string) {

    }

    public async uploadSingle(fileDir: string, imgName: string): Promise<Boolean> {

        try {
            multer({
                storage: multerS3({
                    s3: this.s3,
                    bucket: this.s3Bucket,
                    contentType: multerS3.AUTO_CONTENT_TYPE,
                    metadata: async (req, file, cb) => {

                        cb(null, {fieldName: file.fieldname})
                    },
                    key: async (req, file, cb) => {

                        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) return cb(new Error('Wrong image type'))

                        const fileName = Date.now() + '_' + Math.random().toString(36).slice(2)
                        const mimeType = file.mimetype.split("/")

                        cb(null, `${fileDir}/${fileName}.${mimeType[1]}`)
                    },
                }),
                limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
            }).single(imgName)

            return true

        } catch(e) {

            return false
        }
    }

    public async delete(fileDir:string , fileName:string): Promise<Boolean> {

        const bucketParams = {
            Bucket: this.s3Bucket,
            Key: fileDir.concat('/', fileName)
        }

        try {

            await this.s3.send(new DeleteObjectCommand(bucketParams))
            return true

        } catch(e) {

            return false
        }
    }
}