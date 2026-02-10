import { createContext, useContext, useEffect, useState } from "react";
import {
  addToCart as addToCartAPI,
  getCart,
  removeFromCart as removeFromCartAPI
} from "../../service/api2";
import { getUserId, isLoggedIn } from "../utils/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    const userId = getUserId();
    if (!userId) {
      setCartItems([]);
      return;
    }

    try {
      const data = await getCart(userId);
      // Check if data is array to avoid map errors
      const safeData = Array.isArray(data) ? data : []; 

      const formatted = safeData.map(item => {
        const discountedPrice = item.productId.price - item.productId.discount;
        const taxAmount = Math.round(
          (discountedPrice * item.productId.taxClass) / 100
        );
        const finalPrice = discountedPrice + taxAmount;

        return {
          productId: item.productId._id,
          name: item.productId.name,
          image: item.productId.images[0],
          finalPrice,
          qty: item.qty
        };
      });

      setCartItems(formatted);
    } catch (error) {
      console.error("Failed to load cart", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("auth-change", loadCart);
    return () => window.removeEventListener("auth-change", loadCart);
  }, []);

  const addToCart = async (product) => {
    if (!isLoggedIn()) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      await addToCartAPI({
        userId: getUserId(),
        productId: product._id,
        qty: 1
      });

      alert("✅ Product added to cart");
      loadCart();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add product to cart");
    }
  };

  const updateQty = async (productId, newQty) => {
    const userId = getUserId();
    if (!userId) return;

    const item = cartItems.find(i => i.productId === productId);
    if (!item) return;

    if (newQty <= 0) {
      await removeFromCartAPI(userId, productId);
      loadCart();
      return;
    }

    const diff = newQty - item.qty;

    await addToCartAPI({
      userId,
      productId,
      qty: diff
    });

    loadCart();
  };

  const removeFromCart = async (productId) => {
    await removeFromCartAPI(getUserId(), productId);
    loadCart();
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQty, 
        emptyCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);