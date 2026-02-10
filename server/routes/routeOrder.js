const express = require('express');

const { createOrder, getOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controller/order-controller.js');

const { processPayment, verifyPayment } = require('../controller/payment-controller');

// Payment Routes

const routerOrder = express.Router();

routerOrder.post('/order/add', createOrder);
routerOrder.get('/orders/:userId', getOrders);
routerOrder.post('/payment/process', processPayment);
routerOrder.post('/payment/verify', verifyPayment);
routerOrder.get('/all-orders', getAllOrders);
routerOrder.put('/all-orders/update/:id', updateOrderStatus);
routerOrder.delete('/all-orders/delete/:id', deleteOrder);


module.exports = routerOrder;