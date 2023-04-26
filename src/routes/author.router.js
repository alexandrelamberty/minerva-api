const authorController = require("../controllers/author.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const authorValidator = require("../validators/author.validators");

const authorRouter = require("express").Router();

authorRouter
  .route("/")
  .get(pagination({ defaultLimit: 25 }), authorController.getAll)
  .post(bodyValidation(authorValidator), authorController.create)
  .post(
    authJwt(["Admin"]),
    bodyValidation(authorValidator),
    authorController.create
  );

authorRouter
  .route("/search/:terms")
  .get(pagination({ defaultLimit: 25 }), authorController.search);

authorRouter
  .route("/:id")
  .get(authorController.getById)
  .put(
    authJwt(["User", "User"]),
    bodyValidation(authorValidator),
    authorController.update
  )
  .delete(authJwt(["Admin"]), authorController.delete);

module.exports = authorRouter;
