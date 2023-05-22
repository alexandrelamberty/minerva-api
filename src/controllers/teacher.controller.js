const { Request, Response } = require("express");
const teacherService = require("../services/teacher.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const teacherController = {
  /**
   * Search teachers
   * @param {Request} req
   * @param {Response} res
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { teachers: teachers, count } = await teacherService.search(terms);
    res.status(200).json(new SuccessArrayResponse(teachers, count));
  },

  /**
   * Get All Teachers
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { teachers, count } = await teacherService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(teachers, count));
  },

  /**
   * Get a Teacher By Id
   * @param {Request} req
   * @param {Response} res
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
   * Update a Teacher
   * @param {Request} req
   * @param {Response} res
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
   * Delete a Teacher
   * @param {Request} req
   * @param {Response} res
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

module.exports = teacherController;
