const express = require("express");
const Router = express.Router();
const bookingsController = require("../controllers/bookings");
Router.get("/", bookingsController.findBooking);

Router.post("/", bookingsController.newBooking);

module.exports = Router;
