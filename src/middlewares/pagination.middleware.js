const { Request, Response, NextFunction } = require("express");

/**
 * Middleware function for handling pagination parameters in request query.
 * @module middlewares/pagination
 * @param {Object} options - Configuration options.
 * @param {number} options.defaultLimit - The default limit for pagination.
 * @param {number} options.maxLimit - The maximum limit for pagination.
 * @returns {Function} - Express middleware function.
 */
module.exports = (options) => {
  const defaultLimit = options?.defaultLimit ?? 20;
  const maxLimit = options?.maxLimit ?? 50;

  /**
   * Express middleware function for handling pagination.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  return (req, res, next) => {
    const reqOffset = parseInt(req.query.offset);
    const reqLimit = parseInt(req.query.limit);

    const offset = isNaN(reqOffset) || reqOffset < 0 ? 0 : reqOffset;
    const limit =
      isNaN(reqLimit) || reqLimit <= 0
        ? defaultLimit
        : Math.min(reqLimit, maxLimit);

    req.pagination = { offset, limit };

    next();
  };
};
