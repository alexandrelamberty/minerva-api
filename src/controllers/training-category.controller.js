const { Request, Response } = require("express");
const categoryService = require("../services/training-category.service");
const { ErrorResponse } = require("../responses/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../responses/success.response");

const { deleteCover } = require("../utils/files");

/**
 * Controller for category-related operations.
 * @module controllers/categoryController
 */
module.exports = {
  /**
   * Search for categories based on the provided search terms.
   * @memberof module:controllers/categoryController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  search: async (req, res) => {
    const { terms } = req.params;
    const { categories, count } = await categoryService.search(terms);
    res.status(200).json(new SuccessArrayResponse(categories, count));
  },

  /**
   * Get all categories with pagination.
   * @memberof module:controllers/categoryController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { categories, count } = await categoryService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(categories, count));
  },

  /**
   * Get a category by its ID.
   * @memberof module:controllers/categoryController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
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
   * Create a new category.
   * @memberof module:controllers/categoryController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  create: async (req, res) => {
    const data = req.body;

    const alreadyExists = await categoryService.nameAlreadyExists(data.name);
    if (alreadyExists) {
      return res
        .status(409)
        .json(new ErrorResponse("The category name already exists!", 409));
    }

    const category = await categoryService.create(data);

    res.location("/categories/" + category.id);
    res.status(201).json(new SuccessResponse(category, 201));
  },

  /**
   * Update a category.
   * @memberof module:controllers/categoryController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log(id, data);
    const isUpdated = await categoryService.update(id, data);
    console.log("isUpdated ", isUpdated);
    if (!isUpdated) {
      res.sendStatus(404);
      return;
    }
    res.location = "/categories/" + id;
    res.sendStatus(204);
  },

  /**
   * Delete a category.
   * @memberof module:controllers/categoryController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  delete: async (req, res) => {
    const { id } = req.params;

    const category = await categoryService.getById(id);
    if (!category) {
      res.status(404).json(new ErrorResponse("Category not found", 404));
      return;
    }

    // Retrieve the category cover
    const cover = category.cover;

    const isDeleted = await categoryService.delete(id);
    if (!isDeleted) {
      res.sendStatus(404);
      return;
    } else {
      deleteCover(cover);
    }

    res.sendStatus(204);
  },

  /**
   * Update a Category Cover
   * @param {Request} req
   * @param {Response} res
   */
  postCover: async (req, res) => {
    console.log("postCover");
    const { id } = req.params;
    const filename = req.file ? req.file.filename : null;

    const isUpdated = await categoryService.updateCover(id, filename);
    if (!isUpdated) {
      res.status(404).json(new ErrorResponse("Category not found", 404));
      return;
    }

    console.log("filename: ", filename);

    res
      .status(201)
      .json(
        new SuccessResponse(
          { msg: "Post cover success", filename: filename },
          201
        )
      );
  },

  /**
   * Update a Category Cover
   * @param {Request} req
   * @param {Response} res
   */
  updateCover: async (req, res) => {
    const { id } = req.params;
    const filename = req.file ? req.file.filename : null;
    console.log("UpdateCover", id, filename);
    const category = await categoryService.getById(id);
    if (!category) {
      res.status(404).json(new ErrorResponse("Category not found", 404));
      return;
    }
    // If the category has already a cover delete the old one.
    // FIXME: must be different than the property passed from the form Delete old cover
    if (category.cover) deleteCover(category.cover);

    const isUpdated = await categoryService.updateCover(id, filename);
    if (!isUpdated) {
      res.status(404).json(new ErrorResponse("Category not found", 404));
      return;
    }
    res
      .status(201)
      .json(
        new SuccessResponse(
          { msg: "Update cover success", filename: filename },
          201
        )
      );
  },
};
