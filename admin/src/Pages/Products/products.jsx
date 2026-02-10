import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
    FaSearch, FaFilter, FaEdit, FaTrashAlt, FaEye, FaPlus, 
    FaCloudUploadAlt, FaBoxOpen, FaExclamationTriangle, 
    FaCheckCircle, FaChevronDown, FaChevronUp, FaStar, FaSpinner,
    FaSave, FaTimes, FaCopy 
} from 'react-icons/fa';
import { getProducts, deleteProduct, updateProduct } from '../../service/api';
const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [expandedRow, setExpandedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); 
    const [editProductId, setEditProductId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        brand: '',
        price: '',
        discount: '', 
        stock: '',
        taxClass: ''
    });
    useEffect(() => {
        fetchProductData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter]);
    const fetchProductData = async () => {
        setIsLoading(true);
        try {
            const response = await getProducts();
            if (Array.isArray(response)) {
                setProducts(response);
            } else if (response && Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                setProducts([]); 
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };
    const handleDeleteClick = async (id) => {
        if(window.confirm("Are you sure you want to delete this product?")) {
            const response = await deleteProduct(id);
            if(response && response.status === 200) {
                const newProducts = products.filter(product => product.id !== id);
                setProducts(newProducts);
                alert("Product Deleted");
            } else {
                alert("Failed to delete product");
            }
        }
    }
    const handleEditClick = (event, product) => {
        event.preventDefault();
        setEditProductId(product.id); 
        setEditFormData({
            name: product.name,
            brand: product.brand,
            price: product.basePrice,
            discount: product.discount || 0,
            stock: product.stockLevel,
            taxClass: product.taxClass || 0
        });
    }
    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
    }
    const handleCancelClick = () => {
        setEditProductId(null);
    }
    const handleSaveClick = async (id) => {
        const response = await updateProduct(id, editFormData);
        if (response && (response.status === 200 || response.status === 201)) { 
            const updatedBackendData = response.data.data;
            const updatedProducts = products.map((product) => {
                if (product.id === id) {
                    return { 
                        ...product,
                        name: updatedBackendData.name,
                        brand: updatedBackendData.brand,
                        basePrice: updatedBackendData.price,
                        discount: updatedBackendData.discount,
                        stockLevel: updatedBackendData.stock,
                        taxClass: updatedBackendData.taxClass || updatedBackendData.tax, 
                        salePrice: updatedBackendData.salePrice || (updatedBackendData.price - updatedBackendData.discount),
                        status: updatedBackendData.stock === 0 ? 'Out of Stock' : (updatedBackendData.stock < 5 ? 'Low Stock' : 'In Stock')
                    };
                }
                return product;
            });
            setProducts(updatedProducts);
            setEditProductId(null);
            alert("Product Updated Successfully");
        } else {
            alert("Failed to update product");
        }
    }
    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("ID copied: " + text);
    };
    const getStockColor = (level) => {
        if (level === 0) return 'text-red-600 bg-red-100';
        if (level < 15) return 'text-orange-600 bg-orange-100';
        return 'text-green-600 bg-green-100';
    };
    const filteredProducts = useMemo(() => {
        const safeProducts = Array.isArray(products) ? products : [];
        return safeProducts.filter(product => {
            const matchesSearch = (product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  (product.brand || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  (product.id || '').includes(searchTerm);
            const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, categoryFilter]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);
            if (currentPage <= 2) end = 4;
            if (currentPage >= totalPages - 1) start = totalPages - 3;
            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push('...');
            if (!pages.includes(totalPages)) pages.push(totalPages);
        }
        return pages;
    };
    
    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-900">Products</h1>
                        <p className="text-gray-500 mt-1">Manage your inventory and product details.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/products/add-product">
                            <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition shadow-sm font-medium">
                                <FaPlus /> Add Product
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
                        <div className="relative w-full md:w-96">
                            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search by Name, Brand or ID..." 
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <FaFilter className="text-gray-400" />
                            <select 
                                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Fashion">Fashion</option>
                                <option value="HomeAppliaces">Home Appliances</option>
                                <option value="Furniture">Furniture</option>
                                <option value="BooksToys">Books & Toys</option>
                                <option value="BeautyHealth">Beauty & Health</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                                <FaSpinner className="animate-spin text-3xl mb-3 text-blue-600" />
                                <p>Loading inventory...</p>
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                                        <th className="p-4 border-b"></th>
                                        <th className="p-4 font-semibold border-b">ID</th> 
                                        <th className="p-4 font-semibold border-b">Product Name</th>
                                        <th className="p-4 font-semibold border-b">Category</th>
                                        <th className="p-4 font-semibold border-b">Brand</th>
                                        <th className="p-4 font-semibold border-b">Base Price</th>
                                        <th className="p-4 font-semibold border-b">Discount</th>
                                        <th className="p-4 font-semibold border-b">Tax (%)</th>
                                        <th className="p-4 font-semibold border-b">Sale Price</th>
                                        <th className="p-4 font-semibold border-b">Stock</th>
                                        <th className="p-4 font-semibold border-b text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    {currentItems.length > 0 ? (
                                        currentItems.map((product) => (
                                            <React.Fragment key={product.id}>
                                                <tr className={`hover:bg-gray-50 transition-colors ${expandedRow === product.id ? 'bg-blue-50/30' : ''}`}>                                                    
                                                    <td className="p-4 text-center w-10">
                                                        <button onClick={() => toggleRow(product.id)} className="text-gray-500 hover:text-blue-900">
                                                            {expandedRow === product.id ? <FaChevronUp /> : <FaChevronDown />}
                                                        </button>
                                                    </td>
                                                    <td className="p-4">
                                                        <div 
                                                            className="flex items-center gap-1 group cursor-pointer" 
                                                            onClick={() => copyToClipboard(product.id)}
                                                            title="Click to copy ID"
                                                        >
                                                            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                                                                #{product.id.slice(-6).toUpperCase()}
                                                            </span>
                                                            <FaCopy className="text-gray-300 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                    </td>
                                                    <td className="p-4 font-medium text-blue-900">
                                                        {editProductId === product.id ? (
                                                            <input type="text" name="name" value={editFormData.name} onChange={handleEditFormChange} className="w-full p-1 border rounded" />
                                                        ) : product.name}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="text-gray-800">{product.category}</div>
                                                        <div className="text-xs text-gray-500">{product.subCategory}</div>
                                                    </td>
                                                    <td className="p-4 text-gray-600">
                                                        {editProductId === product.id ? (
                                                            <input type="text" name="brand" value={editFormData.brand} onChange={handleEditFormChange} className="w-full p-1 border rounded" />
                                                        ) : product.brand}
                                                    </td>
                                                    <td className="p-4 text-gray-600">
                                                        {editProductId === product.id ? (
                                                            <input type="number" name="price" value={editFormData.price} onChange={handleEditFormChange} className="w-20 p-1 border rounded" />
                                                        ) : `₹${(product.basePrice || 0).toLocaleString()}`}
                                                    </td>
                                                    <td className="p-4 text-red-500 font-medium">
                                                        {editProductId === product.id ? (
                                                            <input type="number" name="discount" value={editFormData.discount} onChange={handleEditFormChange} className="w-16 p-1 border rounded text-red-600" />
                                                        ) : `₹${(product.discount || 0).toLocaleString()}`}
                                                    </td>
                                                    <td className="p-4">
                                                        {editProductId === product.id ? (
                                                            <input 
                                                                type="number" 
                                                                name="taxClass"
                                                                value={editFormData.taxClass} 
                                                                onChange={handleEditFormChange} 
                                                                className="w-16 p-1 border rounded text-xs"
                                                                placeholder="0"
                                                            />
                                                        ) : (
                                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium border border-gray-200">
                                                                {product.taxClass ? `${product.taxClass}%` : '0%'}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 font-bold text-green-700 text-base">
                                                        ₹{(product.salePrice || 0).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})}
                                                    </td>
                                                    <td className="p-4">
                                                        {editProductId === product.id ? (
                                                            <input type="number" name="stock" value={editFormData.stock} onChange={handleEditFormChange} className="w-16 p-1 border rounded" />
                                                        ) : (
                                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStockColor(product.stockLevel)}`}>
                                                                {product.stockLevel}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            {editProductId === product.id ? (
                                                                <>
                                                                    <button onClick={() => handleSaveClick(product.id)} className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition" title="Save">
                                                                        <FaSave />
                                                                    </button>
                                                                    <button onClick={handleCancelClick} className="p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition" title="Cancel">
                                                                        <FaTimes />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button className="p-2 hover:bg-blue-100 text-blue-600 rounded transition"><FaEye /></button>
                                                                    <button onClick={(e) => handleEditClick(e, product)} className="p-2 hover:bg-yellow-100 text-yellow-600 rounded transition"><FaEdit /></button>
                                                                    <button onClick={() => handleDeleteClick(product.id)} className="p-2 hover:bg-red-100 text-red-600 rounded transition"><FaTrashAlt /></button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                                {expandedRow === product.id && (
                                                    <tr className="bg-gray-50">
                                                        <td colSpan="11" className="p-4 md:p-6 border-b border-gray-200 shadow-inner">
                                                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                                                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide">
                                                                    Recent Orders for {product.name}
                                                                </div>
                                                                {product.orders && product.orders.length > 0 ? (
                                                                    <table className="w-full text-sm text-left">
                                                                        <thead>
                                                                            <tr className="border-b text-gray-500">
                                                                                <th className="p-3 font-medium">Order ID</th>
                                                                                <th className="p-3 font-medium">Customer</th>
                                                                                <th className="p-3 font-medium">Date</th>
                                                                                <th className="p-3 font-medium">Qty</th>
                                                                                <th className="p-3 font-medium">Status</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="divide-y divide-gray-100">
                                                                            {product.orders.map((order, idx) => (
                                                                                <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                                                                                    <td className="p-3 text-blue-600 font-medium">#{order.id}</td>
                                                                                    <td className="p-3">{order.name}</td>
                                                                                    <td className="p-3 text-gray-500">{order.date}</td>
                                                                                    <td className="p-3">{order.qty}</td>
                                                                                   <td className="p-3">{order.status}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                ) : <div className="p-4 text-center text-gray-500 text-sm italic">No orders found.</div>}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <tr><td colSpan="11" className="p-8 text-center text-gray-500">No products found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                    {filteredProducts.length > 0 && (
                        <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
                            <p>Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredProducts.length)}</span> of <span className="font-medium">{filteredProducts.length}</span> items</p>
                            <div className="flex gap-2">
                                <div className="flex flex-wrap justify-center gap-2">
                                    <button 
                                        onClick={() => paginate(currentPage - 1)} 
                                        disabled={currentPage === 1} 
                                        className={`px-3 py-1 border rounded transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-50'}`}
                                    >
                                        Previous
                                    </button>
                                    {getPageNumbers().map((page, index) => (
                                        <button
                                            key={index}
                                            onClick={() => typeof page === 'number' && paginate(page)}
                                            disabled={page === '...'}
                                            className={`px-3 py-1 border rounded transition ${
                                                currentPage === page 
                                                    ? 'bg-blue-900 text-white border-blue-900' 
                                                    : page === '...' 
                                                        ? 'cursor-default border-transparent' 
                                                        : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;