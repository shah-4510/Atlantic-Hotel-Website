const express = require("express");

const roomsController = require("../controllers/rooms");
const upload = require("../multer").upload

const Router = express.Router();

Router.get("/", roomsController.getAllRooms);   // returns all rooms
Router.post("/add-room", upload.single("image"), roomsController.addNewRoom); // add a new room    
Router.post("/:id/edit-rooms", upload.single("image"), roomsController.editRoom);   // edits an existing room
Router.get("/:id/delete-rooms", roomsController.deleteRoom);    // soft deletes a particular room

// Router.get("/", roomsController.checkout);
// Router.get("/", roomsController.newBooking);
// Router.get("/", roomsController.viewBooking);
// Router.get("/", roomsController.addCheckout);
// Router.get("/", roomsController.removeCheckout);

module.exports = Router;
