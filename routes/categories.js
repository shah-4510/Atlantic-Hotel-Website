const express = require("express");
const Router = express.Router();
const categoriesController = require("../controllers/categories");

Router.get("/", categoriesController.sendCategory);
Router.post("/", categoriesController.newCategory);

module.exports = Router;
