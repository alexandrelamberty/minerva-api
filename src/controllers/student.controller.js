const { Request, Response } = require("express");
const studentService = require("../services/student.service");
const { ErrorResponse } = require("../responses/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../responses/success.response");

/**
 * Controller for student-related operations.
 * @module controllers/studentController
 */
module.exports = {
  /**
   * Search for students based on the provided search terms.
   * @memberof module:controllers/studentController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { students: students, count } = await studentService.search(terms);
    res.status(200).json(new SuccessArrayResponse(students, count));
  },

  /**
   * Get all students with pagination.
   * @memberof module:controllers/studentController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { students, count } = await studentService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(students, count));
  },

  /**
   * Get student by its ID.
   * @memberof module:controllers/studentController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const student = await studentService.getById(id);
    if (!student) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(student));
  },

  /**
   * Update student.
   * @memberof module:controllers/studentController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updated = await studentService.update(data, id);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete student.
   * @memberof module:controllers/studentController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted = await studentService.delete(id);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};
