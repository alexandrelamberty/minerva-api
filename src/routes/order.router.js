const orderController = require("../controllers/order.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const {
  createOrderValidator,
  updateOrderValidator,
} = require("../validators/order.validators");

const orderRouter = require("express").Router();

orderRouter
  .route("/")
  .get(pagination(), orderController.getAll)
  .post(
    authJwt(["Admin", "User"]),
    bodyValidation(createOrderValidator),
    orderController.create
  );

orderRouter
  .route("/:id")
  .get(orderController.getById)
  .put(bodyValidation(updateOrderValidator), orderController.update)
  .delete(authJwt(["Admin"]), orderController.delete);

module.exports = orderRouter;
