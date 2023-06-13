const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const transporter = () => {
  const tp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_GMAIL,
      pass: process.env.EMAIL_GMAIL_PWD,
    },
  });

  tp.use(
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

  return tp;
};

module.exports = transporter;
