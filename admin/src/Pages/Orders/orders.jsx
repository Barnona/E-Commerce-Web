import React, { useState, useEffect, useMemo } from 'react';
import { 
    FaSearch, FaFilter, FaEdit, FaTrashAlt, FaDownload,
    FaCheckCircle, FaClock, FaShippingFast, FaTimesCircle,
    FaSpinner, FaSave, FaTimes, FaEye
} from 'react-icons/fa';

import { getAllOrders, updateOrderStatus, deleteOrder } from '../../service/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [newPaymentStatus, setNewPaymentStatus] = useState('');

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

    const MOCK_ORDERS = [
        { 
            _id: 'ORD-7890', createdAt: '2025-10-24T10:00:00Z', totalAmount: 1299, paymentStatus: 'Paid', paymentMethod: 'Online', orderStatus: 'Delivered',
            shippingAddress: { line1: '123 Main St', city: 'Mumbai', state: 'MH', zip: '400001', country: 'India' },
            userId: 'USER123',
            products: [{ productId: 'PROD-001', qty: 2, price: 500 }, { productId: 'PROD-002', qty: 1, price: 299 }]
        },
        { 
            _id: 'ORD-7891', createdAt: '2025-10-24T12:30:00Z', totalAmount: 850, paymentStatus: 'Pending', paymentMethod: 'COD', orderStatus: 'Pending',
            shippingAddress: { line1: '456 Market Rd', city: 'Delhi', state: 'DL', zip: '110001', country: 'India' },
            userId: 'USER456',
            products: [{ productId: 'PROD-005', qty: 1, price: 850 }]
        },
    ];

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const response = await getAllOrders();
            if (Array.isArray(response)) {
                setOrders(response);
            } else if (response && Array.isArray(response.data)) {
                setOrders(response.data);
            } else {
                setOrders(MOCK_ORDERS); 
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (orderId) => {
        if (window.confirm(`Are you sure you want to delete order #${orderId}?`)) {
            try {
                await deleteOrder(orderId);
                setOrders(prev => prev.filter(o => o._id !== orderId));
            } catch (error) {
                alert('Failed to delete order.');
            }
        }
    };

    const openEditModal = (order) => {
        setSelectedOrder(order);
        setNewStatus(order.orderStatus);
        setNewPaymentStatus(order.paymentStatus);
        setIsEditModalOpen(true);
    };

    const openDetailsModal = (order) => {
        setSelectedOrderDetails(order);
        setIsDetailsModalOpen(true);
    };

    const handleStatusUpdate = async () => {
        if (!selectedOrder) return;
        try {
            const updateData = {
                orderStatus: newStatus,
                paymentStatus: newPaymentStatus
            };

            await updateOrderStatus(selectedOrder._id, updateData);
            
            setOrders(prev => prev.map(order => 
                order._id === selectedOrder._id ? { 
                    ...order, 
                    orderStatus: newStatus,
                    paymentStatus: newPaymentStatus
                } : order
            ));
            setIsEditModalOpen(false);
        } catch (error) {
            console.error(error);
            alert('Failed to update status.');
        }
    };
    
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Shipped': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredOrders = useMemo(() => {
        const safeOrders = Array.isArray(orders) ? orders : [];
        
        return safeOrders
            .filter(order => {
                const id = order._id ? order._id.toString().toLowerCase() : '';
                const matchesSearch = id.includes(searchTerm.toLowerCase());
                const matchesStatus = statusFilter === 'All' || order.orderStatus === statusFilter;
                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
    }, [orders, searchTerm, statusFilter]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 relative">
            <div className="max-w-7xl mx-auto">
                
                <div className="mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-blue-900">Orders</h1>
                    <p className="text-gray-500 mt-1">Manage and track customer orders.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    
                    <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
                        <div className="relative w-full md:w-96">
                            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search by Order ID..." 
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <FaFilter className="text-gray-400" />
                            <select 
                                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                                    <th className="p-4 border-b">Order ID</th>
                                    <th className="p-4 border-b">Summary</th>
                                    <th className="p-4 border-b">Date</th>
                                    <th className="p-4 border-b">Address</th>
                                    <th className="p-4 border-b">Amount</th>
                                    <th className="p-4 border-b">Payment</th>
                                    <th className="p-4 border-b">Status</th>
                                    <th className="p-4 border-b text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {isLoading ? (
                                    <tr><td colSpan="8" className="p-8 text-center text-gray-500"><FaSpinner className="animate-spin inline mr-2"/>Loading...</td></tr>
                                ) : currentItems.length > 0 ? (
                                    currentItems.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium text-blue-900 text-xs">
                                                {order._id.toString().slice(-6).toUpperCase()}
                                                <div className="text-[10px] text-gray-400 mt-1">Cust: {order.userId.toString().slice(-6).toUpperCase()}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium whitespace-nowrap">
                                                    {order.products?.length || 0} Items
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600 whitespace-nowrap">
                                                {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                            </td>
                                            <td className="p-4 text-gray-600 text-[12px] min-w-[150px]">
                                                {order.shippingAddress ? (
                                                    <>
                                                        <div className="truncate w-32" title={`${order.shippingAddress.line1}, ${order.shippingAddress.city}`}>
                                                            {order.shippingAddress.city}, {order.shippingAddress.state}
                                                        </div>
                                                        <div className="text-[10px] text-gray-400">{order.shippingAddress.zip}</div>
                                                    </>
                                                ) : <span className="text-gray-400">N/A</span>}
                                            </td>
                                            <td className="p-4 font-bold text-gray-800">₹{order.totalAmount}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.paymentStatus === 'Paid' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                                    {order.paymentStatus}
                                                </span>
                                                <div className="text-[10px] text-gray-400 mt-1">{order.paymentMethod}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.orderStatus)}`}>
                                                    {order.orderStatus}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => openDetailsModal(order)} className="p-2 hover:bg-blue-100 text-blue-600 rounded transition" title="View Details">
                                                        <FaEye />
                                                    </button>
                                                    <button onClick={() => openEditModal(order)} className="p-2 hover:bg-yellow-100 text-yellow-600 rounded transition" title="Edit Status">
                                                        <FaEdit />
                                                    </button>
                                                    <button onClick={() => handleDelete(order._id)} className="p-2 hover:bg-red-100 text-red-600 rounded transition" title="Delete Order">
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="8" className="p-8 text-center text-gray-500">No orders found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {filteredOrders.length > 0 && (
                        <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
                            <p>Page {currentPage} of {totalPages}</p>
                            <div className="flex gap-2">
                                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50">Prev</button>
                                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50">Next</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                        <button onClick={() => setIsEditModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><FaTimes /></button>
                        <h3 className="text-xl font-bold mb-4">Update Order</h3>
                        <p className="text-sm text-gray-600 mb-6 border-b pb-2">Order #{selectedOrder?._id}</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                                <select className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                                <select className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition" value={newPaymentStatus} onChange={(e) => setNewPaymentStatus(e.target.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Refunded">Refunded</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                            <button onClick={handleStatusUpdate} className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 flex items-center gap-2"><FaSave /> Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
            {isDetailsModalOpen && selectedOrderDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col ml-46">
                        
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Order Details</h3>
                                <p className="text-sm text-gray-500">Order ID: #{selectedOrderDetails._id}</p>
                            </div>
                            <button onClick={() => setIsDetailsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <h4 className="font-semibold text-gray-700 mb-4">Product List ({selectedOrderDetails.products?.length || 0})</h4>
                            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-600 font-medium">
                                        <tr>
                                            <th className="p-3">Product ID </th>
                                            <th className="p-3 text-center">Name</th>
                                            <th className="p-3 text-center">Qty</th>
                                            <th className="p-3 text-right">Price</th>
                                            <th className="p-3 text-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {selectedOrderDetails.products?.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="p-3 text-gray-700">
                                                    <div className="font-medium truncate max-w-[200px]" title={item.productId}>
                                                        {item.productId}
                                                    </div>
                                                </td>
                                                <td className="p-3 text-gray-700">
                                                    <div className="font-medium max-w-[200px]" title={item.name}>
                                                        {item.name}
                                                    </div>
                                                </td>
                                                <td className="p-3 text-center text-gray-600">{item.qty}</td>
                                                <td className="p-3 text-right text-gray-600">₹{item.price}</td>
                                                <td className="p-3 text-right font-medium text-gray-800">
                                                    ₹{item.qty * item.price}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50 font-bold text-gray-800">
                                        <tr>
                                            <td colSpan="4" className="p-3 text-right">Grand Total:</td>
                                            <td className="p-3 text-right">₹{selectedOrderDetails.totalAmount}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            {selectedOrderDetails.shippingAddress && (
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-800 mb-2 text-sm flex items-center gap-2"><FaShippingFast/> Shipping Details</h4>
                                    <p className="text-sm text-blue-900 leading-relaxed">
                                        {selectedOrderDetails.shippingAddress.line1}, {selectedOrderDetails.shippingAddress.line2 ? selectedOrderDetails.shippingAddress.line2 + ',' : ''} <br/>
                                        {selectedOrderDetails.shippingAddress.city}, {selectedOrderDetails.shippingAddress.state} - {selectedOrderDetails.shippingAddress.zip}<br/>
                                        {selectedOrderDetails.shippingAddress.country}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={() => setIsDetailsModalOpen(false)} 
                                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;