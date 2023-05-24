const { Request, Response } = require("express");
const enrollmentService = require("../services/enrollment.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const enrollmentController = {
  /**
   * Search Users
   * @param {Request} req
   * @param {Response} res
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { enrollments: enrollments, count } = await enrollmentService.search(
      terms
    );
    res.status(200).json(new SuccessArrayResponse(enrollments, count));
  },

  /**
   * Get All Users
   * @param {Request} req
   * @param {Response} res
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
   * Get a User By Id
   * @param {Request} req
   * @param {Response} res
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
   * Create an Enrollment
   * @param {Request} req
   * @param {Response} res
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
   * Update a User
   * @param {Request} req
   * @param {Response} res
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
   * Delete a User
   * @param {Request} req
   * @param {Response} res
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
