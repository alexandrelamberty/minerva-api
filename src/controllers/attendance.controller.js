const { Request, Response } = require("express");
const attendanceService = require("../services/attendance.service");
const { ErrorResponse } = require("../responses/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../responses/success.response");

/**
 * Controller for attendance-related operations.
 * @module controllers/attendanceController
 */
module.exports = {
  /**
   * Search for attendances based on the provided search terms.
   * @memberof module:controllers/attendanceController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  search: async (req, res) => {
    const { terms } = req.params;
    const { attendances, count } = await attendanceService.search(terms);
    res.status(200).json(new SuccessArrayResponse(attendances, count));
  },

  /**
   * Get all attendances with pagination.
   * @memberof module:controllers/attendanceController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { attendances, count } = await attendanceService.getAll(
      offset,
      limit
    );
    res.status(200).json(new SuccessArrayResponse(attendances, count));
  },

  /**
   * Get an attendance by its ID.
   * @memberof module:controllers/attendanceController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const attendance = await attendanceService.getById(id);
    if (!attendance) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(attendance));
  },

  /**
   * Create a new attendance.
   * @memberof module:controllers/attendanceController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  create: async (req, res) => {
    const data = req.body;
    const alreadyExists = await attendanceService.nameAlreadyExists(data.name);
    if (alreadyExists) {
      return res
        .status(409)
        .json(new ErrorResponse("Le nom du attendance existe déjà", 409));
    }
    const attendance = await attendanceService.create(data);
    res.location("/attendance/" + attendance.id);
    res.status(201).json(new SuccessResponse(attendance, 201));
  },

  /**
   * Update an attendance.
   * @memberof module:controllers/attendanceController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const alreadyExists = await attendanceService.nameAlreadyExists(data.name);
    if (alreadyExists) {
      return res
        .status(409)
        .json(new ErrorResponse("Le nom du attendance existe déjà", 409));
    }
    const isUpdated = await attendanceService.update(id, data);
    if (!isUpdated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete an attendance.
   * @memberof module:controllers/attendanceController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const isDeleted = await attendanceService.delete(id);
    if (!isDeleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },
};
