const { Request, Response } = require("express");
const studentService = require("../services/student.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const studentController = {
  /**
   * Search students
   * @param {Request} req
   * @param {Response} res
   */
  search: async (req, res) => {
    const terms = req.params.terms;
    const { students: students, count } = await studentService.search(terms);
    res.status(200).json(new SuccessArrayResponse(students, count));
  },

  /**
   * Get All Students
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination;
    const { students, count } = await studentService.getAll(offset, limit);
    res.status(200).json(new SuccessArrayResponse(students, count));
  },

  /**
   * Get a Student By Id
   * @param {Request} req
   * @param {Response} res
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
   * Update a Student
   * @param {Request} req
   * @param {Response} res
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
   * Delete a Student
   * @param {Request} req
   * @param {Response} res
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

module.exports = studentController;
