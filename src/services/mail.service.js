const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const SENDER = process.env.EMAIL_GMAIL;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_GMAIL,
    pass: process.env.EMAIL_GMAIL_PWD,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "./src/templates/",
      defaultLayout: false,
      partialsDir: "./src/templates/",
    },
    viewPath: "./src/templates/",
    extName: ".hbs",
  })
);

async function mailPromise(options) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, function (error, info) {
      if (error) {
        console.log("Email error: ", error);
        resolve(false);
      }
      console.log("Email sent: " + info.response);
      resolve(true);
    });
  });
}

/**
 * Service to send mails
 * @module services/mail
 */
module.exports = {
  /**
   * Search for users based on the provided search terms.
   * @memberof module:services/users
   * @param {string} terms - The search terms to match against users first names, last names.
   * @returns {Promise<>} A promise that resolves to an array of User objects matching the search terms.
   * @throws {Error} - If the operation fails or encounters an error.
   */
  sendMail: async (name, email) => {
    const mailOptions = {
      from: SENDER,
      to: email,
      subject: "Minerva Reset Account Password",
      template: "account-recovery",
      context: {
        name: name,
        email: email,
        recoveryUrl:
          "https://minerva.eevos.be/account-recovery/e3a428761227ba4c3c4c6946cca7204b",
      },
    };
    return mailPromise(mailOptions);
  },

  sendRegistrationMail: async (name, email) => {
    //
    const mailOptions = {
      from: SENDER,
      to: email,
      subject: "Welcome to Minerva",
      template: "account-registration",
      context: {
        name: name,
        email: email,
        verificationUrl:
          "https://minerva.eevos.be/account-validation/e3a428761227ba4c3c4c6946cca7204b",
      },
    };
    return mailPromise(mailOptions);
  },
};
