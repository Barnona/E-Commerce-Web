const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },

    images: [{ type: String }], 

    specs: { type: Object },
    price : {type: Number, default: 0},
    discount: { type: Number, default: 0 },
    taxClass: {type: Number, default: 0},
    stock: { type: Number, default: 0 },
    orders: [
        {
            id: { type: String },
            custId: { type: String },
            name: { type: String },
            date: { type: String },
            qty: { type: Number },
        }
    ],

    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;