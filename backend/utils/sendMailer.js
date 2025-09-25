import NodeMailer from 'nodemailer'
export const sendEmail = async (email, subject, data) => {
    try {
        const transporter = NodeMailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        })

        switch (data.type) {
            case "forgot": {
                await transporter.sendMail({
                    from: `Life In Jotting <${process.env.USER}>`,
                    to: email,
                    subject: subject,
                    // text: text,
                    html: `
                    <div>
                    Hello ${data.username}<br/>
                    You have requested to reset your password. Please click the link below to proceed:<br/><br/>
                    <a href="http://localhost:9090/reset-password/${data.token}">
                            <label>LINK IS HERE</label>
                        </a>
                    <br/><br/>
                    If you did not request this, please ignore this email.<br/><br/>
                    Best regards,<br/>
                    The "Life in Jotting" Team
                    </div>`
                })
                break;
            }
            default: {
                await transporter.sendMail({
                    from: `Life In Jotting <${process.env.USER}>`,
                    to: email,
                    subject: subject,
                    text: data.text,
                })
                break;
            }
        }



    } catch (error) {
        console.log(`Email wasn't sent because ${error.toString()}`)
    }
}
