const express = require("express");
const bookingsController = require("../controllers/bookings");

const Router = express.Router();

Router.get("/", bookingsController.findBooking);    // To get bookings 
Router.post("/", bookingsController.newBooking);    // To add a new booking

module.exports = Router;
