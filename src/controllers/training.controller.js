const { Request, Response } = require("express");
const trainingService = require("../services/training.service");
const { ErrorResponse } = require("../responses/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../responses/success.response");
const { deleteCover } = require("../utils/files");

/**
 * Controller for training-related operations.
 * @module controllers/trainingController
 * @see {@link module:services/training}
 */
module.exports = {
  /**
   * Search for trainings based on the provided search terms.
   * @memberof module:controllers/trainingController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { trainings, count } = await trainingService.search(terms);
    res.status(200).json(new SuccessArrayResponse(trainings, count));
  },

  /**
   * Get all trainings with pagination.
   * @memberof module:controllers/trainingController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const genreId = req.query.genreId;
    console.log(req);
    const { trainings, count } = await trainingService.getAll(
      offset,
      limit,
      genreId
    );
    res.status(200).json(new SuccessArrayResponse(trainings, count));
  },

  /**
   * Get a training by its ID.
   * @memberof module:controllers/trainingController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const book = await trainingService.getById(id);
    if (!book) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(book));
  },

  /**
   * Create a new training.
   * @memberof module:controllers/trainingController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  create: async (req, res) => {
    console.log("createTraining");
    const data = req.body;

    // Check if the training name is unique
    // const alreadyExists = await trainingService.nameAlreadyExists(data.name);
    // if (alreadyExists) {
    //   return res
    //     .status(409)
    //     .json(new ErrorResponse("The training name already exists!", 409));
    // }

    // Create the training
    const training = await trainingService.create(data);

    // Success Response
    res.location("/trainings/" + training.id);
    res.status(201).json(new SuccessResponse(training, 201));
  },

  /**
   * Update a training.
   * @memberof module:controllers/trainingController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const alreadyExists = await trainingService.nameAlreadyExists(data.name);
    if (alreadyExists) {
      return res
        .status(409)
        .json(new ErrorResponse("The training name already exists!", 409));
    }

    const updated = await trainingService.update(id, data);
    if (!updated) {
      res.sendStatus(404);
      return;
    }

    // Success Response
    res.location = "/trainings/" + id;
    res.sendStatus(204);
  },

  /**
   * Delete a training
   * @memberof module:controllers/trainingController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  delete: async (req, res) => {
    const { id } = req.params;

    const training = await trainingService.getById(id);
    if (!training) {
      res.status(404).json(new ErrorResponse("Training not found", 404));
      return;
    }

    // Retrieve the training cover
    const cover = training.cover;

    const deleted = await trainingService.delete(id);
    if (!deleted) {
      res.sendStatus(404);
      return;
    } else {
      deleteCover(cover);
    }

    // Success Response
    res.sendStatus(204);
  },

  /**
   * Uploads a cover image for a training.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  postCover: async (req, res) => {
    console.log("postCover");
    const { id } = req.params;
    const filename = req.file ? req.file.filename : null;
    console.log("Post cover: ", id, filename);
    const isUpdated = await trainingService.updateCover(id, filename);
    if (!isUpdated) {
      res.status(404).json(new ErrorResponse("Training not found", 404));
      return;
    }

    // Success Response
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
   * Update a Training Cover
   * @param {Request} req
   * @param {Response} res
   */
  updateCover: async (req, res) => {
    console.log("updateCover");
    const { id } = req.params;
    const filename = req.file ? req.file.filename : null;

    // Retrieve the training by ID
    const training = await trainingService.getById(id);
    if (!training) {
      // If the training is not found, send a 404 error response
      res.status(404).json(new ErrorResponse("Training not found", 404));
      return;
    }

    // Delete the old cover image
    const cover = training.cover;
    if (cover) deleteCover(cover);

    // Update the cover image for the training
    const isUpdated = await trainingService.updateCover(id, filename);
    if (!isUpdated) {
      // If the update fails, send a 404 error response
      res.status(404).json(new ErrorResponse("Training not found", 404));
      return;
    }

    // Success Response
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
