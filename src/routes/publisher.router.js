const publisherController = require("../controllers/publisher.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const publisherValidator = require("../validators/publisher.validator");

const publisherRouter = require("express").Router();

publisherRouter
  .route("/")
  .get(pagination({ defaultLimit: 25 }), publisherController.getAll)
  .post(bodyValidation(publisherValidator), publisherController.create)
  .post(
    authJwt(["Admin"]),
    bodyValidation(publisherValidator),
    publisherController.create
  );

publisherRouter.route("/search/:terms").get(publisherController.search);

publisherRouter
  .route("/:id")
  .get(publisherController.getById)
  .put(bodyValidation(publisherValidator), publisherController.update)
  .put(
    authJwt(["Admin"]),
    bodyValidation(publisherValidator),
    publisherController.update
  )
  .delete(authJwt(["Admin"]), publisherController.delete);

module.exports = publisherRouter;
