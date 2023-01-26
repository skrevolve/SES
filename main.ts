import AWS from 'aws-sdk'
import { MailTemplate } from './src/mail_template'
import { Mail } from './src/mail'

AWS.config.loadFromPath(__dirname + '/src/config/aws_config.json')

//=======================================================================
const mailTemplate = new MailTemplate(new AWS.SES())
const mailTemplateResult = mailTemplate.sendBulkTemplateEmail([
    'test@gmail.com',
    'test2@gmail.com',
]);
if (!mailTemplateResult) console.error('mail template send error')
//=======================================================================


//=======================================================================
const mail = new Mail(new AWS.SES({ apiVersion: '2010-12-01' }))
const mailResult = mail.send('test@gmail.com')
if (!mailResult) console.error('mail send err')
//=======================================================================