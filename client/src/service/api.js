import axios from 'axios';

const URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

const getErrorResponse = (error) => error.response || { status: 500, data: { message: error.message || 'Request failed' } };

export const authenticateSignup = async (data) => {
    try { return await axios.post(`${URL}/auth/signup`, data); }
    catch (error) { return getErrorResponse(error); }
};

export const authenticateLogin = async (data) => {
    try { return await axios.post(`${URL}/auth/login`, data); }
    catch (error) { return getErrorResponse(error); }
};

export const forgotPassword = async (email) => {
    try { return await axios.post(`${URL}/auth/forgot-password`, { email }); }
    catch (error) { return getErrorResponse(error); }
};

export const resetPassword = async (token, password) => {
    try { return await axios.post(`${URL}/auth/reset-password/${encodeURIComponent(token)}`, { password }); }
    catch (error) { return getErrorResponse(error); }
};

export const getUserDetails = async (id) => {
    try {
        const token = localStorage.getItem('userToken');
        return await axios.get(`${URL}/user/${encodeURIComponent(id)}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined
        });
    } catch (error) { return getErrorResponse(error); }
};

export const updateUser = async (formData) => {
    try { return await axios.put(`${URL}/update-profile`, formData); }
    catch (error) { return getErrorResponse(error); }
};

export const changePassword = async (data) => {
    try { return await axios.post(`${URL}/change-password`, data); }
    catch (error) { return getErrorResponse(error); }
};

export const saveAddress = async (addressData) => {
    try { return await axios.post(`${URL}/save-address`, addressData); }
    catch (error) { return getErrorResponse(error); }
};

export const removeAddress = async (data) => {
    try { return await axios.post(`${URL}/remove-address`, data); }
    catch (error) { return getErrorResponse(error); }
};

export const getProductSearch = async (text) => {
    try { return await axios.get(`${URL}/products/search/${encodeURIComponent(text)}`); }
    catch (error) { return getErrorResponse(error); }
};

export const getAllProducts = async () => {
    try { return (await axios.get(`${URL}/products`)).data; }
    catch (error) { throw error.response ? error.response.data : new Error('Failed to fetch products'); }
};

export const getProductsByCategory = async (subCategory) => {
    try { return (await axios.get(`${URL}/products/sub/${encodeURIComponent(subCategory)}`)).data; }
    catch (_error) { return []; }
};

export const getFilterOptions = async (subCategory) => {
    try { return (await axios.get(`${URL}/products/filters`, { params: { subCategory } })).data; }
    catch (_error) { return {}; }
};

export const searchProducts = async (query) => {
    const response = await axios.get(`${URL}/products/search`, { params: { q: query } });
    return response.data;
};

export const createOrder = async (orderData) => {
    try { return await axios.post(`${URL}/order/add`, orderData); }
    catch (error) { return getErrorResponse(error); }
};

export const getOrders = async (userId) => {
    try { return await axios.get(`${URL}/orders/${encodeURIComponent(userId)}`); }
    catch (error) { return getErrorResponse(error); }
};

export const processPayment = async (amount) => {
    try { return await axios.post(`${URL}/payment/process`, { totalAmount: amount }); }
    catch (error) { return getErrorResponse(error); }
};

export const verifyPayment = async (data) => {
    try { return await axios.post(`${URL}/payment/verify`, data); }
    catch (error) { return getErrorResponse(error); }
};