const bookController = require("../controllers/book.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const {
  bookValidator,
  bookCoverValidator,
} = require("../validators/book.validators");

const bookRouter = require("express").Router();

const multer = require("multer");
const storage = require("../utils/config.multer")("covers");
const upload = multer({ storage });

bookRouter
  .route("/")
  .get(pagination(), bookController.getAll)
  .post(
    authJwt(["Admin"]),
    bodyValidation(bookValidator),
    bookController.create
  );

bookRouter.route("/search/:terms").get(bookController.search);

bookRouter
  .route("/:id")
  .get(bookController.getById)
  .put(bodyValidation(bookValidator), bookController.update)
  .patch(
    bodyValidation(bookCoverValidator),
    upload.single("cover"),
    bookController.updateCover
  )
  .delete(authJwt(["Admin"]), bookController.delete);

module.exports = bookRouter;
