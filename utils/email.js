const nodemailer = require("nodemailer");
require("dotenv").config();



const sendEmail = (to, subject, text) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4725bc85462607",
      pass: "0da93acf5622a9",
    },
  });

  transport.sendMail(
    {
      from: "4725bc85462607",
      to: to,
      subject: subject,
      text: text,
    },
    (err, info) => {
      if (err) {
        console.error("Error al enviar el correo:", err);
      } else {
        console.log(info.envelope);
        console.log(info.messageId);
      }
    }
  );
};

module.exports = sendEmail;









module.exports = sendEmail;