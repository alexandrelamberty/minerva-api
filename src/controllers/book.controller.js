const { Request, Response } = require("express");
const bookService = require("../services/book.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const bookController = {
  /**
   * Search Books
   * @param {Request} req
   * @param {Response} res
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { books, count } = await bookService.search(terms);
    res.status(200).json(new SuccessArrayResponse(books, count));
  },

  /**
   * Get All Books
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const genreId = req.query.genreId;
    console.log(req);
    const { books, count } = await bookService.getAll(offset, limit, genreId);
    res.status(200).json(new SuccessArrayResponse(books, count));
  },

  /**
   * Get a Book By Id
   * @param {Request} req
   * @param {Response} res
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const book = await bookService.getById(id);
    if (!book) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(book));
  },

  /**
   * Create a Book
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req, res) => {
    const data = req.body;
    const book = await bookService.create(data);
    res.location("/book/" + book.id);
    res.status(201).json(new SuccessResponse(book, 201));
  },

  /**
   * Update a Book
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updated = await bookService.update(id, data);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.location = "/book/" + id;
    res.sendStatus(204);
  },

  /**
   * Delete a Book
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted = await bookService.delete(id);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Update a Book cover
   * @param {Request} req
   * @param {Response} res
   */
  updateCover: async (req, res) => {
    const { id } = req.params;
    console.log("controller file : ", req.file);
    const filename = req.file.filename;
    const isUpdated = await bookService.updateCover(id, filename);
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

module.exports = bookController;
