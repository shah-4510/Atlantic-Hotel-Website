const mongoose = require("mongoose");
const paginateResults = require("../helpers/pagination");
const validateProduct = require("../validation/addproduct");
const Rooms = require("../models/Rooms");
const Checkout = require("../models/Checkout");
const Booking = require("../models/Booking");

const getAllRooms = (req, res) => {
  var category = req.query.category;
  var search = req.query.search;
  var query = {};
  query["$and"] = [];
  query["$and"].push({
    deleted: false,
  });

  if (category && category != "0") {
    query["$and"].push({
      category_id: parseInt(category),
    });
  }

  if (search && search.trim() != "") {
    query["$and"].push({
      $or: [
        {
          name: new RegExp(search, "i"),
        },
        { description: RegExp(search, "i") },
      ],
    });
  }

  Rooms.find(query, function (err, rooms) {
    if (err) throw err;
    paginated = paginateResults(rooms, req.query.page || 1);
    pagination = {};
    if (paginated.next) {
      pagination.next = paginated.next.page;
    }
    if (paginated.previous) {
      pagination.previous = paginated.previous.page;
    }
    if (req.user) {
      Checkout.findOne({ user: req.user._id }, function (err, checkout) {
        if (checkout) {
          res.render("index", {
            rooms: paginated.results,
            checkout: checkout.rooms,
            pagination: pagination,
            query: search,
            category: category,
          });
        } else {
          res.render("index", {
            rooms: paginated.results,
            pagination: pagination,
            query: search,
            category: category,
          });
        }
      });
    } else {
      res.render("index", {
        rooms: paginated.results,
        pagination: pagination,
        query: search,
        category: category,
      });
    }
  });
};

const addNewRoom = (req, res) => {
  const { errors, isValid } = validateProduct(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newRoom = new Rooms({
    name: req.body.name,
    description: req.body.description,
    category_id: req.body.category,
    price: req.body.price,
    image: req.file.path,
  });
  newRoom
    .save()
    .then(function (rooms) {
      res.redirect("/rooms");
    })
    .catch(function (err) {
      throw err;
    });
};

const checkout = (req, res) => {
  if (req.user) {
    Checkout.findOne({ user: req.user._id })
      .populate("rooms")
      .exec(function (err, checkout) {
        if (checkout) {
          res.render("checkout", { checkout: checkout.rooms });
        } else {
          res.render("checkout");
        }
      });
  } else {
    res.redirect("/users/login");
  }
};

const newBooking = (req, res) => {
  if (req.user) {
    Checkout.findOne({ user: req.user._id }, function (err, checkout) {
      let newBooking = new Booking({
        user: req.user._id,
      });
      checkout.rooms.forEach((element) => {
        newBooking.rooms.push(mongoose.Types.ObjectId(element));
      });

      newBooking.save().then(function (err, order) {
        Checkout.deleteOne({ user: req.user._id }, function (err, response) {
          checkout.rooms.forEach((element) => {
            Rooms.updateOne(
              { _id: element },
              { $set: { available: false } },
              function (err, room) {
                if (err) throw err;
              }
            );
          });
          req.flash("success_msg", "Booking successful!");
          res.redirect("back");
        });
      });
    });
  } else {
    res.redirect("/users/login");
  }
};

const viewBoooking = (req, res) => {
  if (req.user) {
    Checkout.find({ user: req.user._id })
      .populate("rooms")
      .exec(function (err, bookings) {
        Checkout.findOne({ user: req.user._id }, function (err, cart) {
          if (checkout) {
            res.render("bookings", {
              bookings: bookings,
              checkout: checkout.rooms,
            });
          } else {
            res.render("bookings", { bookings: bookings });
          }
        });
      });
  } else {
    res.redirect("/users/login");
  }
};

const editRoom = (req, res) => {
  const { errors, isValid } = validateProduct(req.body);
  if (!isValid) {
    return res.render("addproduct", {
      errors: errors,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      category: req.body.category,
    });
  }

  var query = { _id: req.params.id };
  var newvalues = {
    $set: {
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category,
      price: req.body.price,
      image: req.file.path,
    },
  };
  Rooms.updateOne(query, newvalues, function (err, rooms) {
    if (err) throw err;
    req.flash("success_msg", "Room updated!");
    res.redirect("/rooms");
  });
};

const deleteRoom = (req, res) => {
  Rooms.updateOne(
    { _id: req.params.id },
    { $set: { deleted: true } },
    function (err, room) {
      req.flash("success_msg", "Room deleted!");
      res.redirect("/rooms");
    }
  );
};

const addCheckout = (req, res, next) => {
  if (req.user) {
    Checkout.updateOne(
      { user: req.user._id },
      {
        $push: {
          rooms: req.params.id,
        },
      },
      { upsert: true },
      function (err, checkout) {
        req.flash("success_msg", "Room added!");
        res.redirect("/rooms");
      }
    );
  } else {
    res.redirect("/users/login");
  }
};

const removeCheckout = (req, res, next) => {
  if (req.user) {
    Checkout.updateOne(
      { user: req.user._id },
      { $pull: { rooms: req.params.id } },
      function (err, checkout) {
        req.flash("success_msg", "Room removed!");
        res.redirect("/rooms/checkout");
      }
    );
  } else {
    res.redirect("/users/login");
  }
};

module.exports.getAllRooms = getAllRooms;
module.exports.addNewRoom = addNewRoom;
module.exports.checkout = checkout;
module.exports.newBooking = newBooking;
module.exports.viewBoooking = viewBoooking;
module.exports.editRoom = editRoom;
module.exports.deleteRoom = deleteRoom;
module.exports.addCheckout = addCheckout;
module.exports.removeCheckout = removeCheckout;
