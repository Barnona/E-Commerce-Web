const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,   // For now, keep it string like your cart
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const Wishlist = mongoose.model("wishlist", wishlistSchema);

module.exports = Wishlist;
