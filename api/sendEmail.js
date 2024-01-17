//const sgMail = require("@sendgrid/mail");
const mailjet = require("node-mailjet").connect(
  process.env.MAILJED_API_KEY,
  process.env.MAILJED_SECRET_API_KEY
);

const sendEmail = (target, subject, html) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "no-reply@curant24.com",
          Name: "No Reply",
        },
        To: [
          {
            Email: target,
            Name: target,
          },
        ],
        Subject: subject,
        TextPart:
          "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
        HTMLPart: html,
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
  //sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  /*sgMail
    .send({
      to: target,
      from: "no-reply@curant24.com",
      subject: subject,
      html: html,
    })
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error, error.body);
      return;
    });*/
};

module.exports = sendEmail;
