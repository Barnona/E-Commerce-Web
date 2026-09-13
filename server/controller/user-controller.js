const User = require('../model/user-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const { sendEmail } = require('./email-controller.js');

const getJwtSecret = () => {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');
    return process.env.JWT_SECRET;
};

const userSignup = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if (exist) return response.status(401).json({ message: 'Username already exists' });
        const emailExist = await User.findOne({ email: request.body.email });
        if (emailExist) return response.status(401).json({ message: 'Email already exists' });
        const user = request.body;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await new User({ firstname: user.firstname, lastname: user.lastname, username: user.username, email: user.email, phone: user.phone || user.mobile, gender: user.gender, password: hashedPassword }).save();
        response.status(201).json({ message: 'User registered successfully' });
    } catch (error) { response.status(500).json({ message: error.message }); }
};

const userLogin = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });
        if (!user) return response.status(401).json({ message: 'Email does not exist' });
        if (!(await bcrypt.compare(password, user.password))) return response.status(401).json({ message: 'Invalid Password' });
        const token = jwt.sign({ id: user._id, email: user.email }, getJwtSecret(), { expiresIn: '7d' });
        response.status(200).json({ data: { id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, profileImage: user.profileImage, token }, message: 'Login Successful' });
    } catch (error) { response.status(500).json({ message: error.message }); }
};

const forgotPassword = async (request, response) => {
    try {
        const { email } = request.body;
        const user = await User.findOne({ email });
        if (!user) return response.status(404).json({ message: 'User not found' });
        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
        const clientUrl = (process.env.CLIENT_URLS || 'https://eshopclient.netlify.app').split(',')[0].trim().replace(/\/$/, '');
        const resetLink = `${clientUrl}/reset-password/${token}`;
        await sendEmail(user.email, 'Password Reset Request', `Click this link to reset your password: ${resetLink}`);
        response.status(200).json({ message: 'Reset link sent to your email' });
    } catch (error) { response.status(500).json({ message: error.message }); }
};

const resetPassword = async (request, response) => {
    try {
        const { token } = request.params;
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) return response.status(400).json({ message: 'Invalid or expired token' });
        user.password = await bcrypt.hash(request.body.password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        response.status(200).json({ message: 'Password updated successfully' });
    } catch (error) { response.status(500).json({ message: error.message }); }
};

const getUserById = async (request, response) => {
    try {
        const user = await User.findById(request.params.id).select('-password -resetPasswordToken -resetPasswordExpires');
        if (!user) return response.status(404).json({ message: 'User not found' });
        response.status(200).json(user);
    } catch (error) { response.status(500).json({ message: error.message }); }
};

const updateUserProfile = async (request, response) => {
    try {
        const user = await User.findById(request.body.id);
        if (!user) return response.status(404).json({ message: 'User not found' });
        if (request.body.firstname) user.firstname = request.body.firstname;
        if (request.body.lastname) user.lastname = request.body.lastname;
        if (request.body.gender) user.gender = request.body.gender;
        if (request.body.mobile) user.phone = request.body.mobile;
        if (request.file) user.profileImage = request.file.filename;
        const updatedUser = await user.save();
        response.status(200).json({ message: 'Profile Updated Successfully', data: { id: updatedUser._id, firstname: updatedUser.firstname, lastname: updatedUser.lastname, email: updatedUser.email, mobile: updatedUser.phone, gender: updatedUser.gender, profileImage: updatedUser.profileImage } });
    } catch (error) { response.status(500).json({ message: error.message }); }
};

const changePassword = async (request, response) => {
    try {
        const { id, oldPassword, newPassword } = request.body;
        const user = await User.findById(id);
        if (!user) return response.status(404).json({ message: 'User not found' });
        if (!(await bcrypt.compare(oldPassword, user.password))) return response.status(400).json({ message: 'Incorrect Old Password' });
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        response.status(200).json({ message: 'Password Changed Successfully' });
    } catch (error) { response.status(500).json({ message: error.message }); }
};

const saveAddress = async (request, response) => {
    try {
        const { id, line1, line2, city, zip, state, country } = request.body;
        if (!id || !line1 || !city || !zip || !state || !country) return response.status(400).json({ message: 'Missing required address fields' });
        const user = await User.findByIdAndUpdate(id, { $push: { addresses: { line1, line2, city, zip, state, country } } }, { new: true });
        if (!user) return response.status(404).json({ message: 'User not found' });
        response.status(200).json({ message: 'Address saved successfully', data: user.addresses });
    } catch (error) { response.status(500).json({ message: error.message }); }
};

const removeAddress = async (request, response) => {
    try {
        const user = await User.findByIdAndUpdate(request.body.id, { $pull: { addresses: { _id: request.body.addressId } } }, { new: true });
        if (!user) return response.status(404).json({ message: 'User not found' });
        response.status(200).json({ message: 'Address removed', data: user.addresses });
    } catch (error) { response.status(500).json({ message: error.message }); }
};

const getAllUsers = async (request, response) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        response.status(200).json(users.map(user => {
            const primaryAddress = user.addresses?.length ? user.addresses[0] : null;
            return { _id: user._id, customerId: `CUS-${user._id.toString().slice(-6).toUpperCase()}`, name: `${user.firstname} ${user.lastname}`, emailId: user.email, phoneNo: user.phone || 'N/A', state: primaryAddress?.state || 'Not Provided', country: primaryAddress?.country || 'N/A', status: user.status || 'Active', lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('en-GB') : 'Never', registerOn: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : 'N/A', addresses: user.addresses, orders: user.orders || [] };
        }));
    } catch (error) { response.status(500).json({ message: error.message }); }
};

const deleteUser = async (request, response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(request.params.id);
        if (!deletedUser) return response.status(404).json({ message: 'User not found' });
        response.status(200).json({ message: 'User deleted successfully' });
    } catch (error) { response.status(500).json({ message: error.message }); }
};

module.exports = { userSignup, userLogin, forgotPassword, resetPassword, updateUserProfile, getUserById, changePassword, saveAddress, removeAddress, getAllUsers, deleteUser };