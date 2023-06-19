const { ObjectSchema } = require("yup");
const { ErrorResponse } = require("../responses/error.response");

/**
 * Middleware for validating request body using Yup schema.
 * @module middlewares/bodyValidation
 * @param {Object} yupValidator - The Yup validator object.
 * @returns {Function} - Express middleware function.
 */
module.exports = (yupValidator) => {
  /**
   * Express middleware function for validating request body.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>}
   */
  return async (req, res, next) => {
    try {
      const validData = await yupValidator
        .noUnknown()
        .validate(req.body, { abortEarly: false });

      req.body = validData;

      next();
    } catch (error) {
      return res.status(400).json(new ErrorResponse(error.message));
    }
  };
};
