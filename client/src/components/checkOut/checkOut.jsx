import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder, getUserDetails, processPayment, verifyPayment } from '../../service/api'; 
import { getUserId } from '../utils/auth';
import { FaSpinner, FaMapMarkerAlt, FaCreditCard, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { emptyCart } = useCart();
    
    const { items, totalAmount } = location.state || {};

    const [addresses, setAddresses] = useState([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0); 
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            const userId = getUserId();
            if (!userId) { navigate('/login'); return; }
            if (!items || items.length === 0) { navigate('/cart'); return; }

            try {
                const res = await getUserDetails(userId);
                if (res?.data?.addresses) {
                    setAddresses(res.data.addresses);
                }
            } catch (error) {
                console.error("Error loading addresses", error);
            } finally {
                setPageLoading(false);
            }
        };
        fetchAddresses();
    }, []);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleConfirmOrder = async () => {
        if (addresses.length === 0) {
            alert("Please add a delivery address first.");
            navigate('/settings')
            return;
        }

        setLoading(true);
        const userId = getUserId();
        const address = addresses[selectedAddressIndex];
        
        const productPayload = items.map(item => ({
            productId: item.productId,
            qty: item.qty,
            price: item.finalPrice,
            name: item.name,
            image: item.image,
        }));

        try {
            // --- OPTION A: CASH ON DELIVERY ---
            if (paymentMethod === "COD") {
                const response = await createOrder({
                    userId,
                    products: productPayload,
                    totalAmount,
                    address,
                    paymentMethod: "COD"
                });

                if (response.status === 201 || response.status === 200) {
                    await finalizeOrder();
                } else {
                    alert("Failed to place order. Try again.");
                    setLoading(false);
                }
            } 
            
            // --- ONLINE PAYMENT (RAZORPAY) ---
            else {
                const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
                if (!res) { alert("Razorpay SDK failed to load. Check internet."); setLoading(false); return; }

                const result = await processPayment(totalAmount);
                if (!result || result.status !== 200) { 
                    alert("Server error processing payment."); 
                    setLoading(false); 
                    return; 
                }

                const { amount, id: order_id, currency } = result.data;

                const options = {
                    key: 'rzp_test_S6EOC4gvXKhV6u',
                    amount: amount.toString(),
                    currency: currency,
                    name: "E-Shop Store",
                    description: "Payment for Order",
                    order_id: order_id,
                    handler: async function (response) {
                        const data = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId,
                            products: productPayload,
                            totalAmount,
                            address
                        };

                        const verifyRes = await verifyPayment(data);
                        if (verifyRes.status === 200) {
                            await finalizeOrder();
                        } else {
                            alert("Payment verification failed. Please contact support.");
                            setLoading(false);
                        }
                    },
                    prefill: {
                        name: "Customer Name",
                        email: "customer@example.com",
                        contact: "9999999999",
                    },
                    theme: { color: "#3399cc" },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
                
                paymentObject.on('payment.failed', function (response){
                    alert("Payment Failed: " + response.error.description);
                    setLoading(false);
                });
            }

        } catch (error) {
            console.error(error);
            alert("Something went wrong during checkout.");
            setLoading(false);
        }
    };

    const finalizeOrder = async () => {
        await emptyCart();
        setLoading(false);
        alert("🎉 Order Placed Successfully!");
        navigate('/orders');
    };

    if (pageLoading) return (
        <div className="h-screen flex flex-col justify-center items-center text-gray-500">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4"/>
            <p>Loading checkout details...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* --- LEFT COLUMN: SELECTIONS --- */}
                <div className="md:col-span-2 space-y-6">
                    
                    {/* 1. Address Selection */}
                    <div className="bg-white p-6 rounded shadow-sm">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                                Delivery Address
                            </h3>
                            <button onClick={() => navigate('/settings')} className="text-blue-600 font-bold text-xs uppercase hover:underline">+ Add New</button>
                        </div>

                        {addresses.length > 0 ? (
                            <div className="grid gap-3">
                                {addresses.map((addr, idx) => (
                                    <div 
                                        key={idx}
                                        onClick={() => setSelectedAddressIndex(idx)}
                                        className={`cursor-pointer border p-4 rounded-lg flex items-start gap-4 transition-all ${
                                            selectedAddressIndex === idx 
                                            ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" 
                                            : "border-gray-200 hover:border-blue-400"
                                        }`}
                                    >
                                        <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedAddressIndex === idx ? "border-blue-600" : "border-gray-400"}`}>
                                            {selectedAddressIndex === idx && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                                                {addr.name || "Home/Work"} 
                                                <span className="bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded uppercase">{addr.type || 'ADDRESS'}</span>
                                            </p>
                                            <p className="text-gray-600 text-sm mt-1">{addr.line1}, {addr.line2}</p>
                                            <p className="text-gray-600 text-sm">{addr.city}, {addr.state} - <strong>{addr.zip}</strong></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-8 border-2 border-dashed border-red-200 bg-red-50 rounded">
                                <FaMapMarkerAlt className="text-3xl text-red-300 mx-auto mb-2"/>
                                <p className="text-red-600 font-medium">No saved addresses found.</p>
                                <button onClick={() => navigate('/settings')} className="mt-2 text-sm bg-white border border-red-300 px-4 py-1 rounded text-red-600 font-bold hover:bg-red-50">Add Address</button>
                            </div>
                        )}
                    </div>

                    {/* 2. Order Summary (Review Items) */}
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                            Order Summary
                        </h3>
                        <div className="space-y-4">
                            {items && items.map((item) => (
                                <div key={item.productId} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center border border-gray-200">
                                        <img src={item.image} alt={item.name} className="max-w-full max-h-full p-1 object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm text-gray-800 line-clamp-1">{item.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">Quantity: {item.qty}</p>
                                        <p className="font-bold text-gray-900 mt-1">₹{item.finalPrice * item.qty}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: PAYMENT & TOTAL --- */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded shadow-sm sticky top-24">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Payment Options</h3>
                        
                        {/* Payment Selection */}
                        <div className="space-y-3 mb-6">
                            {/* Option: Online */}
                            <label 
                                onClick={() => setPaymentMethod("ONLINE")}
                                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "ONLINE" ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" : "border-gray-200 hover:bg-gray-50"}`}
                            >
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === "ONLINE" ? "border-blue-600" : "border-gray-400"}`}>
                                    {paymentMethod === "ONLINE" && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                                </div>
                                <div className="flex-1">
                                    <span className="font-bold text-gray-800 flex items-center gap-2">
                                        UPI / Card / NetBanking
                                        <FaCreditCard className="text-blue-500"/>
                                    </span>
                                    <span className="text-xs text-green-600 block mt-0.5">Fast & Secure Payment</span>
                                </div>
                            </label>

                            {/* Option: COD */}
                            <label 
                                onClick={() => setPaymentMethod("COD")}
                                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "COD" ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" : "border-gray-200 hover:bg-gray-50"}`}
                            >
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === "COD" ? "border-blue-600" : "border-gray-400"}`}>
                                    {paymentMethod === "COD" && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                                </div>
                                <div className="flex-1">
                                    <span className="font-bold text-gray-800 flex items-center gap-2">
                                        Cash on Delivery
                                        <FaMoneyBillWave className="text-green-600"/>
                                    </span>
                                    <span className="text-xs text-gray-500 block mt-0.5">Pay when you receive</span>
                                </div>
                            </label>
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-gray-50 p-4 rounded border border-gray-100 text-sm space-y-2 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Price ({items?.length} items)</span>
                                <span>₹{items?.reduce((acc, i) => acc + (i.finalPrice * i.qty), 0)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Discount</span>
                                <span>-₹{(items?.reduce((acc, i) => acc + (i.finalPrice * i.qty), 0)) > 1000 ? 200 : 0}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Charges</span>
                                <span className="text-green-600 font-bold">₹{(items?.reduce((acc, i) => acc + (i.finalPrice * i.qty), 0)) > 1000 ? 0 : 40}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-lg text-gray-900">
                                <span>Total Payable</span>
                                <span>₹{totalAmount}</span>
                            </div>
                        </div>

                        {/* Confirm Button */}
                        <button 
                            onClick={handleConfirmOrder}
                            disabled={loading || addresses.length === 0}
                            className={`w-full py-4 rounded font-bold text-white shadow-lg flex justify-center items-center gap-2 transition-all ${
                                loading || addresses.length === 0 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-orange-500 hover:bg-orange-600 active:scale-[0.98]"
                            }`}
                        >
                            {loading ? <FaSpinner className="animate-spin text-xl" /> : (paymentMethod === "COD" ? "PLACE COD ORDER" : "PAY NOW")}
                        </button>

                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <FaShieldAlt /> 100% Safe & Secure Payments
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;