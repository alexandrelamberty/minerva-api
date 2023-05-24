const enrollmentController = require("../controllers/enrollment.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const {
  createEnrollmentValidator,
  updateEnrollmentValidator,
} = require("../validators/enrollment.validators");

const enrollmentRouter = require("express").Router();

/**
 * Search Trainings
 */
// enrollmentRouter.route("/search/:terms").get(enrollmentController.search);

/**
 * Get all enrollments / Post enrollment
 */
enrollmentRouter.route("/").get(pagination(), enrollmentController.getAll).post(
  // authJwt(["Admin"]),
  bodyValidation(createEnrollmentValidator),
  enrollmentController.create
);

/**
 * Read, Update and Delete enrollment
 */
enrollmentRouter
  .route("/:id")
  .get(enrollmentController.getById)
  .put(
    // authJwt(["Admin"]),
    bodyValidation(updateEnrollmentValidator),
    enrollmentController.update
  )
  .delete(
    // authJwt(["Admin"]),
    enrollmentController.delete
  );

module.exports = enrollmentRouter;
