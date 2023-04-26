const { Request, Response, NextFunction } = require("express");

/**
 * Middleware
 * @param { { defaultLimit : number?, maxLimit : number? }? } options
 * @returns { (req : Request , res : Response , next : NextFunction ) => undefined }
 */
const pagination = (options) => {
  const defaultLimit = options?.defaultLimit ?? 20;
  const maxLimit = options?.maxLimit ?? 50;

  /**
   * Middleware Pagination
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
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

module.exports = pagination;
