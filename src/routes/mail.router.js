const mailController = require("../controllers/mail.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");

const mailRouter = require("express").Router();

/**
 * Suggest Category Name
 */
mailRouter.route("/send").get(
  // authJwt(),
  mailController.send
);

module.exports = mailRouter;
