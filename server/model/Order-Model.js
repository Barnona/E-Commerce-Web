const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { 
        type: String,
        ref: 'user',
        required: true
    },
    products: [
        {
            productId: { type: String, required: true },
            name: { type: String },  // Added for better UI
            image: { type: String }, // Added for the Order Page image
            qty: { type: Number, required: true },
            price: { type: Number, required: true } 
        }
    ],
    totalAmount: { 
        type: Number, 
        required: true 
    },
    shippingAddress: {
        line1: { type: String, required: true },
        line2: String,
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String }
    },
    paymentMethod: {
        type: String,
        default: 'COD'
    },
    paymentStatus: {
        type: String,
        default: 'Pending'
    },
    orderStatus: {
        type: String,
        default: 'Processing'
    }
}, { timestamps: true });

const Order = mongoose.model('order', orderSchema);

module.exports = Order;