const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullname : {type : String},
    name : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    bio : {type : String},
    image : {type : String},
    createdAt: { type: Date, default: Date.now },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;
