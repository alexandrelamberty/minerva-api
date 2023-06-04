const { Request, Response } = require("express");
const teacherService = require("../services/teacher.service");
const { ErrorResponse } = require("../responses/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../responses/success.response");

/**
 * Controller for teacher-related operations.
 * @module controllers/teacherController
 * @see {@link module:services/teacher}
 */
module.exports = {
  /**
   * Search for teachers based on the provided search terms.
   * @memberof module:controllers/teacherController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { teachers: teachers, count } = await teacherService.search(terms);
    res.status(200).json(new SuccessArrayResponse(teachers, count));
  },

  /**
   * Get all teachers with pagination.
   * @memberof module:controllers/teacherController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { teachers, count } = await teacherService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(teachers, count));
  },

  /**
   * Get a teacher by its ID.
   * @memberof module:controllers/teacherController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const teacher = await teacherService.getById(id);
    if (!teacher) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(teacher));
  },

  /**
   * Create a new teacher.
   * @memberof module:controllers/teacherController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  create: async (req, res) => {
    const data = req.body;
    const teacher = await teacherService.create(data);
    res.location("/teacher/" + teacher.id);
    res.status(201).json(new SuccessResponse(teacher, 201));
  },

  /**
   * Update a teacher.
   * @memberof module:controllers/teacherController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updated = await teacherService.update(data, id);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete a teacher.
   * @memberof module:controllers/teacherController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted = await teacherService.delete(id);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};
