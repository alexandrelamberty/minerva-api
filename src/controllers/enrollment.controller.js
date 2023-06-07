const { Request, Response } = require("express");
const enrollmentService = require("../services/enrollment.service");
const trainingService = require("../services/training.service");
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
    const data = req.body;
    const enrollment = await enrollmentService.create(data);
    if (!enrollment) {
      res.status(404).json("Already enrolled for this training");
      return;
    }
    res.status(200).json(new SuccessResponse(enrollment));
  },

  /**
   * Update an enrollment.
   * @memberof module:controllers/enrollmentController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  update: async (req, res) => {
    const { enrollmentId } = req.params; // Enrollment id
    const { validated, studentId, trainingId } = req.body;
    console.log(
      "> Enrollment update: ",
      enrollmentId,
      validated,
      studentId,
      trainingId
    );

    // Update the enrollment
    const enrollment = await enrollmentService.update(
      {
        validated: validated,
        status: "approved",
      },
      enrollmentId
    );

    // If the enrollment is validated we add the student to the training
    if (validated) {
      const added = await trainingService.addStudent(studentId, trainingId);
      if (!added) {
        res.sendStatus(404);
        return;
      }
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
