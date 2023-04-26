const { Request, Response } = require("express");
const authService = require("../services/auth.service");
const { ErrorResponse } = require("../utils/error.response");
const { SuccessResponse } = require("../utils/success.response");
const jwt = require("../utils/jwt-utils");

const authController = {
  /**
   * Register a new user
   * @param { Request } req
   * @param { Response} res
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
   * Login a user
   * @param { Request } req
   * @param { Response} res
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

  /**
   * Show detail about the user authentication
   * @param { Request } req
   * @param { Response} res
   */
  whoami: async (req, res) => {
    res.status(200).json(req.user);
  },
};

module.exports = authController;
