const { Request, Response } = require("express");
const userService = require("../services/user.service");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../responses/success.response");

/**
 * Controller for user-related operations.
 * @module controllers/userController
 */
module.exports = {
  /**
   * Searches for users based on the provided search terms.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { users: users, count } = await userService.search(terms);
    res.status(200).json(new SuccessArrayResponse(users, count));
  },

  /**
   * Retrieves a list of users with pagination support.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { users, count } = await userService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(users, count));
  },

  /**
   * Retrieves a user by their ID.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
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
   * Updates a user's information.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
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
   * Deletes a user by their ID.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
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
