const { Request, Response } = require("express");
const userService = require("../services/user.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const userController = {
  /**
   * Search Users
   * @param {Request} req
   * @param {Response} res
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { users: users, count } = await userService.search(terms);
    res.status(200).json(new SuccessArrayResponse(users, count));
  },

  /**
   * Get All Users
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { users, count } = await userService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(users, count));
  },

  /**
   * Get a User By Id
   * @param {Request} req
   * @param {Response} res
   */
  getById: async (req, res) => {
    const { id } = req.params;
    // FIXME:
    // const connectedUserRole = req.user.role;
    // const connectedUserId = req.user.id;
    // if (connectedUserRole !== "Admin" && connectedUserId !== parseInt(id)) {
    //   res.status(403).json(new ErrorResponse("Forbidden Access", 403));
    //   return;
    // }
    const user = await userService.getById(id);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(user));
  },

  /**
   * Update a User
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updated = await userService.update(data, id);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete a User
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted = await userService.delete(id);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};

module.exports = userController;
