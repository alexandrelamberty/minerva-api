const { Request, Response } = require("express");
const categoryService = require("../services/training-category.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const categoryController = {
  /**
   * Search Categories
   * @param {Request} req
   * @param {Response} res
   */
  search: async (req, res) => {
    const { terms } = req.params;
    const { categories, count } = await categoryService.search(terms);
    res.status(200).json(new SuccessArrayResponse(categories, count));
  },

  /**
   * Get All Categories
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { categories, count } = await categoryService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(categories, count));
  },

  /**
   * Get a Category By Id
   * @param {Request} req
   * @param {Response} res
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const category = await categoryService.getById(id);
    if (!category) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(category));
  },

  /**
   * Create a Category
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req, res) => {
    const data = req.body;
    const alreadyExists = await categoryService.nameAlreadyExists(data.name);
    if (alreadyExists) {
      return res
        .status(409)
        .json(new ErrorResponse("Le nom du genre existe déjà", 409));
    }
    const category = await categoryService.create(data);
    res.location("/genre/" + category.id);
    res.status(201).json(new SuccessResponse(category, 201));
  },

  /**
   * Update a Category
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const alreadyExists = await categoryService.nameAlreadyExists(data.name);
    if (alreadyExists) {
      return res
        .status(409)
        .json(new ErrorResponse("The name of the Category already exist", 409));
    }
    const isUpdated = await categoryService.update(id, data);
    if (!isUpdated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete a Category
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const isDeleted = await categoryService.delete(id);
    if (!isDeleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};

module.exports = categoryController;
