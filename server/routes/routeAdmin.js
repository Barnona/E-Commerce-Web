const express = require('express');
const multer = require('multer');
const path = require('path');

const { adminSignup, adminLogin, getAdmin, updateAdminProfile, changePassword, forgotPassword, resetPassword } = require('../controller/admin-controller');
const routerAdmin = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure this folder exists in your backend root!
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        // Create unique filename: admin-id-timestamp.jpg
        cb(null, `admin-${req.params.id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

routerAdmin.post('/admin/auth/register', adminSignup);
routerAdmin.post('/admin/auth/login', adminLogin)
routerAdmin.get('/admin/:id', getAdmin)
routerAdmin.post('/admin/auth/forgot-password', forgotPassword)
routerAdmin.put('/admin/auth/forgot-password/reset/:token', resetPassword)
routerAdmin.put('/admin/update-profile/:id', upload.single('avatar'), updateAdminProfile);
routerAdmin.put('/admin/change-password/:id', changePassword);
module.exports = routerAdmin;