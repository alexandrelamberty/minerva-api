const trainingController = require("../controllers/training.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const trainingValidator = require("../validators/training.validators");
const trainingRouter = require("express").Router();

trainingRouter.route("/search/:terms").get(trainingController.search);

trainingRouter
  .route("/")
  .get(
    pagination({ defaultLimit: 30, maxLimit: 200 }),
    trainingController.getAll
  )
  .post(bodyValidation(trainingValidator), trainingController.create);

trainingRouter
  .route("/:id")
  .get(trainingController.getById)
  .put(
    // authJwt(["Admin"]),
    bodyValidation(trainingValidator),
    trainingController.update
  )
  .delete(/*authJwt(["Admin"]),*/ trainingController.delete);

module.exports = trainingRouter;
