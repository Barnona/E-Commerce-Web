const User = require('../model/user-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const { sendEmail } = require('./email-controller.js');

const userSignup = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if (exist) {
            return response.status(401).json({ message: 'Username already exists' });
        }

        const emailExist = await User.findOne({ email: request.body.email });
        if (emailExist) {
            return response.status(401).json({ message: 'Email already exists' });
        }

        const user = request.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const newUser = new User({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            phone: user.phone || user.mobile,
            gender: user.gender,
            password: hashedPassword
        });

        await newUser.save();

        response.status(200).json({ message: user });
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const userLogin = async (request, response) => {
    try {
        const email = request.body.email;
        const password = request.body.password;

        const user = await User.findOne({ email: email });
        
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // Generate Token
                const token = jwt.sign(
                    { id: user._id, email: user.email }, 
                    process.env.JWT_SECRET || 'default_secret_key', 
                    { expiresIn: '7d' } 
                );

                // --- KEY CHANGE HERE ---
                // We send the profileImage and firstname back to the frontend
                return response.status(200).json({ 
                    data: {
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        profileImage: user.profileImage, // Ensure this field is sent
                        token: token 
                    }, 
                    message: "Login Successful" 
                });
            } else {
                return response.status(401).json({ message: 'Invalid Password' });
            }
        } else {
            return response.status(401).json({ message: 'Email does not exist' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const forgotPassword = async (request, response) => {
    try {
        const { email } = request.body;

        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        const token = crypto.randomBytes(32).toString('hex');

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();

        const resetLink = `http://localhost:5174/reset-password/${token}`;
        
        await sendEmail(
            user.email, 
            "Password Reset Request", 
            `Click this link to reset your password: ${resetLink}`
        );

        response.status(200).json({ message: "Reset link sent to your email" });

    } catch (error) {
        console.log(error);
        response.status(500).json({ message: error.message });
    }
}

const resetPassword = async (request, response) => {
    try {
        const { token } = request.params;
        const { password } = request.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return response.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update User
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // Clear token
        user.resetPasswordExpires = undefined; // Clear expiration
        await user.save();

        response.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const getUserById = async (request, response) => {
    try {
        // Don't return the password!
        const user = await User.findById(request.params.id).select('-password'); 
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const updateUserProfile = async (request, response) => {
    try {
        // The ID comes from the frontend (or session)
        const userId = request.body.id; 
        
        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        // Update Text Fields
        if (request.body.firstname) user.firstname = request.body.firstname;
        if (request.body.lastname) user.lastname = request.body.lastname;
        if (request.body.gender) user.gender = request.body.gender;
        if (request.body.mobile) user.phone = request.body.mobile;
        
        // Update Image (If a file was uploaded)
        if (request.file) {
            // Store the filename (e.g., "profile-12345.jpg")
            user.profileImage = request.file.filename;
        }

        const updatedUser = await user.save();

        response.status(200).json({ 
            message: "Profile Updated Successfully", 
            data: {
                id: updatedUser._id,
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                email: updatedUser.email,
                mobile: updatedUser.phone,
                gender: updatedUser.gender,
                profileImage: updatedUser.profileImage
            }
        });

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const changePassword = async (request, response) => {
    try {
        const { id, oldPassword, newPassword } = request.body;

        // 1. Find the user
        const user = await User.findById(id);
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        
        if (!isMatch) {
            return response.status(400).json({ message: "Incorrect Old Password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // 4. Update and Save
        user.password = hashedNewPassword;
        await user.save();

        response.status(200).json({ message: "Password Changed Successfully" });

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const saveAddress = async (request, response) => {
    try {
        const { id, line1, line2, city, zip, state, country } = request.body;

        // 1. Validate required fields
        if (!id || !line1 || !city || !zip || !state || !country) {
            return response.status(400).json({ message: "Missing required address fields" });
        }

        // 2. Find User and Push New Address
        const user = await User.findByIdAndUpdate(
            id,
            {
                $push: {
                    addresses: {
                        line1,
                        line2,
                        city,
                        zip,
                        state,
                        country
                    }
                }
            },
            { new: true } // Return the updated user object
        );

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        response.status(200).json({ 
            message: "Address saved successfully", 
            data: user.addresses 
        });

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const removeAddress = async (request, response) => {
    try {
        const { id, addressId } = request.body; // We need the specific address ID to delete

        const user = await User.findByIdAndUpdate(
            id,
            { $pull: { addresses: { _id: addressId } } }, // Remove item with specific ID
            { new: true }
        );

        response.status(200).json({ message: "Address removed", data: user.addresses });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const getAllUsers = async (request, response) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });

        const formattedUsers = users.map(user => {
            
            // 1. FIX LOCATION (Handle empty addresses safely)
            const primaryAddress = (user.addresses && user.addresses.length > 0) 
                ? user.addresses[0] 
                : null;
                
            const userState = primaryAddress ? primaryAddress.state : 'Not Provided';
            const userCountry = primaryAddress ? primaryAddress.country : 'N/A';

            const dateStr = user.createdAt 
                ? new Date(user.createdAt).toLocaleDateString('en-GB') 
                : 'N/A';

            const shortId = `CUS-${user._id.toString().slice(-6).toUpperCase()}`;

            return {
                _id: user._id,
                customerId: shortId,        // PRETTY ID (For Display only)
                name: `${user.firstname} ${user.lastname}`,
                emailId: user.email,
                phoneNo: user.phone || 'N/A',
                state: userState,           // Fixed State
                country: userCountry,       // Fixed Country
                status: user.status || 'Active',
                lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('en-GB') : 'Never',
                registerOn: dateStr,        // Fixed Date
                addresses: user.addresses,
                orders: user.orders || []
            };
        });

        response.status(200).json(formattedUsers);

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const deleteUser = async (request, response) => {
    try {
        // The frontend sends the ID in the URL params
        const id = request.params.id;
        
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return response.status(404).json({ message: "User not found" });
        }

        response.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

module.exports = { userSignup, userLogin, forgotPassword, resetPassword, updateUserProfile, getUserById, changePassword, saveAddress, removeAddress, getAllUsers, deleteUser };
