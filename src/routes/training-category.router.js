const trainingCategoryController = require("../controllers/training-category.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const {
  createCategoryValidator,
  updateCategoryValidator,
} = require("../validators/category.validators");

const trainingCategoryRouter = require("express").Router();

trainingCategoryRouter
  .route("/")
  .get(pagination(), trainingCategoryController.getAll)
  .post(
    // authJwt(["Admin", "User"]),
    bodyValidation(createCategoryValidator),
    trainingCategoryController.create
  );

trainingCategoryRouter
  .route("/:id")
  .get(trainingCategoryController.getById)
  .put(
    bodyValidation(updateCategoryValidator),
    trainingCategoryController.update
  )
  .delete(/*authJwt(["Admin"]), */ trainingCategoryController.delete);

module.exports = trainingCategoryRouter;
