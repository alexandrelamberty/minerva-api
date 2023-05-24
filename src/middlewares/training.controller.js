const { Request, Response } = require("express");
const trainingService = require("../services/training.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");
const { deleteCover } = require("../utils/cover.fs");

const trainingController = {
  /**
   * Search Trainings
   * @param {Request} req
   * @param {Response} res
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { trainings, count } = await trainingService.search(terms);
    res.status(200).json(new SuccessArrayResponse(trainings, count));
  },

  /**
   * Get All Trainings
   * @param {Request} req
   * @param {Response} res
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
   * Get a Training By Id
   * @param {Request} req
   * @param {Response} res
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
   * Create a Training
   * @param {Request} req
   * @param {Response} res
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
   * Update a Training
   * @param {Request} req
   * @param {Response} res
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
   * Delete a Training and his associated cover file.
   * @param {Request} req
   * @param {Response} res
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
   * Update a Training Cover
   * @param {Request} req
   * @param {Response} res
   */
  postCover: async (req, res) => {
    console.log("postCover");
    const { id } = req.params;
    const filename = req.file ? req.file.filename : null;

    const isUpdated = await trainingService.updateCover(id, filename);
    if (!isUpdated) {
      res.status(404).json(new ErrorResponse("Training not found", 404));
      return;
    }

    console.log("filename: ", filename);

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

    const training = await trainingService.getById(id);
    if (!training) {
      res.status(404).json(new ErrorResponse("Training not found", 404));
      return;
    }

    // Delete old cover
    const cover = training.cover;
    deleteCover(cover);

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
          { msg: "Update cover success", filename: filename },
          201
        )
      );
  },
};

module.exports = trainingController;
