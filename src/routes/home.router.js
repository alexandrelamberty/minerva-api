const homeController = require("../controllers/homeController");

const homeRouter = require("express").Router();

homeRouter.route("/").get(homeController.home);

module.exports = homeRouter;
