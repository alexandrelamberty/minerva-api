const userController = require("../controllers/user.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const updateUserValidator = require("../validators/user.validators");

const userRouter = require("express").Router();

const multer = require("multer");
const storage = require("../utils/config.multer")("avatars");
const upload = multer({ storage });

userRouter.route("/").get(authJwt(), pagination(), userController.getAll);

userRouter
  .route("/:id")
  .get(authJwt(), userController.getById)
  .put(authJwt(), bodyValidation(updateUserValidator), userController.update)
  // .patch(authJwt(), upload.single("avatar"), userController.updateAvatar)
  .delete(authJwt(["Admin"]), userController.delete);

module.exports = userRouter;
