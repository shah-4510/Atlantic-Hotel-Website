const express = require("express");
const usersController = require("../controllers/users");

const Router = express.Router();

Router.post("/register", usersController.userRegister); // To register a new User
Router.post("/login", usersController.userLogin);   // To login a user

module.exports = Router;
