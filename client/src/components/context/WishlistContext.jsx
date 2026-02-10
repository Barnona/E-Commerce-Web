import { createContext, useContext, useEffect, useState } from "react";
import {
  addToWishlist as addToWishlistAPI,
  getWishlist as getWishlistAPI,
  removeFromWishlist as removeFromWishlistAPI
} from "../../service/api2";
import { getUserId, isLoggedIn } from "../utils/auth";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = async () => {
    const userId = getUserId();
    if (!userId) {
      setWishlist([]);
      return;
    }

    const data = await getWishlistAPI(userId);
    setWishlist(data || []);
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener("auth-change", loadWishlist);
    return () => window.removeEventListener("auth-change", loadWishlist);
  }, []);

  const addToWishlist = async (product) => {
    if (!isLoggedIn()) {
      alert("Please login to add items to wishlist");
      return;
    }

    await addToWishlistAPI({
      userId: getUserId(),   // ✅ FIXED
      productId: product._id
    });

    loadWishlist();
  };

  const removeFromWishlist = async (productId) => {
    await removeFromWishlistAPI(getUserId(), productId);
    loadWishlist();
  };

  const isInWishlist = (productId) => {
    return wishlist.some(
      item => item.productId === productId || item._id === productId
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
