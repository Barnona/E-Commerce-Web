import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQty, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.finalPrice * item.qty, 0);
  const discount = totalPrice > 1000 ? 200 : 0
  const deliveryCharge = totalPrice > 1000 ? 0 : 40;
  const finalAmount = totalPrice - discount + deliveryCharge;

  const handlePlaceOrder = () => {
    navigate("/checkout", {
      state: {
        items: cartItems,
        totalAmount: finalAmount,
        priceDetails: { totalPrice, discount, deliveryCharge } 
      }
    });
  };

  return (
    <div className="mx-auto p-6 flex flex-col lg:flex-row gap-6 bg-[#f0f0f0] min-h-screen">
      
      <div className="flex-1 bg-white p-4 shadow rounded h-fit">
        <h2 className="text-lg font-semibold mb-4">My Cart ({cartItems.length})</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
             <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
             <button onClick={() => navigate('/')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">Shop Now</button>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.productId} className="flex gap-4 border-b py-4 last:border-b-0">
              <Link to={`/product/${item.productId}`}>
              <img src={item.image} alt={item.name} className="w-24 h-24 object-contain p-2" />
              </Link>
              <div className="flex-1">
                <Link to={`/product/${item.productId}`}>
                <h3 className="font-medium text-lg">{item.name}</h3>
                </Link>
                <p className="text-gray-900 font-bold text-lg mt-1">₹{item.finalPrice}</p>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.productId, item.qty - 1)} className="w-8 h-8 rounded border">-</button>
                      <span className="w-8 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.productId, item.qty + 1)} className="w-8 h-8 rounded border">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} className="text-gray-500 hover:text-red-600 font-medium text-sm">REMOVE</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="w-full lg:w-[360px]">
        <div className="bg-white p-4 shadow rounded sticky top-24">
          <h2 className="text-gray-500 font-bold border-b pb-3 mb-4">PRICE DETAILS</h2>
          <div className="flex justify-between mb-3"><span>Price ({cartItems.length} items)</span><span>₹{totalPrice}</span></div>
          <div className="flex justify-between mb-3 text-green-600"><span>Discount</span><span>-₹{discount}</span></div>
          <div className="flex justify-between mb-3"><span>Delivery Charges</span><span className="text-green-600">{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span></div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg mb-5"><span>Total Amount</span><span>₹{cartItems.length === 0 ? 0 : finalAmount}</span></div>

          <button
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0}
            className={`w-full py-3 rounded font-bold text-white shadow-md transition-colors ${
              cartItems.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;