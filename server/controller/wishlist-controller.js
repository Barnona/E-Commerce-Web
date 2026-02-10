const mongoose = require("mongoose");
const Wishlist = require("../model/wishlist-model");

// ADD TO WISHLIST
const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Prevent duplicate
    const exists = await Wishlist.findOne({ userId, productId });
    if (exists) {
      return res.status(200).json("Already in Wishlist");
    }

    const item = new Wishlist({ userId, productId });
    await item.save();

    res.status(201).json("Added to Wishlist");
  } catch (error) {
    console.log("Error adding to wishlist:", error);
    res.status(500).json("Failed to add to wishlist");
  }
};

// GET WISHLIST ITEMS
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const items = await Wishlist.find({ userId })
      .populate("productId");

    // Format like Cart
    const formatted = items.map(item => item.productId);

    res.status(200).json(formatted);
  } catch (error) {
    console.log("Error fetching wishlist:", error);
    res.status(500).json("Failed to fetch wishlist");
  }
};

// REMOVE FROM WISHLIST
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const deleted = await Wishlist.findOneAndDelete({
      userId,
      productId: new mongoose.Types.ObjectId(productId)
    });

    if (!deleted) return res.status(404).json("Item not found");

    res.status(200).json("Removed from Wishlist");
  } catch (error) {
    console.log("Error removing wishlist item:", error);
    res.status(500).json("Failed to remove item");
  }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist };
