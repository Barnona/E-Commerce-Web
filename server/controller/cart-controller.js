const mongoose = require("mongoose");

const Cart = require("../model/cart-model.js");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { userId, productId, qty } = req.body;

    // check if item already exists
    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.qty += qty;
      await existingItem.save();
      return res.status(200).json("Quantity Updated");
    }

    const cartItem = new Cart({
      userId,
      productId,
      qty
    });

    await cartItem.save();
    res.status(201).json("Added To Cart");

  } catch (error) {
    console.log("Error while adding to cart", error);
    res.status(500).json("Add to cart failed");
  }
};

// GET CART ITEMS
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.find({ userId })
      .populate("productId");

    res.status(200).json(cartItems);

  } catch (error) {
    console.log("Error while getting cart", error);
    res.status(500).json("Fetch cart failed");
  }
};

// REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const deletedItem = await Cart.findOneAndDelete({
      userId,
      productId: new mongoose.Types.ObjectId(productId)
    });

    if (!deletedItem) {
      return res.status(404).json("Item not found in cart");
    }

    res.status(200).json("Item Removed");

  } catch (error) {
    console.log("Error while removing cart item", error);
    res.status(500).json("Remove failed");
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart
};
