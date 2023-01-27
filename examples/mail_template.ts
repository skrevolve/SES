import AWS from 'aws-sdk'
import { MailTemplate } from '../src/mail_template'

AWS.config.loadFromPath(__dirname + '/src/config/aws_config.json')

// send email by aws mail template
const mailTemplate = new MailTemplate(new AWS.SES())

const mailTemplateResult = await mailTemplate.sendBulkTemplateEmail([
    'test@gmail.com',
    'test2@gmail.com',
]);
if (!mailTemplateResult) console.error('mail template send error')