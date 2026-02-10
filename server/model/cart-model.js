const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,      // keep string for now (easy testing)
    required: true
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true
  },

  qty: {
    type: Number,
    default: 1
  }
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
