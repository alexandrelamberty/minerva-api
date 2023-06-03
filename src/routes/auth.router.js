const authController = require("../controllers/auth.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validators");

/** Express router providing user related routes
 * @module routers/authRouter
 * @requires express
 */

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace authRouter
 */
const authRouter = require("express").Router();

/**
 * Route for registering a new user.
 * @name /register
 * @function
 * @memberof module:routers/authRouter
 * @param {function} middleware - Middleware function for request body validation using the registerValidator.
 * @param {function} controller - Controller function for user registration.
 */
authRouter
  .route("/register")
  .post(bodyValidation(registerValidator), authController.register);

/**
 * Route for user login.
 * @name /login
 * @function
 * @memberof module:routers/authRouter
 * @param {function} middleware - Middleware function for request body validation using the loginValidator.
 * @param {function} controller - Controller function for user login.
 */
authRouter
  .route("/login")
  .post(bodyValidation(loginValidator), authController.login);

/**
 * Route for getting the current user's information.
 * @name /whoami
 * @function
 * @memberof module:routers/authRouter
 * @param {function} middleware - Middleware function for JWT authentication and authorization.
 * @param {string[]} roles - Array of roles allowed to access this route.
 * @param {function} controller - Controller function for getting user information.
 */
authRouter
  .route("/whoami")
  .get(authJwt(["Admin", "User"]), authController.whoami);

module.exports = authRouter;
