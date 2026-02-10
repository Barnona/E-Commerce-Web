const nodemailer = require('nodemailer');
console.log("Email from ENV:", process.env.SMPT_MAIL);
console.log("Password from ENV:", process.env.SMPT_PASSWORD ? "Loaded" : "Not Loaded");

// Configure your email service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
    }
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: to,
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email Sent Successfully');
    } catch (error) {
        console.log('Email Send Error:', error);
    }
};

module.exports = { sendEmail };