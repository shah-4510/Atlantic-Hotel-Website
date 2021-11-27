const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category_id: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("rooms", RoomsSchema);
