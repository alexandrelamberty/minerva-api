const { Request, Response, NextFunction } = require("express");
const { ErrorResponse } = require("../responses/error.response");
const jwt = require("../utils/jwt");
const userService = require("../services/user.service");

/**
 * Middleware function for role-based authentication and authorization.
 * @module middleware/jwt
 * @param {string[]} roles - An array of roles allowed to access the route.
 * @returns {Function} - The middleware function.
 */
module.exports = (roles) => {
  /**
   * Middleware function executed for each request.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {void}
   */
  return async (req, res, next) => {
    const bearerToken = req.headers.authorization;

    const token = bearerToken?.split(" ")[1];

    // Check if the token is missing or invalid
    if (!token || token === "" || token === "undefined") {
      res
        .status(401)
        .json(
          new ErrorResponse(
            "Unauthorized! You need to provide a bearer token.",
            401
          )
        );
      return;
    }

    // Decode the token to extract the payload
    const payload = await jwt.decode(token);

    // If roles are specified, check if the connected user has the required role
    if (roles) {
      const connectedUser = await userService.getById(payload.id);
      roles = roles.map((r) => r.toLowerCase());
      const canAccess = roles.includes(connectedUser.role.toLowerCase());
      // If the user does not have the required role, deny access
      if (!canAccess) {
        res.status(403).json(new ErrorResponse("Forbidden access!", 403));
        return;
      }
    }

    // Attach the decoded payload to the request object for further processing
    req.user = payload;

    next();
  };
};
