import nodemailer from "nodemailer";

export class Mail {

    private readonly subject: string = 'hello my friend'
    private readonly html: string = '<p> hello !! </p>'

    constructor(private readonly ses: AWS.SES) {}

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
            (err, res) => {

                if (err) {

                    console.error(err)
                    transporter.close()
                    return false
                }

                console.log(`send email: ${JSON.stringify(res.envelope)}`)
                console.log(res.messageId)
                transporter.close()
            }
        )

        return true
    }
}