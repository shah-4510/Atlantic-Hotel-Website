const express = require("express");
const bookingsController = require("../controllers/bookings");

const Router = express.Router();

Router.get("/:user", bookingsController.findBooking);    // To get all bookings of that particular user 
Router.post("/add-booking", bookingsController.newBooking);    // To add a new booking

module.exports = Router;
