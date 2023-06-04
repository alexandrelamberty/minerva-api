const { Request, Response } = require("express");
const openaiService = require("../services/openai.service");
const { ErrorResponse } = require("../responses/error.response");
const {
  SuccessArrayResponse,
  SuccessResponse,
} = require("../responses/success.response");

/**
 * Controller for ai-related operations.
 * @module controllers/aiController
 */
module.exports = {
  /**
   * Suggest a category name.
   * @memberof module:controllers/aiController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
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
   * Suggest a description for a category name.
   * @memberof module:controllers/aiController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
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
   * Suggest a training name
   * @memberof module:controllers/aiController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
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
   * Describe a training name
   * @memberof module:controllers/aiController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
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

  /**
   * Generate a thumbnail
   * @memberof module:controllers/aiController
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  thumbnail: async (req, res) => {
    const terms = req.body.category;
    const description = await openaiService.thumbnail(terms);
    if (!description) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(description);
  },
};
