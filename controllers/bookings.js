const Booking = require("../models/Booking");
const Rooms = require("../models/Rooms");

const findBooking = (req, res) => {
  Booking.find({ user: req.params.user }, function (err, orders) {
    if (err) throw err;

    res.json(orders);
  });
};

const newBooking = (req, res) => {
  const newBooking = new Booking({
    user: req.params.user,
    rooms: req.body.rooms,
    date: new Date(),
  });

  newBooking
    .save()
    .then((booking) => {
      req.body.rooms.forEach((element) => {
        Rooms.updateOne(
          { _id: element },
          {
            $set: {
              available: false,
            },
          },
          function (err, room) {
            if (err) throw err;
            console.log("Success");
          }
        );
      });
      res.json(booking);
    })
    .catch((err) => console.log(err));
};

module.exports.findBooking = findBooking;
module.exports.newBooking = newBooking;
