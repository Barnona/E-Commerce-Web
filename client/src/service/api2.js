import axios from "axios";

const URL = (import.meta.env.VITE_API_URL || 'https://e-commerce-web-d7rw.onrender.com').replace(/\/$/, '');

// PRODUCTS viewing from database
export const viewProducts = async () => {
  try {
    const res = await axios.get(`${URL}/products/all`);
    return res.data;
  } catch (error) {
    console.error('Product fetch error:', error.message);
    return [];
  }
};

// ADD TO CART
export const addToCart = async (data) => {
  try {
    const token = localStorage.getItem("userToken");
    return await axios.post(`${URL}/cart/add`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Add to cart error", error.response?.data || error.message);
  }
};

// GET CART
export const getCart = async (userId) => {
  try {
    const res = await axios.get(`${URL}/cart/${encodeURIComponent(userId)}`);
    return res.data;
  } catch (error) {
    console.error("Get cart error", error.message);
    return [];
  }
};

// REMOVE FROM CART
export const removeFromCart = async (userId, productId) => {
  try {
    return await axios.delete(`${URL}/cart/remove/${encodeURIComponent(userId)}/${encodeURIComponent(productId)}`);
  } catch (error) {
    console.error("Remove cart error", error.message);
  }
};

// ADD TO WISHLIST
export const addToWishlist = async (data) => {
  try {
    const token = localStorage.getItem("userToken");
    return await axios.post(`${URL}/wishlist/add`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Wishlist add error", error.response?.data || error.message);
  }
};

export const getWishlist = async (userId) => {
  try {
    const res = await axios.get(`${URL}/wishlist/${encodeURIComponent(userId)}`);
    return res.data;
  } catch (error) {
    console.error("Wishlist get error", error.message);
    return [];
  }
};

export const removeFromWishlist = async (userId, productId) => {
  try {
    return await axios.delete(`${URL}/wishlist/remove/${encodeURIComponent(userId)}/${encodeURIComponent(productId)}`);
  } catch (error) {
    console.error("Wishlist remove error", error.message);
  }
};
