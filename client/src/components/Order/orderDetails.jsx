import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockOrders from "./mockOrders";

const OrderDetails = () => {
const { orderId } = useParams();
const navigate = useNavigate();

const order = mockOrders.find((o) => o.orderId === orderId);

if (!order) {
    return <p className="p-6">Order not found.</p>;
}

return (
        <>
            <div className="container mx-auto px-4 py-6">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mb-2"
                >
                    ← Back to Orders
                </button>

                <div className="border rounded-lg p-6 shadow-sm">
                    <h1 className="text-2xl font-bold mb-2">
                    Order ID: {order.orderId}
                    </h1>

                    <p className="text-gray-600 mb-1">Date: {order.date}</p>
                    <p className="text-gray-600 mb-4">Status: {order.status}</p>

                    {/* Items */}
                    <h2 className="text-lg font-semibold mb-2">Items</h2>
                    <div className="space-y-2 mb-4">
                    {order.items.map((item) => (
                        <div
                        key={item.id}
                        className="flex justify-between border-b pb-1"
                        >
                        <span>
                            {item.name} x {item.qty}
                        </span>
                        <span>₹{item.price * item.qty}</span>
                        </div>
                    ))}
                    </div>

                    {/* Total */}
                    <p className="font-semibold mb-4">
                    Total Amount: ₹{order.total}
                    </p>

                    {/* Address */}
                    <h2 className="text-lg font-semibold mb-1">Delivery Address</h2>
                    <p className="text-gray-600">{order.address}</p>
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
