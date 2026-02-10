const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../model/Order-Model');
const User = require('../model/user-model');
const Product = require('../model/Product-model.js');
const Cart = require('../model/cart-model');
const sendEmail = require('../utils/sendMail');
require('dotenv').config();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const processPayment = async (req, res) => {
    try {
        const { totalAmount } = req.body;
        
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7)
        };

        const order = await instance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error creating Razorpay order" });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature,
            userId, products, totalAmount, address 
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature !== expectedSign) {
            return res.status(400).json({ message: "Invalid Signature" });
        }

        const newOrder = new Order({
            userId,
            products,
            totalAmount,
            shippingAddress: address,
            paymentMethod: "Online",
            paymentStatus: "Paid",
            paymentId: razorpay_payment_id,
            orderStatus: "Processing"
        });

        const savedOrder = await newOrder.save();

        const user = await User.findById(userId);
        const userName = user ? `${user.firstname} ${user.lastname}` : 'Unknown';

        if (user) {
            products.forEach(item => {
                user.orders.push({
                    orderId: savedOrder._id.toString(),
                    productId: item.productId,
                    qty: item.qty,
                    totalPrice: item.price * item.qty,
                    date: new Date()
                });
            });
            await user.save();
        }

        for (const item of products) {
            await Product.findByIdAndUpdate(item.productId, {
                $push: {
                    orders: {
                        id: savedOrder._id.toString(),
                        custId: userId,
                        name: userName,
                        date: new Date().toISOString(),
                        qty: item.qty,
                        orderstatus: 'Paid'
                    }
                },
                $inc: { stock: -item.qty }
            });
        }

        if (user && user.email) {
            const message = `
                    Payment Successful!
                    Hi, ${userName}, thank you for your purchase.\n
                    Order ID: ${savedOrder._id}
                    Payment ID: ${razorpay_payment_id}
                    Total Amount: ₹${totalAmount}

                    Your order is now being processed.
                    Best Regards,
                    E-Shop Team
                `;

            try {
                await sendEmail({
                    email: user.email,
                    subject: "Payment Success & Order Confirmation",
                    message: message,
                });
                console.log("Email sent successfully");
            } catch (emailError) {
                console.log("Email service failed:", emailError);
            }
        }

        res.status(200).json({ message: "Payment Verified & Order Placed" });
        await Cart.deleteMany({ userId: userId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { processPayment, verifyPayment };