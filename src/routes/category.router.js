const categoryController = require("../controllers/training-category.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const trainingValidator = require("../validators/training.validators");
const categoryRouter = require("express").Router();

categoryRouter.route("/search/:terms").get(categoryController.search);

categoryRouter
  .route("/")
  .get(
    pagination({ defaultLimit: 30, maxLimit: 200 }),
    categoryController.getAll
  )
  .post(
    // authJwt(["Admin"]),
    bodyValidation(trainingValidator),
    categoryController.create
  );

categoryRouter
  .route("/:id")
  .get(categoryController.getById)
  .patch(
    // authJwt(["Admin"]),
    bodyValidation(trainingValidator),
    categoryController.update
  )
  .delete(/*authJwt(["Admin"]),*/ categoryController.delete);

/**
 * Post / Update a Training Cover
 */
categoryRouter
  .route("/:id/cover")
  .post(
    // authJwt(["Admin"]),
    upload.single("cover"),
    // bodyValidation(updateCategoryValidator),
    categoryController.postCover
  )
  .put(
    // authJwt(["Admin"]),
    upload.single("cover"),
    // bodyValidation(updateCategoryValidator),
    categoryController.updateCover
  )
  .delete(/*authJwt(["Admin"]), */ categoryController.delete);

module.exports = categoryRouter;
