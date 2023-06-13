const { Request, Response } = require("express");
const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const { ErrorResponse } = require("../responses/error.response");
const { SuccessResponse } = require("../responses/success.response");
const jwt = require("../utils/jwt");
const mailService = require("../services/mail.service");

/**
 * Controller for authentication-related operations.
 * @module controllers/authController
 */
module.exports = {
  /**
   * Register a new user.
   * @memberof module:controllers/authController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  register: async (req, res) => {
    const data = req.body;
    const user = await authService.register(data);
    if (!user) {
      res.sendStatus(400);
      return;
    }
    const token = await jwt.generate(user);
    res.status(201).json(new SuccessResponse({ token, user }, 201));
  },
  /**
   * Login a user.
   * @memberof module:controllers/authController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    if (!user) {
      res.status(400).json(new ErrorResponse("Bad credentials"));
      return;
    }
    const token = await jwt.generate(user);
    res.status(200).json(new SuccessResponse({ token, user }));
  },

  resetPassword: async (req, res) => {
    const email = req.params.email;
    const user = await userService.findByEmail(email);
    if (!user) {
      res.status(400).json(new ErrorResponse("No user with this email!"));
      return;
    }
    const send = mailService.sendMail(email);
    if (!send) {
      res.status(400).json(new ErrorResponse("Email error"));
      return;
    }
    res.status(200).json(new SuccessResponse({ token, user }));
  },

  /**
   * Get the user's information.
   * @memberof module:controllers/authController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  whoami: async (req, res) => {
    res.status(200).json(req.user);
  },
};
