// const nodemailer = require("nodemailer");

// console.log(
//   "here here: ",
//   process.env.EMAIL_USERNAME,
//   process.env.EMAIL_PASSWORD
// );

// const tp = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
//   secure: true,
//   // requireTLS: false,
//   port: 465,
//   // tls: {
//   //   rejectUnauthorized: false,
//   // },
// });

// async function sendEmail(to, subject, body) {
//   console.log(
//     "there there: ",
//     process.env.EMAIL_USERNAME,
//     process.env.EMAIL_PASSWORD
//   );
//   await tp.sendMail({
//     from: "kpaprecious2@gmail.com",
//     to,
//     subject,
//     html: body,
//   });
// }

// module.exports = {
//   sendEmail,
// };

const nodemailer = require("nodemailer");
require("dotenv").config();

const tp = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
  port: 465,
});

// async function sendEmail(to, subject, body) {
//   await tp.sendMail({
//     from: "ikpaprecious2@gmail.com",
//     to,
//     subject,
//     html: body,
//   });
// }

async function sendEmail(to, subject, body) {
  try {
    await tp.sendMail({
      from: "4chimabika@gmail.com",
      to,
      subject,
      html: body,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error; // Rethrow the error if you want to handle it further up the call stack
  }
}

module.exports = {
  sendEmail,
};
