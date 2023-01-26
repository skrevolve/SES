import nodemailer from "nodemailer";

export class Mail {

    private readonly subject: string = 'hello my friend'
    private readonly html: string = '<p> hello !! </p>'

    constructor(readonly ses: AWS.SES) {

    }

    public async send(toAddress: string): Promise<boolean> {

        const transporter = nodemailer.createTransport({
            SES: this.ses
        })

        transporter.sendMail(
            {
                from: 'noreply@test.co.kr',
                to: toAddress,
                subject: this.subject,
                html: this.html
            },
            (err, info) => {
                if (err) {
                    console.error(err)
                    return false
                }
                console.log(`send email: ${JSON.stringify(info.envelope)}`)
                console.log(info.messageId)
            }
        )

        return true
    }
}