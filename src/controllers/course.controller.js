const { Request, Response } = require("express");
const courseService = require("../services/course.service");
const { ErrorResponse } = require("../responses/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../responses/success.response");

/**
 * Controller for course-related operations.
 * @module controllers/courseController
 */
module.exports = {
  /**
   * Search for courses based on the provided search terms.
   * @memberof module:controllers/courseController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { courses, count } = await courseService.search(terms);
    res.status(200).json(new SuccessArrayResponse(courses, count));
  },

  /**
   * Get all courses with pagination.
   * @memberof module:controllers/courseController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getAll: async (req, res) => {
    console.log("GET ALL", req.query);
    // ?studentId=1&details=true
    const studentId = req.query.studentId;
    const teacherId = req.query.teacherId;
    const details = req.query.details;
    console.log(studentId, teacherId, details);
    const { offset, limit } = req.pagination;
    // Switch between request params
    console.log("Controller query: ", req.query);
    const { courses, count } = await courseService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(courses, count));
  },

  /**
   * Get a course by its ID.
   * @memberof module:controllers/courseController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  getById: async (req, res) => {
    const { id } = req.params;
    const course = await courseService.getById(id);
    if (!course) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(new SuccessResponse(course));
  },

  /**
   * Create a new course.
   * @memberof module:controllers/courseController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  create: async (req, res) => {
    console.log("Controller Create Course: ", req.body);
    const data = req.body;
    const course = await courseService.create(data);
    res.location("/courses/" + course.id);
    res.status(201).json(new SuccessResponse(course, 201));
  },

  /**
   * Update a course.
   * @memberof module:controllers/courseController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updated = await courseService.update(id, data);
    console.log("Controller updated: ", updated);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete a course
   * @memberof module:controllers/courseController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  delete: async (req, res) => {
    const { id } = req.params;
    const deleted = await courseService.delete(id);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  },

  /**
   * Delete a Course
   * @param {Request} req
   * @param {Response} res
   */
  getDates: async (req, res) => {
    const { id } = req.params;
    const dates = await courseService.getDates(id);
    res.status(201).json(new SuccessResponse(dates, 201));
  },

  getMaterials: async (req, res) => {
    const { id } = req.params;
    const dates = await courseService.getDates(id);
    res.status(201).json(new SuccessResponse(dates, 201));
  },
};
