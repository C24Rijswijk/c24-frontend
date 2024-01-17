//const sgMail = require("@sendgrid/mail");
const Mailjet = require("node-mailjet");

console.log(
  process.env.MAILJED_API_KEY,
  " ---- ",
  process.env.MAILJED_SECRET_API_KEY
);

const mailjet = Mailjet.apiConnect(
  process.env.MAILJED_API_KEY,
  process.env.MAILJED_SECRET_API_KEY
);

const sendEmail = async (
  target,
  subject,
  html,
  from = "no-reply@curant24.com"
) => {
  const request = mailjet.post("send").request({
    FromEmail: from,
    FromName: "Curant24",
    Subject: subject,
    "HTML-part": html,
    Recipients: [{ Email: target }],
  });
  request
    .then((result) => {
      console.log({ ...result.body });
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
