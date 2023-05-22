const teacherController = require("../controllers/teacher.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const updateTeacherValidator = require("../validators/teacher.validators");

const teacherRouter = require("express").Router();

/**
 * Search teachers
 */
teacherRouter.route("/search/:terms").get(teacherController.search);

/**
 * Get all teachers with pagination
 */
teacherRouter.route("/").get(
  // authJwt(),
  pagination(),
  teacherController.getAll
);

/**
 * Read, update and delete teachers
 */
teacherRouter
  .route("/:id")
  .get(
    // authJwt(),
    teacherController.getById
  )
  .put(
    // authJwt(),
    bodyValidation(updateTeacherValidator),
    teacherController.update
  )
  // .patch(authJwt(), upload.single("avatar"), teacherController.updateAvatar)
  .delete(
    // authJwt(["Admin"]),
    teacherController.delete
  );

module.exports = teacherRouter;
