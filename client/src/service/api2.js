import axios from "axios";

const URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// PRODUCTS viewing from database
export const viewProducts = async () => {
  try {
    const res = await axios.get(`${URL}/products/all`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// ADD TO CART
export const addToCart = async (data) => {
  try {
    const token = localStorage.getItem("userToken");
    return await axios.post(`${URL}/cart/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Add to cart error", error.response?.data || error);
  }
};

// GET CART
export const getCart = async (userId) => {
  try {
    const res = await axios.get(`${URL}/cart/${userId}`);
    return res.data;
  } catch (error) {
    console.log("Get cart error", error);
    return [];
  }
};

// REMOVE FROM CART
export const removeFromCart = async (userId, productId) => {
  try {
    return await axios.delete(`${URL}/cart/remove/${userId}/${productId}`);
  } catch (error) {
    console.log("Remove cart error", error);
  }
};

// WISHLIST
// ADD TO WISHLIST
export const addToWishlist = async (data) => {
  try {
    const token = localStorage.getItem("userToken");
    return await axios.post(`${URL}/wishlist/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Wishlist add error", error.response?.data || error);
  }
};


export const getWishlist = async (userId) => {
  try {
    const res = await axios.get(`${URL}/wishlist/${userId}`);
    return res.data;
  } catch (error) {
    console.log("Wishlist get error", error);
    return [];
  }
};

export const removeFromWishlist = async (userId, productId) => {
  try {
    return await axios.delete(`${URL}/wishlist/remove/${userId}/${productId}`);
  } catch (error) {
    console.log("Wishlist remove error", error);
  }
};
