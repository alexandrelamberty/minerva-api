const categoryController = require("../controllers/training-category.controller");
const authJwt = require("../middlewares/auth.jwt.middleware");
const bodyValidation = require("../middlewares/body.validator");
const pagination = require("../middlewares/pagination.middleware");
const trainingValidator = require("../validators/training.validators");

const categoryRouter = require("express").Router();

/**
 * Route for searching categories by terms.
 * @name /search/:terms
 * @function
 * @memberof module:routers/categoryRouter
 * @param {function} controller - Controller function for searching categories.
 */
categoryRouter.route("/search/:terms").get(categoryController.search);

/**
 * Route for getting all categories with pagination.
 * @name /
 * @function
 * @memberof module:routers/categoryRouter
 * @param {function} middleware - Middleware function for pagination.
 * @param {function} controller - Controller function for getting all categories.
 */
categoryRouter
  .route("/")
  .get(
    pagination({ defaultLimit: 30, maxLimit: 200 }),
    categoryController.getAll
  );

/**
 * Route for creating a new category.
 * @name /
 * @function
 * @memberof module:routers/categoryRouter
 * @param {function} middleware - Middleware function for JWT authentication and authorization.
 * @param {function} middleware - Middleware function for request body validation using the trainingValidator.
 * @param {function} controller - Controller function for creating a new category.
 */
categoryRouter.route("/").post(
  // authJwt(["Admin"]),
  bodyValidation(trainingValidator),
  categoryController.create
);

/**
 * Route for getting a category by its ID.
 * @name /:id
 * @function
 * @memberof module:routers/categoryRouter
 * @param {function} controller - Controller function for getting a category by its ID.
 */
categoryRouter.route("/:id").get(categoryController.getById);

/**
 * Route for updating a category by its ID.
 * @name /:id
 * @function
 * @memberof module:routers/categoryRouter
 * @param {function} middleware - Middleware function for JWT authentication and authorization.
 * @param {function} middleware - Middleware function for request body validation using the trainingValidator.
 * @param {function} controller - Controller function for updating a category by its ID.
 */
categoryRouter
  .route("/:id")
  .patch(
    authJwt(["Admin"]),
    bodyValidation(trainingValidator),
    categoryController.update
  );

/**
 * Route for deleting a category by its ID.
 * @name /:id
 * @function
 * @memberof module:routers/categoryRouter
 * @param {function} middleware - Middleware function for JWT authentication and authorization.
 * @param {function} controller - Controller function for deleting a category by its ID.
 */
categoryRouter
  .route("/:id")
  .delete(/*authJwt(["Admin"]),*/ categoryController.delete);

/**
 * Route for posting a category cover.
 * @name /:id/cover
 * @function
 * @memberof module:routers/categoryRouter
 * @param {function} middleware - Middleware function for JWT authentication and authorization.
 * @param {function} middleware - Middleware function for uploading a cover file.
 * @param {function} controller - Controller function for posting or updating a category cover.
 */
categoryRouter.route("/:id/cover").post(
  // authJwt(["Admin"]),
  upload.single("cover"),
  // bodyValidation(updateCategoryValidator),
  categoryController.postCover
);

/**
 * Route for updating a category cover.
 * @name /:id/cover
 * @function
 * @memberof module:routers/categoryRouter
 * @param {function} middleware - Middleware function for JWT authentication and authorization.
 * @param {function} middleware - Middleware function for uploading a cover file.
 * @param {function} controller - Controller function for posting or updating a category cover.
 */
categoryRouter.route("/:id/cover").put(
  // authJwt(["Admin"]),
  upload.single("cover"),
  // bodyValidation(updateCategoryValidator),
  categoryController.updateCover
);

/**
 * Route for deleting a category by its ID.
 * @name /:id/cover
 * @function
 * @memberof module:routers/categoryRouter
 * @param {function} middleware - Middleware function for JWT authentication and authorization.
 * @param {function} controller - Controller function for deleting a category by its ID.
 */
categoryRouter
  .route("/:id/cover")
  .delete(/*authJwt(["Admin"]), */ categoryController.delete);

module.exports = categoryRouter;
