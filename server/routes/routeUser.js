const express = require('express');
const multer = require('multer');
const path = require('path');
const { userSignup, userLogin, forgotPassword, resetPassword, updateUserProfile, getUserById, changePassword, saveAddress, removeAddress, getAllUsers, deleteUser } = require('../controller/user-controller.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
const routerUser = express.Router();

routerUser.post('/auth/signup', userSignup);
routerUser.post('/auth/login', userLogin);
routerUser.post('/auth/forgot-password', forgotPassword);
routerUser.post('/auth/reset-password/:token', resetPassword);
routerUser.get('/user/:id', getUserById);
routerUser.put('/update-profile', upload.single('profileImage'), updateUserProfile);
routerUser.post('/change-password', changePassword);
routerUser.post('/save-address', saveAddress);
routerUser.post('/remove-address', removeAddress);
routerUser.get('/users', getAllUsers);
routerUser.delete('/user/:id', deleteUser);


module.exports = routerUser;
