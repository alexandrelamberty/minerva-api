const { Request, Response } = require("express");
const openaiService = require("../services/openai.service");
const { ErrorResponse } = require("../utils/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../utils/success.response");

const openaiController = {
  /**
   * Prompt for a description of a category name
   * @param {Request} req
   * @param {Response} res
   */
  suggestCategory: async (req, res) => {
    const response = await openaiService.suggestCategoryName();
    if (!response) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(response);
  },

  /**
   * Prompt for a description of a category name
   * @param {Request} req
   * @param {Response} res
   */
  describeCategory: async (req, res) => {
    const terms = req.body.terms;
    const response = await openaiService.describeCategory(terms);
    if (!response) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(response);
  },

  /**
   * Prompt for a suggestion of a training name
   * @param {Request} req
   * @param {Response} res
   */
  suggestTraining: async (req, res) => {
    const response = await openaiService.suggestTrainingName();
    if (!response) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(response);
  },

  /**
   * Prompt for a description of a training name
   * @param {Request} req
   * @param {Response} res
   */
  describeTraining: async (req, res) => {
    const terms = req.body.terms;
    const description = await openaiService.describeTraining(terms);
    if (!description) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(description);
  },
};

module.exports = openaiController;
