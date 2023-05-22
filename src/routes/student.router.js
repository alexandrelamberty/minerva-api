const studentController = require("../controllers/student.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const updateStudentValidator = require("../validators/student.validators");
const multer = require("multer");

const studentRouter = require("express").Router();

/**
 * Search students
 */
studentRouter.route("/search/:terms").get(studentController.search);

/**
 * Get all students with pagination
 */
studentRouter.route("/").get(
  // authJwt(),
  pagination(),
  studentController.getAll
);

/**
 * Read, update and delete students
 */
studentRouter
  .route("/:id")
  .get(
    // authJwt(),
    studentController.getById
  )
  .put(
    // authJwt(),
    bodyValidation(updateStudentValidator),
    studentController.update
  )
  // .patch(authJwt(), upload.single("avatar"), studentController.updateAvatar)
  .delete(
    // authJwt(["Admin"]),
    studentController.delete
  );

module.exports = studentRouter;
