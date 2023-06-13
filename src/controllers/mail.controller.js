const { Request, Response } = require("express");
const mailService = require("../services/mail.service");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../responses/success.response");

// TODO: disable controller
/**
 * Controller for mail operations.
 * @module controllers/mailController
 */
module.exports = {
  /**
   * Send an email.
   * This endpoint is for testing purpose!
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  send: async (req, res) => {
    const name = req.params.name;
    const email = req.params.email;
    // const info = mailService.sendMail(
    //   "Alexandre Lamberty",
    //   "alexandrelamberty@gmail.com"
    // );
    const info = await mailService.sendRegistrationMail(
      "Alexandre Lamberty",
      "alexandrelamberty@gmail.com"
    );
    if (!info) {
      res.sendStatus(404);
    }
    console.log("Email sent!");
    res.status(200).json("Email sent!");
  },
};
