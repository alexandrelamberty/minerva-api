const { Request, Response } = require("express");
const authService = require("../services/auth.service");
const { ErrorResponse } = require("../responses/error.response");

/**
 * Controller for handling home route.
 * @module controllers/homeController
 */
module.exports = {
  /**
   * Handles the home route request.
   * @memberof module:controllers/homeController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  home: async (req, res) => {
    res.status(200).json("Minerva - Training Management System API");
  },
};
