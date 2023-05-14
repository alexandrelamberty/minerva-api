const courseController = require("../controllers/course.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const {
  createCourseValidator,
  updateCourseValidator,
} = require("../validators/course.validators");

const courseRouter = require("express").Router();

courseRouter.route("/search/:terms").get(courseController.search);

courseRouter
  .route("/")
  .get(pagination(), courseController.getAll)
  .post(bodyValidation(createCourseValidator), courseController.create);

courseRouter
  .route("/:id")
  .get(courseController.getById)
  .put(bodyValidation(updateCourseValidator), courseController.update)
  .delete(authJwt(["Admin"]), courseController.delete);

courseRouter.route("/:id/dates").get(courseController.getDates);
// .put(bodyValidation(updateCourseValidator), courseController.updateDates);

courseRouter.route("/:id/materials").get(courseController.getDates);

module.exports = courseRouter;
