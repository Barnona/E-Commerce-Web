const Order = require('../model/Order-Model');
const User = require('../model/user-model');
const Product = require('../model/Product-model.js');
const sendEmail = require('../utils/sendMail');
const Cart = require('../model/cart-model');

const createOrder = async (req, res) => {
    try {
        const { userId, products, totalAmount, address, paymentMethod } = req.body;

        const newOrder = new Order({
            userId,
            products,
            totalAmount,
            shippingAddress: address,
            paymentMethod,
            paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid'
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
                        orderstatus: 'Pending'
                    }
                },
                $inc: { stock: -item.qty }
            });
        }

        if (user && user.email) {
            const message = `
                    Thank you for your order, ${userName}!
                    Your order has been placed successfully.
                    Order ID: ${savedOrder._id}
                    Total Amount: ₹${totalAmount}
                    Payment Method: ${paymentMethod}

                    We will notify you once your order is shipped.
                    Best Regards,
                    E-Shop Team
                `
            try {
                await sendEmail({
                    email: user.email,
                    subject: "Order Confirmation - E-Shop",
                    message: message,
                });
                console.log("Email sent successfully");
            } catch (emailError) {
                console.log("Email service failed:", emailError);
                // We do NOT stop the response if email fails, order is still placed
            }
        }

        res.status(201).json(savedOrder);
        await Cart.deleteMany({ userId: userId });

    } catch (error) {
        console.log("Error in createOrder:", error);
        res.status(500).json({ message: error.message });
    }
}

const getOrders = async (request, response) => {
    try {
        const userId = request.params.userId;

        const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });

        response.status(200).json(orders);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const getAllOrders = async (req, res) => {
   try{
        const orders = await Order.find({})
        res.status(200).json(orders)
    }catch(error){
        console.log("Error While Getting Data from database", error)
    }
};

const updateOrderStatus = async (request, response) => {
    try {
        const { orderStatus, paymentStatus } = request.body;
        
        const updatedOrder = await Order.findByIdAndUpdate(
            request.params.id, 
            { 
                $set: { 
                    orderStatus: orderStatus,
                    paymentStatus: paymentStatus 
                } 
            }, 
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return response.status(404).json({ message: "Order not found" });
        }

        response.status(200).json(updatedOrder);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { createOrder, getOrders, getAllOrders, updateOrderStatus, deleteOrder };