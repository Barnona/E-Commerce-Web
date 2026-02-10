import axios from 'axios';

// --- CONFIGURATION ---
const URL = 'http://localhost:5000'; //backend url

// ==============================
//      API FUNCTIONS
// ==============================

/* --- AUTHENTICATION --- */
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${URL}/admin/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.log("Error while creating API", error);
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${URL}/admin/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Request failed');
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${URL}/admin/auth/forgot-password`, { email });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Request failed');
    }
};

export const resetPassword = async (token, password) => {
    try {
        return await axios.put(`${URL}/admin/auth/forgot-password/reset/${token}`, { password });
    } catch (error) {
        console.log('Error calling resetPassword API', error);
        throw error.response ? error.response.data : { message: "Network Error" };
    }
}

/* --- DASHBOARD --- */
export const getDashboardData = async () => {
    try {
        const response = await axios.get(`${URL}/dashboard`); 
        return response.data;
    } catch (error) {
        console.warn("Dashboard API failed, using fallback data:", error);
        // Return Mock Data if API fails
        return null;
    }
};

/* --- PRODUCTS --- */
export const addProduct = async (formData) => {
    try {
        const response = await axios.post(`${URL}/products/add`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to add product');
    }
};

export const uploadBulkProducts = async (file, onProgress) => {
    const formData = new FormData();
    formData.append('csvFile', file);

    try {
        const response = await axios.post(`${URL}/products/bulk-upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) onProgress(percentCompleted);
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Bulk upload failed');
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get(`${URL}/products`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to fetch products');
    }
};

export const deleteProduct = async (id) => {
    try {
        return await axios.delete(`${URL}/product/${id}`);
    } catch (error) {
        console.log('Error while calling deleteProduct API', error);
        return error.response;
    }
}

export const updateProduct = async (id, data) => {
    try {
        return await axios.put(`${URL}/product/${id}`, data);
    } catch (error) {
        console.log('Error while calling updateProduct API', error);
        return error.response;
    }
}

/* --- ORDERS --- */
export const getAllOrders = async () => {
    try {
        return await axios.get(`${URL}/all-orders`);
    } catch (error) {
        console.log("Server Error Details:", error.response?.data?.message); 
        throw error;
    }
}

export const updateOrderStatus = async (id, data) => {
    try {
        return await axios.put(`${URL}/all-orders/update/${id}`, data);
    } catch (error) {
        console.log('Error while calling updateOrderStatus API', error);
    }
}

export const deleteOrder = async (id) => {
    try {
        return await axios.delete(`${URL}/all-orders/delete/${id}`);
    } catch (error) {
        console.log('Error while deleting order', error);
        return error.response;
    }
}

/* --- SETTINGS / PROFILE --- */
export const getUser = async (id) => {
    try {
        return await axios.get(`${URL}/admin/${id}`);
    } catch (error) {
        console.log('Error while calling getUser API', error);
        return error.response;
    }
};

export const updateUserProfile = async (id, formData) => {
    try {
        return await axios.put(`${URL}/admin/update-profile/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.log('Error updating profile', error);
        throw error.response ? error.response.data : { message: "Network Error" };
    }
};

export const changePassword = async (id, Data) => {
    try {
        const response = await axios.put(`${URL}/admin/change-password/${id}`, Data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Failed to change password');
    }
};

/* --- USER MANAGEMENT --- */

export const getAllUsers = async () => {
    try {
        // Returns the array directly
        const response = await axios.get(`${URL}/users`);
        return response.data; 
    } catch (error) {
        console.log('Error while fetching users', error);
        return [];
    }
};

export const deleteUser = async (id) => {
    try {
        return await axios.delete(`${URL}/user/${id}`);
    } catch (error) {
        console.log('Error while deleting user', error);
        return error.response;
    }
};


//category data
export const getCategoryData = async (category) =>{
    try {
        const params = { category: category };
        const response = await axios.get(`${URL}/products`, { params });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${category}:`, error);
        return null;
    }

}
