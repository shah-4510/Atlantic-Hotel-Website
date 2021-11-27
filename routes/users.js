const express = require("express");

const Router = express.Router();

const usersController = require("../controllers/users");

Router.post("/register", usersController.userRegister);
Router.post("/login", usersController.userLogin);

module.exports = Router;
