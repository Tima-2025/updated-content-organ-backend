 const nodemailer = require('nodemailer');
 const transporter = nodemailer.createTransport({
 host: process.env.SMTP_HOST,
 port: Number(process.env.SMTP_PORT) || 587,
 secure: false,
 auth: {
 user: process.env.SMTP_USER,
 pass: process.env.SMTP_PASS
 }
 });
 async function sendServiceRequestEmail({ name, email, subject, message }) {
 const mailOptions = {
 from: process.env.SMTP_USER,
 to: process.env.COMPANY_EMAIL,
 subject: `New service request: ${subject || 'No subject'}`,
 text: `New service request from ${name} <${email}>:\n\n${message}`

};
 return transporter.sendMail(mailOptions);
 }
 module.exports = { sendServiceRequestEmail };