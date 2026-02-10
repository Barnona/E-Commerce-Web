const express = require("express");
const {
  addToCart,
  getCartItems,
  removeFromCart
} = require("../controller/cart-controller.js");

const router = express.Router();

router.post("/cart/add", addToCart);
router.get("/cart/:userId", getCartItems);
router.delete("/cart/remove/:userId/:productId", removeFromCart);

module.exports = router;
