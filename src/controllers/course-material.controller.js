const { Request, Response } = require("express");
const materialService = require("../services/material.service");
const { ErrorResponse } = require("../responses/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../responses/success.response");

/**
 * Controller for material-related operations.
 * @module controllers/materialController
 */
module.exports = {
  /**
   * Get all materials with pagination.
   * @memberof module:controllers/materialController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { orders, count } = await materialService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(orders, count));
  },

  /**
   * Get an material by its ID.
   * @memberof module:controllers/materialController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const order = await materialService.getById(id);
    if (!order) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(order));
  },

  /**
   * Create a new course material.
   * @memberof module:controllers/materialController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  create: async (req, res) => {
    console.log("CREATE ORDER CONTROLLER");
    const data = req.body;
    const courseId = req.user.id;
    const order = await materialService.create(courseId, data);
    res.location("/order/" + order.id);
    res.status(201).json(new SuccessResponse(order, 201));
  },

  /**
   * Update a course material.
   * @memberof module:controllers/materialController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updated = await materialService.update(id, data);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete a course material
   * @memberof module:controllers/materialController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted = await materialService.delete(id);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};
