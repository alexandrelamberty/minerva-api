const genreRouter = require("express").Router();
const genreController = require("../controllers/genre.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const genreValidator = require("../validators/genre.validators");

genreRouter
  .route("/")
  .get(pagination({ defaultLimit: 30, maxLimit: 200 }), genreController.getAll)
  .post(
    authJwt(["Admin"]),
    bodyValidation(genreValidator),
    genreController.create
  );

genreRouter.route("/search/:terms").get(genreController.search);

genreRouter
  .route("/:id")
  .get(genreController.getById)
  .put(bodyValidation(genreValidator), genreController.update)
  .put(
    authJwt(["Admin"]),
    bodyValidation(genreValidator),
    genreController.update
  )
  .delete(authJwt(["Admin"]), genreController.delete);

module.exports = genreRouter;
