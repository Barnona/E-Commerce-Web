import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item._id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">
            Your wishlist is empty
          </p>
          <Link to="/">
            <button className="px-6 py-2 bg-blue-600 text-white rounded">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => {
            const discountedPrice = item.price - item.discount;
            const taxAmount = Math.round(
              (discountedPrice * item.taxClass) / 100
            );
            const finalPrice = discountedPrice + taxAmount;

            return (
              <div
                key={item._id}
                className="flex items-center justify-between border rounded-lg p-4 bg-white"
              >
                <div className="flex items-center gap-4">
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>

                  <div>
                    <Link to={`/product/${item._id}`}>
                      <h2 className="font-medium">{item.name}</h2>
                    </Link>

                    <p className="text-gray-400 line-through">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    <p className="text-green-600 font-semibold">
                      ₹{finalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => moveToCart(item)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Move to Cart
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
