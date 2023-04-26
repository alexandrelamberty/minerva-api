const { Request, Response } = require("express");
const genreService = require("../services/genre.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const genreController = {
  /**
   * Get All Genres
   * @param {Request} req
   * @param {Response} res
   */
  search: async (req, res) => {
    const { terms } = req.params;
    const { genres, count } = await genreService.search(terms);
    res.status(200).json(new SuccessArrayResponse(genres, count));
  },

  /**
   * Get All Genres
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { genres, count } = await genreService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(genres, count));
  },

  /**
   * Get a Genre By Id
   * @param {Request} req
   * @param {Response} res
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const genre = await genreService.getById(id);
    if (!genre) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(genre));
  },

  /**
   * Create a Genre
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req, res) => {
    const data = req.body;
    const alreadyExists = await genreService.nameAlreadyExists(data.name);
    if (alreadyExists) {
      return res
        .status(409)
        .json(new ErrorResponse("Le nom du genre existe déjà", 409));
    }
    const genre = await genreService.create(data);
    res.location("/genre/" + genre.id);
    res.status(201).json(new SuccessResponse(genre, 201));
  },

  /**
   * Update a Genre
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const alreadyExists = await genreService.nameAlreadyExists(data.name);
    if (alreadyExists) {
      return res
        .status(409)
        .json(new ErrorResponse("Le nom du genre existe déjà", 409));
    }
    const isUpdated = await genreService.update(id, data);
    if (!isUpdated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete a Genre
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const isDeleted = await genreService.delete(id);
    if (!isDeleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};

module.exports = genreController;
