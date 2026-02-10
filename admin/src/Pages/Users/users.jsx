import React, { useState, useEffect, useMemo } from 'react';
import { 
    FaSearch, 
    FaFilter, 
    FaEdit, 
    FaTrashAlt, 
    FaEye, 
    FaUser,
    FaMapMarkerAlt,
    FaShoppingBag,
    FaChevronDown,
    FaChevronUp,
    FaCheckCircle,
    FaTimesCircle,
    FaSpinner,
    FaCalendarAlt
} from 'react-icons/fa';

import { getAllUsers, deleteUser } from '../../service/api';

const Users = () => {
    const [users, setUsers] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [expandedRow, setExpandedRow] = useState(null); 

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 

    const MOCK_USERS = [
        {
            _id: 'mock_1',
            customerId: 'CUS-00078',
            name: 'Barnona Das',
            emailId: 'barnonadas@gmail.com',
            phoneNo: '918910205092',
            state: 'West Bengal',
            country: 'India',
            status: 'Active',
            lastLogin: '04/01/2025',
            registerOn: '01/01/2025',
            addresses: [
                { line1: 'Putul Apartment', line2: 'Garia', zip: '700152', city: 'Kolkata', state: 'West Bengal', country: 'India' }
            ],
            orders: [
                { 
                    orderId: 'ORD-998877', 
                    productId: 'PROD-101', 
                    qty: 1, 
                    totalPrice: 32569, 
                    date: '2025-01-10T10:00:00.000Z' 
                },
                { 
                    orderId: 'ORD-998878', 
                    productId: 'PROD-105', 
                    qty: 2, 
                    totalPrice: 1500, 
                    date: '2025-01-12T14:30:00.000Z' 
                }
            ]
        },
        {
            _id: 'mock_2',
            customerId: 'CUS-00088',
            name: 'Rahul Sharma',
            emailId: 'rahul.s@example.com',
            phoneNo: '919876543210',
            state: 'Maharashtra',
            country: 'India',
            status: 'Inactive',
            lastLogin: '12/12/2024',
            registerOn: '10/11/2024',
            addresses: [],
            orders: []
        }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await getAllUsers();
            
            if (Array.isArray(response) && response.length > 0) {
                setUsers(response);
            } 
            else if (response && Array.isArray(response.data) && response.data.length > 0) {
                setUsers(response.data);
            } 
            else {
                console.warn("API returned empty. Loading Mock Data.");
                setUsers(MOCK_USERS);
            }
            setError(null);
        } catch (err) {
            console.error("API Fetch failed, using mock data:", err);
            setUsers(MOCK_USERS);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id); 
                setUsers(prev => prev.filter(user => user._id !== id));
            } catch (err) {
                alert("Failed to delete user.");
            }
        }
    };

    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const getStatusStyle = (status) => {
        if (status?.toLowerCase() === 'active') return 'text-green-600 bg-green-100 border-green-200';
        return 'text-red-600 bg-red-100 border-red-200';
    };

    const filteredUsers = useMemo(() => {
        const safeUsers = Array.isArray(users) ? users : [];

        return safeUsers.filter(user => {
            const term = searchTerm.toLowerCase();
            const matchesSearch = user.name?.toLowerCase().includes(term) || 
                                  user.emailId?.toLowerCase().includes(term) ||
                                  user.customerId?.toLowerCase().includes(term);
            
            const matchesStatus = statusFilter === 'All' || user.status?.toLowerCase() === statusFilter.toLowerCase();
            
            return matchesSearch && matchesStatus;
        });
    }, [users, searchTerm, statusFilter]);

    // 6. Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-900">Users</h1>
                        <p className="text-gray-500 mt-1">Manage customer accounts and details.</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    
                    <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
                        <div className="relative w-full md:w-96">
                            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search by Name, Email or ID..." 
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
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                                <FaSpinner className="animate-spin text-3xl mb-3 text-blue-600" />
                                <p>Loading users...</p>
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                                        <th className="p-4 border-b"></th>
                                        <th className="p-4 font-semibold border-b">Customer ID</th>
                                        <th className="p-4 font-semibold border-b">Name</th>
                                        <th className="p-4 font-semibold border-b">Contact Info</th>
                                        <th className="p-4 font-semibold border-b">Location</th>
                                        <th className="p-4 font-semibold border-b">Status</th>
                                        <th className="p-4 font-semibold border-b">Registered</th>
                                        <th className="p-4 font-semibold border-b text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    {currentItems.length > 0 ? (
                                        currentItems.map((user) => (
                                            <React.Fragment key={user._id}>
                                                
                                                <tr className={`hover:bg-gray-50 transition-colors ${expandedRow === user.customerId ? 'bg-blue-50/30' : ''}`}>
                                                    <td className="p-4 text-center w-10">
                                                        <button onClick={() => toggleRow(user.customerId)} className="text-gray-500 hover:text-blue-900">
                                                            {expandedRow === user.customerId ? <FaChevronUp /> : <FaChevronDown />}
                                                        </button>
                                                    </td>
                                                    <td className="p-4 text-gray-500 font-medium text-xs">{user.customerId}</td>
                                                    <td className="p-4 font-medium text-blue-900">{user.name}</td>
                                                    <td className="p-4">
                                                        <div className="text-gray-800">{user.emailId}</div>
                                                        <div className="text-xs text-gray-500">{user.phoneNo}</div>
                                                    </td>
                                                    <td className="p-4 text-gray-600">{user.state}, {user.country}</td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(user.status)}`}>{user.status}</span>
                                                    </td>
                                                    <td className="p-4 text-gray-500">{user.registerOn}</td>
                                                    <td className="p-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button onClick={() => handleDelete(user._id)} className="p-2 hover:bg-red-100 text-red-600 rounded transition"><FaTrashAlt /></button>
                                                        </div>
                                                    </td>
                                                </tr>

                                                {expandedRow === user.customerId && (
                                                    <tr className="bg-gray-50 animate-fade-in">
                                                        <td colSpan="8" className="p-0 border-b border-gray-200">
                                                            <div className="p-6 grid gap-6">
                                                                
                                                                <div>
                                                                    <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                                                        <FaMapMarkerAlt className="text-blue-600" /> Saved Addresses
                                                                    </h4>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        {user.addresses && user.addresses.length > 0 ? (
                                                                            user.addresses.map((addr, idx) => (
                                                                                <div key={idx} className="bg-white p-4 rounded border border-gray-200 shadow-sm text-sm text-gray-600">
                                                                                    <p><span className="font-semibold text-gray-800">Line 1:</span> {addr.line1}</p>
                                                                                    {addr.line2 && <p><span className="font-semibold text-gray-800">Line 2:</span> {addr.line2}</p>}
                                                                                    <p><span className="font-semibold text-gray-800">City/Zip:</span> {addr.city} - {addr.zip}</p>
                                                                                    <p><span className="font-semibold text-gray-800">State/Country:</span> {addr.state}, {addr.country}</p>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                            <p className="text-gray-500 italic text-sm">No addresses saved.</p>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                                                        <FaShoppingBag className="text-blue-600" /> Order History
                                                                    </h4>
                                                                    <div className="bg-white rounded border border-gray-200 overflow-hidden">
                                                                        {user.orders && user.orders.length > 0 ? (
                                                                            <table className="w-full text-sm text-left">
                                                                                <thead className="bg-gray-100 text-gray-600">
                                                                                    <tr>
                                                                                        <th className="p-3 font-semibold">Order ID</th>
                                                                                        <th className="p-3 font-semibold">Product ID</th>
                                                                                        <th className="p-3 font-semibold">Date</th>
                                                                                        <th className="p-3 font-semibold">Qty</th>
                                                                                        <th className="p-3 font-semibold">Total Price</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="divide-y divide-gray-100">
                                                                                    {user.orders.map((order, idx) => (
                                                                                        <tr key={idx} className="hover:bg-gray-50">
                                                                                            <td className="p-3 text-blue-600">#{order.orderId}</td>
                                                                                            <td className="p-3 text-gray-800">{order.productId}</td>
                                                                                            <td className="p-3 text-gray-600">
                                                                                                <div className="flex items-center gap-1">
                                                                                                    <FaCalendarAlt className="text-gray-400 text-xs"/>
                                                                                                    {order.date ? new Date(order.date).toLocaleDateString('en-IN') : 'N/A'}
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="p-3 text-gray-600">{order.qty}</td>
                                                                                            <td className="p-3 font-medium text-gray-800">₹{order.totalPrice}</td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        ) : (
                                                                            <div className="p-4 text-center text-gray-500 italic">
                                                                                No orders found for this user.
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="p-8 text-center text-gray-500">
                                                No users found matching "{searchTerm}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {filteredUsers.length > 0 && (
                        <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
                            <p>Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredUsers.length)}</span> of <span className="font-medium">{filteredUsers.length}</span> results</p>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 border rounded transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-50'}`}
                                >
                                    Previous
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button 
                                        key={i + 1}
                                        onClick={() => paginate(i + 1)}
                                        className={`px-3 py-1 border rounded transition ${currentPage === i + 1 ? 'bg-blue-900 text-white border-blue-900' : 'hover:bg-gray-50'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button 
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 border rounded transition ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-50'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Users;