import AWS from 'aws-sdk'
import { MailTemplate } from './src/mail_template'
import { Mail } from './src/mail'
import { MulterS3 } from './src/multer_s3'
import { S3Client } from '@aws-sdk/client-s3'

AWS.config.loadFromPath(__dirname + '/src/config/aws_config.json')

// send email by aws mail template
const mailTemplate = new MailTemplate(new AWS.SES())

const mailTemplateResult = await mailTemplate.sendBulkTemplateEmail([
    'test@gmail.com',
    'test2@gmail.com',
]);
if (!mailTemplateResult) console.error('mail template send error')

// send email by nodemailer
const mail = new Mail(new AWS.SES({ apiVersion: '2010-12-01' }))

const mailResult = await mail.send('test@gmail.com')
if (!mailResult) console.error('mail send err')

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