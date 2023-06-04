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
const storage = require("../config/config.multer")("covers");
const upload = multer({ storage });

/**
 * Route for searching trainings by terms.
 * @name /search/:terms
 * @function
 * @memberof module:routers/trainingRouter
 * @param {function} controller - Controller function for searching trainings.
 */
trainingRouter.route("/search/:terms").get(trainingController.search);

/**
 * Route for getting all trainings with pagination.
 * @name /
 * @function
 * @memberof module:routers/trainingRouter
 * @param {function} middleware - Middleware function for pagination.
 * @param {function} controller - Controller function for getting all categories.
 */
trainingRouter.route("/").get(pagination(), trainingController.getAll);

/**
 * Route for creating a new training.
 * @name /
 * @function
 * @memberof module:routers/categoryRouter
 * @param {function} middleware - Middleware function for JWT authentication and authorization.
 * @param {function} middleware - Middleware function for request body validation using the trainingValidator.
 * @param {function} controller - Controller function for creating a new category.
 */
trainingRouter.route("/").post(
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
