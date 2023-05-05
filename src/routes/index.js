const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const trainingRouter = require("./training.router");
const courseRouter = require("./course.router");
const categoryRouter = require("./training-category.router");
const homeRouter = require("./home.router");

const router = require("express").Router();
router.use("/", homeRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/trainings", trainingRouter);
router.use("/courses", courseRouter);

module.exports = router;
