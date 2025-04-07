import nodeMailer from "nodemailer";

export const sendVerificationEmail = async (email, subject, message) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            html: message,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully: ", info.messageId);

    } catch (error) {
        console.log("❌ Error sending email:", error);
    }
};