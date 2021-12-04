const express = require("express");

const roomsController = require("../controllers/rooms");
const checkoutController = require('../controllers/checkout')
const upload = require("../multer").upload

const Router = express.Router();

Router.get("/", roomsController.getAllRooms);   // returns all rooms
Router.post("/add-room", upload.single("image"), roomsController.addNewRoom); // add a new room    
Router.post("/:id/edit-rooms", upload.single("image"), roomsController.editRoom);   // edits an existing room
Router.get("/:id/delete-rooms", roomsController.deleteRoom);    // soft deletes a particular room

Router.post("/add-to-cart/:id", checkoutController.addCheckout);   // Add item to Cart
Router.post("/remove-from-cart/:id", checkoutController.removeCheckout);  // Remove Item from Cart
Router.post("/cart", checkoutController.checkout);  // To get all items in cart

// Router.get("/", roomsController.newBooking);
// Router.get("/", roomsController.viewBooking);

module.exports = Router;
