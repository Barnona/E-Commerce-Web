import axios from 'axios';

const URL = 'https://e-commerce-web-d7rw.onrender.com/';

export const authenticateSignup = async (data) => {
    try {
        return await axios.post(`${URL}/auth/signup`, data);
    } catch (error) {
        console.log('Error while calling signup API: ', error);
        return error.response; // Return response to handle 401 errors (like duplicate user)
    }
}

export const authenticateLogin = async (data) => {
    try {
        return await axios.post(`${URL}/auth/login`, data);
    } catch (error) {
        console.log('Error while calling login API: ', error);
        return error.response;
    }
}

export const forgotPassword = async (email) => {
    try {
        return await axios.post(`${URL}/auth/forgot-password`, { email });
    } catch (error) {
        return error.response;
    }
}

export const resetPassword = async (token, password) => {
    try {
        return await axios.post(`${URL}/auth/reset-password/${token}`, { password });
    } catch (error) {
        return error.response;
    }
}

export const getUserDetails = async (id) => {
    try {
        const token = localStorage.getItem('userToken');
        return await axios.get(`${URL}/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Attach token to request
            }
        });
    } catch (error) {
        console.log("Error fetching user data", error);
        return error.response;
    }
}

export const updateUser = async (formData) => {
    try {
        return await axios.put(`${URL}/update-profile`, formData, {
            
        });
    } catch (error) {
        console.log("Error updating profile", error);
        return error.response;
    }
}

export const changePassword = async (data) => {
    try {
        return await axios.post(`${URL}/change-password`, data);
    } catch (error) {
        return error.response;
    }
}

export const saveAddress = async (addressData) => {
    try {
        return await axios.post(`${URL}/save-address`, addressData);
    } catch (error) {
        return error.response;
    }
}

export const removeAddress = async (data) => {
    try {
        return await axios.post(`${URL}/remove-address`, data);
    } catch (error) {
        return error.response;
    }
}

export const getProductSearch = async (text) => {
    try {
        return await axios.get(`${URL}/products/search/${text}`);
    } catch (error) {
        console.log('Error searching products', error);
        return error.response;
    }
}

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${URL}/products`,);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to fetch products');
    }
};

export const getProductsByCategory = async (subCategory) => {
    try {
        const response = await axios.get(`${URL}/products/sub/${subCategory}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${subCategory}:`, error);
        return []; 
    }
};

export const getFilterOptions = async (subCategory) => {
  try {
    const { data } = await axios.get(
      `${URL}/products/filters?subCategory=${subCategory}`
    );
    return data;
  } catch (err) {
    console.error("Filter API error:", err);
    return {};
  }
};

// --- SEARCH API ---
export const searchProducts = async (query) => {
    try {
        const response = await axios.get(`${URL}/products/search?q=${query}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createOrder = async (orderData) => {
    try {
        return await axios.post(`${URL}/order/add`, orderData);
    } catch (error) {
        console.log('Error while creating order', error);
        return error.response;
    }
}

export const getOrders = async (userId) => {
    try {
        return await axios.get(`${URL}/orders/${userId}`);
    } catch (error) {
        console.log('Error while getting orders', error);
        return error.response;
    }
}

export const processPayment = async (amount) => {
    try {
        return await axios.post(`${URL}/payment/process`, { totalAmount: amount });
    } catch (error) {
        return error.response;
    }
}

export const verifyPayment = async (data) => {
    try {
        return await axios.post(`${URL}/payment/verify`, data);
    } catch (error) {
        return error.response;
    }
}
