const openaiController = require("../controllers/openai.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");

const openaiRouter = require("express").Router();

/**
 * Suggest Category Name
 */
openaiRouter.route("/category/suggest").get(
  // authJwt(),
  openaiController.suggestCategory
);

/**
 * Describe Category
 */
openaiRouter
  .route("/category/describe")
  .post(openaiController.describeCategory);

/**
 * Suggest Training Name
 */
openaiRouter.route("/training/suggest").get(
  // authJwt(),
  openaiController.suggestTraining
);

/**
 * Describe Training Name
 */
openaiRouter
  .route("/training/describe")
  .post(openaiController.describeTraining);

/**
 * Generate a thumbnail
 */
openaiRouter.route("/thumbnail").post(openaiController.thumbnail);

module.exports = openaiRouter;
