const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const trainingRouter = require("./training.router");
const courseRouter = require("./course.router");
const categoryRouter = require("./training-category.router");
const homeRouter = require("./home.router");
const studentRouter = require("./student.router");
const teacherRouter = require("./teacher.router");
const enrollmentRouter = require("./enrollment.router");
const openaiRouter = require("./openai.router");

/**
 * Express router to mount our routes.
 * @type {object}
 * @const
 */
const router = require("express").Router();
router.use("/", homeRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/students", studentRouter);
router.use("/enrollments", enrollmentRouter);
router.use("/teachers", teacherRouter);
router.use("/categories", categoryRouter);
router.use("/trainings", trainingRouter);
router.use("/courses", courseRouter);
router.use("/ai", openaiRouter);

module.exports = router;
