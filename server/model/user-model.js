const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    gender: {type: String},
    profileImage: { type: String },

    status: { 
        type: String, 
        default: 'Active', 
        enum: ['Active', 'Inactive', 'Suspended'] 
    },
    lastLogin: { type: Date, default: Date.now },

    addresses: [
        {
            line1: { type: String },
            line2: { type: String },
            city: { type: String },
            zip: { type: String },
            state: { type: String },
            country: { type: String }
        }
    ],
    orders: [{
        orderId: String,
        productId: String,
        qty: Number,
        totalPrice: Number,
        date: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now },

    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
},
{
    timestamps: true
}
);

const User = mongoose.model('user', userSchema);

module.exports = User;
