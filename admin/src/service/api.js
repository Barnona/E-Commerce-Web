import axios from 'axios';

const URL = (import.meta.env.VITE_API_URL || 'https://e-commerce-web-d7rw.onrender.com').replace(/\/$/, '');

const getError = (error, fallback) => error.response?.data || new Error(error.message || fallback);

export const loginUser = async (credentials) => {
    try { return (await axios.post(`${URL}/admin/auth/login`, credentials)).data; }
    catch (error) { throw getError(error, 'Admin login failed'); }
};

export const registerUser = async (userData) => {
    try { return (await axios.post(`${URL}/admin/auth/register`, userData)).data; }
    catch (error) { throw getError(error, 'Admin registration failed'); }
};

export const forgotPassword = async (email) => {
    try { return (await axios.post(`${URL}/admin/auth/forgot-password`, { email })).data; }
    catch (error) { throw getError(error, 'Password reset request failed'); }
};

export const resetPassword = async (token, password) => {
    try { return (await axios.put(`${URL}/admin/auth/forgot-password/reset/${token}`, { password })).data; }
    catch (error) { throw getError(error, 'Password reset failed'); }
};

export const getDashboardData = async () => {
    try { return (await axios.get(`${URL}/dashboard`)).data; }
    catch (error) { throw getError(error, 'Failed to fetch dashboard data'); }
};

export const addProduct = async (formData) => {
    try { return (await axios.post(`${URL}/products/add`, formData)).data; }
    catch (error) { throw getError(error, 'Failed to add product'); }
};

export const uploadBulkProducts = async (file, onProgress) => {
    const formData = new FormData();
    formData.append('csvFile', file);
    try {
        const response = await axios.post(`${URL}/products/bulk-upload`, formData, {
            onUploadProgress: ({ loaded, total }) => {
                if (total) onProgress?.(Math.round((loaded * 100) / total));
            },
        });
        return response.data;
    } catch (error) { throw getError(error, 'Bulk upload failed'); }
};

export const getProducts = async () => {
    try { return (await axios.get(`${URL}/products`)).data; }
    catch (error) { throw getError(error, 'Failed to fetch products'); }
};

export const deleteProduct = async (id) => {
    try { return await axios.delete(`${URL}/product/${id}`); }
    catch (error) { throw getError(error, 'Failed to delete product'); }
};

export const updateProduct = async (id, data) => {
    try { return await axios.put(`${URL}/product/${id}`, data); }
    catch (error) { throw getError(error, 'Failed to update product'); }
};

export const getAllOrders = async () => {
    try { return await axios.get(`${URL}/all-orders`); }
    catch (error) { throw getError(error, 'Failed to fetch orders'); }
};

export const updateOrderStatus = async (id, data) => {
    try { return await axios.put(`${URL}/all-orders/update/${id}`, data); }
    catch (error) { throw getError(error, 'Failed to update order status'); }
};

export const deleteOrder = async (id) => {
    try { return await axios.delete(`${URL}/all-orders/delete/${id}`); }
    catch (error) { throw getError(error, 'Failed to delete order'); }
};

export const getUser = async (id) => {
    try { return await axios.get(`${URL}/admin/${id}`); }
    catch (error) { throw getError(error, 'Failed to fetch admin profile'); }
};

export const updateUserProfile = async (id, formData) => {
    try { return await axios.put(`${URL}/admin/update-profile/${id}`, formData); }
    catch (error) { throw getError(error, 'Failed to update profile'); }
};

export const changePassword = async (id, data) => {
    try { return (await axios.put(`${URL}/admin/change-password/${id}`, data)).data; }
    catch (error) { throw getError(error, 'Failed to change password'); }
};

export const getAllUsers = async () => {
    try { return (await axios.get(`${URL}/users`)).data; }
    catch (error) { throw getError(error, 'Failed to fetch users'); }
};

export const deleteUser = async (id) => {
    try { return await axios.delete(`${URL}/user/${id}`); }
    catch (error) { throw getError(error, 'Failed to delete user'); }
};

export const getCategoryData = async (category) => {
    try { return (await axios.get(`${URL}/products`, { params: { category } })).data; }
    catch (error) { throw getError(error, `Failed to fetch ${category}`); }
};
