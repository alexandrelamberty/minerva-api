const trainingController = require("../controllers/training.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const multer = require("multer");
const {
  createTrainingValidator,
  updateTrainingValidator,
} = require("../validators/training.validators");

const trainingRouter = require("express").Router();

/**
 * Multer configuration for the trainings covers
 */
const storage = require("../utils/config.multer")("covers");
const upload = multer({ storage });

/**
 * Search Trainings
 */
trainingRouter.route("/search/:terms").get(trainingController.search);

/**
 * Get all trainings / Post training
 */
trainingRouter.route("/").get(pagination(), trainingController.getAll).post(
  // authJwt(["Admin"]),
  bodyValidation(createTrainingValidator),
  trainingController.create
);

/**
 * Read, Update and Delete Training
 */
trainingRouter
  .route("/:id")
  .get(trainingController.getById)
  .put(
    // authJwt(["Admin"]),
    bodyValidation(updateTrainingValidator),
    trainingController.update
  )
  .delete(
    // authJwt(["Admin"]),
    trainingController.delete
  );

/**
 * Post / Update a Training Cover
 */
trainingRouter
  .route("/:id/cover")
  .post(
    // authJwt(["Admin"]),
    upload.single("cover"),
    // bodyValidation(updateCategoryValidator),
    trainingController.postCover
  )
  .put(
    // authJwt(["Admin"]),
    upload.single("cover"),
    // bodyValidation(updateCategoryValidator),
    trainingController.updateCover
  )
  .delete(/*authJwt(["Admin"]), */ trainingController.delete);

module.exports = trainingRouter;
