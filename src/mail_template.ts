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
            Source: 'noreply@test.co.kr', // 보내는 이메일
            Template: 'hello_template', // SES에 정의된 메일 템플릿
            TemplateData: '{}', // html안에 템플릿을 사용한다면 채움
            // ReplyToAddresses: [
            //     /* more items */
            //     /* 회신받을 주소, 현재는 noreply 로 받기 때문에 비워둠 */
            // ],
            // ConfigurationSetName: "STRING_VALUE" /* aws ses에 정의 구성 세트 */,
            // Tags: [ /* 메세지에 적용할 name/value 형식의 태그 */
            //     {
            //         Name: "STRING_VALUE" /* required */,
            //         Value: "STRING_VALUE" /* required */,
            //     },
            //     /* more items */
            // ],
            // ReturnPath: "STRING_VALUE" /* 피드백 전달이 활성화되면 반송 및 불만 사항이 전달되는 이메일 주소 */,
            // ReturnPathArn: "STRING_VALUE" /* 이 매개변수는 인증 전송에만 사용  */,
            // SourceArn: "STRING_VALUE", /* 이 매개변수는 인증 전송에만 사용 */
            // TemplateArn: "STRING_VALUE", /* 이메일을 보낼 때 사용할 템플릿의 ARN */
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
