const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const transporter = require("../config/config.mailer");
const SENDER = process.env.EMAIL_GMAIL;

async function mailPromise(options) {
  return new Promise((resolve, reject) => {
    transporter().sendMail(options, function (error, info) {
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
