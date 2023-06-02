const homeController = require("../controllers/home.controller");

const homeRouter = require("express").Router();

homeRouter.route("/").get(homeController.home);

module.exports = homeRouter;
