const { Request, Response } = require("express");
const trainingService = require("../services/training.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const trainingController = {
  /**
   * Search Trainings
   * @param {Request} req
   * @param {Response} res
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { books, count } = await trainingService.search(terms);
    res.status(200).json(new SuccessArrayResponse(books, count));
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
    const data = req.body;
    const training = await trainingService.create(data);
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
    const updated = await trainingService.update(id, data);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.location = "/book/" + id;
    res.sendStatus(204);
  },

  /**
   * Delete a Training
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted = await trainingService.delete(id);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Update a Training cover
   * @param {Request} req
   * @param {Response} res
   */
  updateCover: async (req, res) => {
    const { id } = req.params;
    console.log("controller file : ", req.file);
    const filename = req.file.filename;
    const isUpdated = await trainingService.updateCover(id, filename);
    if (!isUpdated) {
      res.status(404).json(new ErrorResponse("Album not found", 404));
      return;
    }
    res.location = "/book/" + id;
    res
      .status(204)
      .json(new SuccessResponse({ msg: "Cover modifiée avec succès" }, 204));
    //res.sendStatus(501)
  },
};

module.exports = trainingController;
