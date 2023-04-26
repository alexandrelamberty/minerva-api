const { Request, Response, NextFunction } = require("express");
const db = require("../models");
const userService = require("../services/user.service");
const { ErrorResponse } = require("../utils/error.response");
const jwt = require("../utils/jwt-utils");

const authJwt = (roles) => {
  /**
   * Middleware JWT
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  return async (req, res, next) => {
    const bearerToken = req.headers.authorization;

    const token = bearerToken?.split(" ")[1];

    if (!token || token === "" || token === "undefined") {
      res
        .status(401)
        .json(
          new ErrorResponse("Non autorisé : Vous devez être connecté", 401)
        );
      return;
    }
    console.log("HERE", token);

    const payload = await jwt.decode(token);

    if (roles) {
      const connectedUser = await userService.getById(payload.id);
      roles = roles.map((r) => r.toLowerCase());
      const canAccess = roles.includes(connectedUser.role.toLowerCase());
      if (!canAccess) {
        res.status(403).json(new ErrorResponse("Accès interdit", 403));
        return;
      }
    }

    req.user = payload;

    next();
  };
};

module.exports = authJwt;
