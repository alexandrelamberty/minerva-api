const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const authorRouter = require("./author.router");
const bookRouter = require("./book.router");
const genreRouter = require("./genre.router");
const publisherRouter = require("./publisher.router");
const orderRouter = require("./order.router");
const homeRouter = require("./home.router");

const router = require("express").Router();
router.use("/", homeRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/books", bookRouter);
router.use("/authors", authorRouter);
router.use("/genres", genreRouter);
router.use("/publishers", publisherRouter);

module.exports = router;
