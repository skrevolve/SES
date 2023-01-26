export class MailTemplate {

    private readonly subject: string = 'hello my friend'
    private readonly html: string = '<p> hello !! </p>'
    private readonly text: string = 'hello !!'

    constructor(readonly ses: AWS.SES) {

    }

    public createTemplate() {

        const params: AWS.SES.CreateTemplateRequest = {
            Template: {
                TemplateName: 'hello_template',
                SubjectPart: this.subject,
                HtmlPart: this.html,
                TextPart: this.text,
            },
        }

        this.ses.createTemplate(params, (err, data) => {

            if (err) console.error(err, err.stack)
            else console.log(data)
        })
    }

    public deleteTemplate() {

        this.ses.deleteTemplate(
            {TemplateName: 'hello_template'},
            (err, data) => {
                if (err) console.error(err, err.stack)
                else console.log(data)
            }
        )
    }

    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendTemplatedEmail-property
    public async sendTemplateEmail(toAddress: string): Promise<boolean> {

        const params = {
            Destination: {
                BccAddresses: [
                    // 숨은 참조 주소
                ],
                CcAddresses: [
                    // 참조 주소
                ],
                ToAddresses: [
                    toAddress,
                ],
            },
            Source: 'noreply@test.co.kr',
            Template: 'hello_template',
            TemplateData: '{}',
            // ReplyToAddresses: [
            //     /* more items */
            // ],
            // ConfigurationSetName: "STRING_VALUE",
            // Tags: [
            //     {
            //         Name: "STRING_VALUE",
            //         Value: "STRING_VALUE",
            //     },
            //     /* more items */
            // ],
            // ReturnPath: "STRING_VALUE",
            // ReturnPathArn: "STRING_VALUE",
            // SourceArn: "STRING_VALUE",
            // TemplateArn: "STRING_VALUE",
        }

        this.ses.sendTemplatedEmail(params, (err, data) => {
            if (err) {
                console.error(err, err.stack)
                return false
            } else {
                console.log(data)
            }
        })

        return true
    }

    public async sendBulkTemplateEmail(toaddressList: string[]): Promise<boolean> {

        const maxLimit: number = 50;
        let spliceIdx: number = 0;

        while (true) {

            let limit = maxLimit;
            if (toaddressList.length  < maxLimit) limit = toaddressList.length;
            else return false;

            const spliceTolist = toaddressList.splice(0, limit);
            spliceIdx += limit;

            const params = {
                Destinations: [
                    {
                        Destination: {
                            CcAddresses: [
                                // Email Addresses
                            ],
                            ToAddresses: spliceTolist,
                        },
                        // ReplacementTemplateData: '{ "REPLACEMENT_TAG_NAME": "REPLACEMENT_VALUE" }',
                    }
                ],
                Source: 'noreply@test.co.kr',
                Template: 'hello_template',
                DefaultTemplateData: '{}',
                // ReplyToAddresses: ["email addresses"]
            }

            try {

                await this.ses.sendBulkTemplatedEmail(params).promise()

            } catch(e) {

                console.error(e)
                return false
            }

            if (toaddressList.length === 0) break;

            await new Promise((resolve) => setTimeout(resolve, 200))
        }

        return true
    }
}
