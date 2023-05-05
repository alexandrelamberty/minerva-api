const materialController = require("../controllers/material.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const { materialValidator } = require("../validators/material.validators");

const materialRouter = require("express").Router();

materialRouter.route("/search/:terms").get(materialController.search);

materialRouter
  .route("/")
  .get(pagination(), materialController.getAll)
  .post(
    authJwt(["Admin"]),
    bodyValidation(materialValidator),
    materialController.create
  );

materialRouter
  .route("/:id")
  .get(materialController.getById)
  .put(bodyValidation(materialValidator), materialController.update)
  .delete(authJwt(["Admin"]), materialController.delete);

module.exports = materialRouter;
