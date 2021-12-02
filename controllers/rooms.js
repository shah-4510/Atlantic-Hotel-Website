const mongoose = require("mongoose");

const validateProduct = require("../validation/addproduct");
const Rooms = require("../models/Rooms");

const getAllRooms = (req, res) => {
  Rooms.find({}, function (err, results) {
    if (err) {
      throw err;
    } else {
      const results1 = results.filter((result) => result.deleted === false)
      res.json(results1);
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
    category_id: req.body.category_id,
    price: req.body.price,
    image: req.file.path,
  });
  newRoom
  .save()
  .then(function (rooms) {
    res.json({ message: "Success", status: "ok" });
  })
  .catch(function (err) {
    throw err;
  });
};

const editRoom = (req, res) => {
  const { errors, isValid } = validateProduct(req.body);
  if (!isValid) {
    return res.json({
      errors: errors,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      category: req.body.category_id,
    });
  }

  var query = { _id: req.params.id };
  var newvalues = {
    $set: {
      name: req.body.name,
      description: req.body.description,
      category_id: req.body.category_id,
      price: req.body.price,
      image: req.file.path,
    },
  };
  Rooms.updateOne(query, newvalues, function (err, rooms) {
    if (err) throw err;
    req.flash("success_msg", "Room updated!");
    res.json({ message: "Successful", status: "ok" });
  });
};

const deleteRoom = (req, res) => {
  Rooms.updateOne(
    { _id: req.params.id },
    { $set: { deleted: true } },
    function (err, room) {
      res.json({ message: "Successful", status: "ok" });
    }
  );
};

module.exports.getAllRooms = getAllRooms;
module.exports.addNewRoom = addNewRoom;
module.exports.editRoom = editRoom;
module.exports.deleteRoom = deleteRoom;

