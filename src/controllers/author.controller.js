const { Request, Response } = require("express");
const authorService = require("../services/author.service");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const authorController = {
  /**
   * Get All Authors
   * @param {Request} req
   * @param {Response} res
   */
  search: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { terms } = req.params;
    const { authors, count } = await authorService.search(terms);
    res.status(200).json(new SuccessArrayResponse(authors, count));
  },

  /**
   * Get All Authors
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { authors, count } = await authorService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(authors, count));
  },

  /**
   * Get an Author By Id
   * @param {Request} req
   * @param {Response} res
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const author = await authorService.getById(id);
    if (!author) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(author));
  },

  /**
   * Create an Author
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req, res) => {
    const data = req.body;
    const author = await authorService.create(data);
    res.location("/author/" + author.id);
    res.status(201).json(new SuccessResponse(author, 201));
  },

  /**
   * Update an Author
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const updated = await authorService.update(id, data);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete an Author
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted = await authorService.delete(id);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};

module.exports = authorController;
