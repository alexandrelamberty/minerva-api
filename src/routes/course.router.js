const multer = require("multer");
const courseController = require("../controllers/course.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const {
  createCourseValidator,
  updateCourseValidator,
} = require("../validators/course.validators");

const courseRouter = require("express").Router();

/**
 * Multer configuration for the trainings covers
 */
const storage = require("../config/config.multer")("covers");
const upload = multer({ storage });

/**
 * Search courses
 */
courseRouter.route("/search/:terms").get(courseController.search);

/**
 * Get all courses with pagination
 * Create a new course
 */
courseRouter
  .route("/")
  .get(pagination(), courseController.getAll)
  .post(bodyValidation(createCourseValidator), courseController.create);

/**
 * Read, update and delete courses
 */
courseRouter
  .route("/:id")
  .get(courseController.getById)
  .put(bodyValidation(updateCourseValidator), courseController.update)
  .delete(
    // authJwt(["Admin"]),
    courseController.delete
  );

/**
 * Read, update and delete courses dates
 */
courseRouter.route("/:id/dates").get(courseController.getDates);
// .put(bodyValidation(updateCourseValidator), courseController.updateDates);

courseRouter.route("/:id/materials").get(courseController.getDates);

module.exports = courseRouter;
