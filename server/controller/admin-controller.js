const Admin = require('../model/admin-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendMail');
const crypto = require('crypto');

const adminSignup = async (request, response) => {
    try {
        const emailExist = await Admin.findOne({ email: request.body.email });
        if(emailExist) {
            return response.status(409).json({ message: 'Email already exists'});
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const admin = await new Admin({
            name : request.body.name,
            email : request.body.email,
            password : hashedPassword,
        });
        await admin.save();
        response.status(201).json({ message: "Data Inserted" });
    } catch (error) {
        console.log("Error While insert data", error);
        response.status(500).json({ message: error.message });
    }
}

const adminLogin = async (request, response) => {
    try {
        const email = request.body.email;
        const password = request.body.password;

        let admin = await Admin.findOne({ email: email });
        
        if(admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {
                const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
                return response.status(200).json({ 
                    token,
                    user: { 
                        id: admin._id, 
                        name: admin.name,
                        email: admin.email
                    },
                    message: "Login Successful" 
                })
            } else {
                return response.status(401).json({ message: 'Invalid login credentials' });
            }
        } else {
            return response.status(401).json({ message: 'User does not exist' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const getAdmin = async (request, response) =>{
    try {
        const admin = await Admin.findById(request.params.id);
        
        if (admin) {
            // Return admin data (excluding password for security is best practice, but for now we send object)
            response.status(200).json(admin);
        } else {
            response.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const updateAdminProfile = async (request, response) => {
    try {
        const id = request.params.id;
        
        const { fullName, name, email, bio } = request.body;

        let updateData = {
            name: name || fullName,
            email: email,
            bio: bio
        };

        if (request.file) {
            const url = `http://localhost:5000/uploads/${request.file.filename}`;
            updateData.image = url; // Update the image field
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedAdmin) {
            return response.status(404).json({ message: "Admin not found" });
        }

        const { password, ...data } = updatedAdmin._doc;

        response.status(200).json({ message: "Profile Updated Successfully", data: data });

    } catch (error) {
        console.error(error);
        response.status(500).json({ message: error.message });
    }
};

const changePassword = async (request, response) => {
    try {
        const id = request.params.id;
        const { currentPassword, newPassword } = request.body;

        const admin = await Admin.findById(id);
        if (!admin) {
            return response.status(404).json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return response.status(400).json({ message: "Current password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        admin.password = hashedPassword;
        await admin.save();

        response.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body; 

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");

        admin.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        admin.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await admin.save({ validateBeforeSave: false });

        const resetUrl = `http://localhost:5173/forgot-password/reset/${resetToken}`;

        const message = `Your password reset token is :- \n\n ${resetUrl} \n\nIf you have not requested this email then, please ignore it.`;

        try {
            await sendEmail({
                email: admin.email,
                subject: `E-Shop Password Recovery`,
                message,
            });

            res.status(200).json({
                success: true,
                message: `Email sent to ${admin.email} successfully`,
            });

        } catch (error) {
            // If email fails, clear the token fields so the user can try again
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
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const admin = await Admin.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!admin) {
            return res.status(400).json({ message: "Reset Password Token is invalid or has expired" });
        }

        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(req.body.password, salt);

        // 4. Clear reset fields
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpire = undefined;

        await admin.save();

        res.status(200).json({ success: true, message: "Password Updated Successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { adminSignup, adminLogin, getAdmin, updateAdminProfile, changePassword, forgotPassword, resetPassword };