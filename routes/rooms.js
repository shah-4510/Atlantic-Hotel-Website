const express = require("express");
const Router = express.Router();
const multer = require("multer");
//const mongoose = require("mongoose");
const { ensureAuthenticated } = require("../helpers/auth");
const roomsController = require("../controllers/rooms");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + file.originalname
    );
  },
});

const fileFilter = function (req, file, callback) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

Router.get("/", roomsController.getAllRooms);

Router.post(
  "/",
  ensureAuthenticated,
  upload.single("image"),
  roomsController.addNewRoom
);

// Router.get("/", roomsController.checkout);

// Router.get("/", roomsController.newBooking);

// Router.get("/", roomsController.viewBooking);

Router.post(
  "/",
  ensureAuthenticated,
  upload.single("image"),
  roomsController.editRoom
);

Router.get("/", ensureAuthenticated, roomsController.deleteRoom);

// Router.get("/", roomsController.addCheckout);

// Router.get("/", roomsController.removeCheckout);

module.exports = Router;
