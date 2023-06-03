const { Request, Response } = require("express");
const enrollmentService = require("../services/enrollment.service");
const { ErrorResponse } = require("../responses/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../responses/success.response");

/**
 * Controller for enrollment-related operations.
 * @module controllers/enrollmentController
 */
const enrollmentController = {
  /**
   * Search for enrollments based on the provided search terms.
   * @memberof module:controllers/enrollmentController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { enrollments: enrollments, count } = await enrollmentService.search(
      terms
    );
    res.status(200).json(new SuccessArrayResponse(enrollments, count));
  },

  /**
   * Get all enrollments with pagination.
   * @memberof module:controllers/enrollmentController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { enrollments, count } = await enrollmentService.getAll(
      offset,
      limit
    );
    res.status(200).json(new SuccessArrayResponse(enrollments, count));
  },

  /**
   * Get an enrollment by its ID.
   * @memberof module:controllers/enrollmentController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getById: async (req, res) => {
    const { id } = req.params;
    // FIXME:
    // const connectedUserRole = req.enrollment.role;
    // const connectedUserId = req.enrollment.id;
    // if (connectedUserRole !== "Admin" && connectedUserId !== parseInt(id)) {
    //   res.status(403).json(new ErrorResponse("Forbidden Access", 403));
    //   return;
    // }
    const enrollment = await enrollmentService.getById(id);
    if (!enrollment) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(enrollment));
  },

  /**
   * Create a new enrollment.
   * @memberof module:controllers/enrollmentController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  create: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updated = await enrollmentService.create(data, id);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Update an enrollment.
   * @memberof module:controllers/enrollmentController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updated = await enrollmentService.update(data, id);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete an enrollment.
   * @memberof module:controllers/enrollmentController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted = await enrollmentService.delete(id);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};

module.exports = enrollmentController;
