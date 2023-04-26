const authController = require("../controllers/auth.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validators");

const authRouter = require("express").Router();

authRouter
  .route("/register")
  .post(bodyValidation(registerValidator), authController.register);

authRouter
  .route("/login")
  .post(bodyValidation(loginValidator), authController.login);

authRouter
  .route("/whoami")
  .get(authJwt(["Admin", "User"]), authController.whoami);

module.exports = authRouter;
