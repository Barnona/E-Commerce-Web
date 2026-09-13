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
`;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Order Confirmation - E-Shop',
                    message,
                });
            } catch (_emailError) {
                // Email failure must not expose transport details or block the order.
            }
        }

        await Cart.deleteMany({ userId });
        res.status(201).json(savedOrder);
    } catch (_error) {
        res.status(500).json({ message: 'Unable to create order' });
    }
};

const getOrders = async (request, response) => {
    try {
        const orders = await Order.find({ userId: request.params.userId }).sort({ createdAt: -1 });
        response.status(200).json(orders);
    } catch (_error) {
        response.status(500).json({ message: 'Unable to fetch orders' });
    }
};

const getAllOrders = async (_req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (_error) {
        res.status(500).json({ message: 'Unable to fetch orders' });
    }
};

const updateOrderStatus = async (request, response) => {
    try {
        const { orderStatus, paymentStatus } = request.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            request.params.id,
            { $set: { orderStatus, paymentStatus } },
            { new: true }
        );

        if (!updatedOrder) {
            return response.status(404).json({ message: 'Order not found' });
        }

        response.status(200).json(updatedOrder);
    } catch (_error) {
        response.status(500).json({ message: 'Unable to update order status' });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (_error) {
        res.status(500).json({ message: 'Unable to delete order' });
    }
};

module.exports = { createOrder, getOrders, getAllOrders, updateOrderStatus, deleteOrder };