const { Request, Response } = require("express");
const publisherService = require("../services/publisher.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const publisherController = {
  /**
   * Search for Publishers
   * @param {Request} req
   * @param {Response} res
   */
  search: async (req, res) => {
    const { terms } = req.params;
    const { publishers, count } = await publisherService.search(terms);
    res.status(200).json(new SuccessArrayResponse(publishers, count));
  },

  /**
   * Get All Publishers
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { publishers, count } = await publisherService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(publishers, count));
  },

  /**
   * Get A Publisher By Id
   * @param {Request} req
   * @param {Response} res
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const publisher = await publisherService.getById(id);
    if (!publisher) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(publisher));
  },

  /**
   * Create a Publisher
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req, res) => {
    const data = req.body;
    const publisher = await publisherService.create(data);
    res.location("/publisher/" + publisher.id);
    res.status(201).json(new SuccessResponse(publisher, 201));
  },

  /**
   * Update a Publisher
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updated = await publisherService.update(id, data);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete a Publisher
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted = await publisherService.delete(id);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};

module.exports = publisherController;
