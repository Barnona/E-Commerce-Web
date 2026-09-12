const Admin = require('../model/admin-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendMail');
const crypto = require('crypto');

const getJwtSecret = () => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }
    return process.env.JWT_SECRET;
};

const adminSignup = async (request, response) => {
    try {
        const emailExist = await Admin.findOne({ email: request.body.email });
        if (emailExist) {
            return response.status(409).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const admin = new Admin({
            name: request.body.name,
            email: request.body.email,
            password: hashedPassword,
        });
        await admin.save();
        response.status(201).json({ message: 'Data Inserted' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const adminLogin = async (request, response) => {
    try {
        const { email, password } = request.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return response.status(401).json({ message: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return response.status(401).json({ message: 'Invalid login credentials' });
        }

        const token = jwt.sign({ id: admin._id }, getJwtSecret(), { expiresIn: '1h' });
        return response.status(200).json({
            token,
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            },
            message: 'Login Successful'
        });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const getAdmin = async (request, response) => {
    try {
        const admin = await Admin.findById(request.params.id).select('-password -resetPasswordToken -resetPasswordExpire');
        if (!admin) {
            return response.status(404).json({ message: 'User not found' });
        }
        response.status(200).json(admin);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const updateAdminProfile = async (request, response) => {
    try {
        const id = request.params.id;
        const { fullName, name, email, bio } = request.body;

        const updateData = {
            name: name || fullName,
            email,
            bio
        };

        if (request.file) {
            const baseUrl = (process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, '');
            updateData.image = `${baseUrl}/uploads/${request.file.filename}`;
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedAdmin) {
            return response.status(404).json({ message: 'Admin not found' });
        }

        const { password, resetPasswordToken, resetPasswordExpire, ...data } = updatedAdmin.toObject();
        response.status(200).json({ message: 'Profile Updated Successfully', data });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const changePassword = async (request, response) => {
    try {
        const id = request.params.id;
        const { currentPassword, newPassword } = request.body;
        const admin = await Admin.findById(id);
        if (!admin) {
            return response.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return response.status(400).json({ message: 'Current password is incorrect' });
        }

        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();
        response.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        admin.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        admin.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
        await admin.save({ validateBeforeSave: false });

        const clientUrl = (process.env.ADMIN_URL || process.env.CLIENT_URLS || 'http://localhost:5173')
            .split(',')[0]
            .trim()
            .replace(/\/$/, '');
        const resetUrl = `${clientUrl}/forgot-password/reset/${resetToken}`;
        const message = `Your password reset link is:\n\n${resetUrl}\n\nIf you did not request this email, please ignore it.`;

        try {
            await sendEmail({
                email: admin.email,
                subject: 'E-Shop Password Recovery',
                message,
            });

            res.status(200).json({ success: true, message: 'Password reset email sent successfully' });
        } catch (error) {
            admin.resetPasswordToken = undefined;
            admin.resetPasswordExpire = undefined;
            await admin.save({ validateBeforeSave: false });
            return res.status(500).json({ message: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const admin = await Admin.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!admin) {
            return res.status(400).json({ message: 'Reset Password Token is invalid or has expired' });
        }

        admin.password = await bcrypt.hash(req.body.password, 10);
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpire = undefined;
        await admin.save();

        res.status(200).json({ success: true, message: 'Password Updated Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { adminSignup, adminLogin, getAdmin, updateAdminProfile, changePassword, forgotPassword, resetPassword };