import AWS from 'aws-sdk'
import { MailTemplate } from './src/mail_template'

AWS.config.loadFromPath(__dirname + '/src/config/aws_config.json')

const mailTemplate = new MailTemplate(new AWS.SES())

mailTemplate.sendBulkTemplateEmail([
    'test@gmail.com',
    'test2@gmail.com',
]);
