const trainingCategoryController = require("../controllers/training-category.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const {
  createCategoryValidator,
  updateCategoryValidator,
} = require("../validators/training-category.validators");
const multer = require("multer");

const trainingCategoryRouter = require("express").Router();

/**
 * Multer configuration for the trainings covers
 */
const storage = require("../utils/config.multer")("covers");
const upload = multer({ storage });

/**
 * Search Trainings Categories
 */
trainingCategoryRouter
  .route("/search/:terms")
  .get(trainingCategoryController.search);

/**
 * Get All Trainings Categories
 */
trainingCategoryRouter
  .route("/")
  .get(pagination(), trainingCategoryController.getAll)
  .post(
    // authJwt(["Admin"]),
    bodyValidation(createCategoryValidator),
    trainingCategoryController.create
  );

/**
 * Read, Update and Delete Training Category
 */
trainingCategoryRouter
  .route("/:id")
  .get(trainingCategoryController.getById)
  .put(
    // authJwt(["Admin"]),
    bodyValidation(updateCategoryValidator),
    trainingCategoryController.update
  )
  .delete(/*authJwt(["Admin"]), */ trainingCategoryController.delete);

/**
 * Post / Update a Training Category Cover
 */
trainingCategoryRouter
  .route("/:id/cover")
  .post(
    // authJwt(["Admin"]),
    upload.single("cover"),
    // bodyValidation(updateCategoryValidator),
    trainingCategoryController.postCover
  )
  .put(
    // authJwt(["Admin"]),
    upload.single("cover"),
    // bodyValidation(updateCategoryValidator),
    trainingCategoryController.updateCover
  )
  .delete(/*authJwt(["Admin"]), */ trainingCategoryController.delete);

module.exports = trainingCategoryRouter;
