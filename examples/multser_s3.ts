import { MulterS3 } from '../src/multer_s3'
import { S3Client } from '@aws-sdk/client-s3'

const image = new MulterS3(
    new S3Client({
        region: 'YOUR_S3_REGION',
        credentials: {
            accessKeyId: 'YOUR_S3_ACCESS_KEY',
            secretAccessKey: 'YOUR_S3_SECRET_KEY'
        }
    }),
    'YOUR_S3_BUCKET'
)

// upload single image
const uploadResult = await image.uploadSingle('fileDir', 'imgName')
if (!uploadResult) console.error('upload image error')

// delete image
const deleteResult = await image.delete('fileDir', 'fileName')
if (!deleteResult) console.error('delete image error')