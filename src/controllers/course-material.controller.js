const { Request, Response } = require("express");
const materialService = require("../services/material.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const materialController = {
  /**
   * Get All Materials
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { orders, count } = await materialService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(orders, count));
  },

  /**
   * Get a Material By Id
   * @param {Request} req
   * @param {Response} res
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
   * Create a Material
   * @param {Request} req
   * @param {Response} res
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
   * Update a Material
   * @param {Request} req
   * @param {Response} res
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
   * Delete a Material
   * @param {Request} req
   * @param {Response} res
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

module.exports = materialController;
