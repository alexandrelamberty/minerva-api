const { Request, Response } = require("express");
const authService = require("../services/auth.service");
const { ErrorResponse } = require("../utils/error.response");

const homeController = {
  /**
   * Show detail about the api
   * @param { Request } req
   * @param { Response} res
   */
  home: async (req, res) => {
    res.status(200).json("Epidemic Escapes - Bookstore API");
  },
};

module.exports = homeController;
