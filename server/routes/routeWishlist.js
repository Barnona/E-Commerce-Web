const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} = require("../controller/wishlist-controller.js");

// Add
router.post("/wishlist/add", addToWishlist);

// Get
router.get("/wishlist/:userId", getWishlist);

// Remove
router.delete("/wishlist/remove/:userId/:productId", removeFromWishlist);

module.exports = router;
