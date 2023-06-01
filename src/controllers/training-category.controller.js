const { Request, Response } = require("express");
const categoryService = require("../services/training-category.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const { deleteCover } = require("../utils/cover.fs");

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
        .json(new ErrorResponse("The category name already exists!", 409));
    }

    const category = await categoryService.create(data);

    res.location("/categories/" + category.id);
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
        .json(new ErrorResponse("The category name already exists!", 409));
    }

    const isUpdated = await categoryService.update(id, data);
    if (!isUpdated) {
      res.sendStatus(404);
      return;
    }
    res.location = "/categories/" + id;
    res.sendStatus(204);
  },

  /**
   * Delete a Category
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const { id } = req.params;

    const category = await categoryService.getById(id);
    if (!category) {
      res.status(404).json(new ErrorResponse("Category not found", 404));
      return;
    }

    // Retrieve the training cover
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

    const category = await categoryService.getById(id);
    if (!category) {
      res.status(404).json(new ErrorResponse("Category not found", 404));
      return;
    }
    // If the category has already a cover delete the old one.
    // FIXME: must be different than the property passed from the form Delete old cover
    if (category.cover) deleteCover(cover);

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

module.exports = categoryController;
