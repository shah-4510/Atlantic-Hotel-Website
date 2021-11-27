const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckoutSchema = new Schema({
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
});

module.exports = mongoose.model("checkout", CheckoutSchema);
