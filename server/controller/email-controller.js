const nodemailer = require('nodemailer');

const requiredEnv = ['SMPT_MAIL', 'SMPT_PASSWORD'];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
    }
});

const sendEmail = async (to, subject, text) => {
    if (missingEnv.length) {
        throw new Error(`Email service is not configured: missing ${missingEnv.join(', ')}`);
    }

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };