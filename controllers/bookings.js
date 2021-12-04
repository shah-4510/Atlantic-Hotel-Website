const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Rooms = require("../models/Rooms");
const Checkout = require("../models/Checkout");


const findBooking = (req, res) => {
  Booking
    .find({ user: req.params.user })
    .populate("rooms")
    .exec(function(err, rooms){
      if (err) {
        throw err
      } else {
        res.json(rooms);
      }
    })
};

const newBooking = (req, res) => {
  Checkout.findOne({ user: req.body.user }, function (err, checkout) {
    let newBooking = new Booking({
      user: req.body.user,
      rooms: [],
      date: new Date()
    });
    checkout.rooms.forEach((element) => {
      newBooking.rooms.push(mongoose.Types.ObjectId(element));
    });

    newBooking.save().then(function (err, order) {
      Checkout.deleteOne({ user: req.body.user }, function (err, response) {
        checkout.rooms.forEach((element) => {
          Rooms.updateOne(
            { _id: element },
            { $set: { available: false } },
            function (err, room) {
              if (err) throw err;
            }
          );
        });
        res.json({message: 'success', status: 'ok' })
      });
    });
  });
};

module.exports.findBooking = findBooking;
module.exports.newBooking = newBooking;
