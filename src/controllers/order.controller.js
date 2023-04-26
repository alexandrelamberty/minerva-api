const { Request, Response } = require("express");
const orderService = require("../services/order.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const orderController = {
  /**
   * Get All Orders
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    console.log("Get All Orders controller");
    const { offset, limit } = req.pagination;
    const { orders, count } = await orderService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(orders, count));
  },

  /**
   * Get an Order By Id
   * @param {Request} req
   * @param {Response} res
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const order = await orderService.getById(id);
    if (!order) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(order));
  },

  /**
   * Create an Order
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req, res) => {
    console.log("CREATE ORDER CONTROLLER");
    const data = req.body;
    console.log(req.user);
    const userId = req.user.id;
    const order = await orderService.create(userId, data);
    res.location("/order/" + order.id);
    res.status(201).json(new SuccessResponse(order, 201));
  },

  /**
   * Update an Order
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const updated = await orderService.update(id, data);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete an Order
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted = await orderService.delete(id);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};

module.exports = orderController;
