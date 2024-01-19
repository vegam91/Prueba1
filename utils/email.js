const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.sendMail(
  {
    from: process.env.EMAIL_USER,
    to: "vegamartinoj@gmail.com",
    subject: "message",
    text: "email test. HELLO",
  },
  (err, info) => {
    if (err) {
      console.error("Error al enviar el correo:", err);
    } else {
      console.log(info.envelope), console.log(info.messageId);
    }
  }
);
