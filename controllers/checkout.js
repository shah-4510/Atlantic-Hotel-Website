const mongoose = require("mongoose");
const Checkout = require("../models/Checkout");

const checkout = (req, res) => {
    Checkout.findOne({ user: req.body.user })
      .populate("rooms")
        .exec(function (err, checkout) {
          if (err) {
            throw err
          } else {
            res.json({ checkout: checkout ? checkout.rooms : null });
          }
    });
};
  
const addCheckout = (req, res, next) => {
    Checkout.updateOne(
        { user: req.body.user },
        {
        $push: {
            rooms: req.params.id,
        },
        },
        { upsert: true },
        function (err, checkout) {
        if (err) throw err
        res.json({ message: "Success", status: "ok" });
    }
);
};
  
const removeCheckout = (req, res, next) => {
    Checkout.updateOne(
        { user: req.body.user },
        { $pull: { rooms: req.params.id } },
        function (err, checkout) {
            if(err) throw err
            res.json({ message: "Success", status: "ok" });
        }
        );
};

  
module.exports.addCheckout = addCheckout;
module.exports.removeCheckout = removeCheckout;
module.exports.checkout = checkout;