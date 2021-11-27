const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
    },
  ],
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("booking", BookingSchema);
