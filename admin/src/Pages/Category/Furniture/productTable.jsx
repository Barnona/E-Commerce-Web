import React, { useState } from 'react';
import { 
    FaSearch, FaFilter, FaEdit, FaTrashAlt, FaEye, 
    FaChevronDown, FaChevronUp, FaStar, FaCircle
} from 'react-icons/fa';

const ProductTable = () => {
    const [products] = useState([
        { 
            id: 'FURN-001', 
            name: "Modern L-Shape Sofa", 
            category: "Living Room", 
            price: 45000, 
            stock: 12, 
            rating: 4.8,
            status: 'In Stock',
            variants: [
                { config: 'Grey Fabric - Left Aligned', stock: 8, sold: 25 },
                { config: 'Blue Velvet - Right Aligned', stock: 4, sold: 15 }
            ]
        },
        { 
            id: 'FURN-002', 
            name: "Solid Oak King Bed", 
            category: "Bedroom", 
            price: 32000, 
            stock: 5, 
            rating: 4.6,
            status: 'Low Stock',
            variants: [
                { config: 'With Hydraulic Storage', stock: 2, sold: 40 },
                { config: 'Without Storage', stock: 3, sold: 20 }
            ]
        },
        { 
            id: 'FURN-003', 
            name: "Ergonomic Mesh Chair", 
            category: "Office Furniture", 
            price: 8500, 
            stock: 50, 
            rating: 4.5,
            status: 'In Stock',
            variants: [
                { config: 'Black - High Back', stock: 30, sold: 150 },
                { config: 'Grey - Mid Back', stock: 20, sold: 80 }
            ]
        },
        { 
            id: 'FURN-004', 
            name: "6-Seater Dining Set", 
            category: "Dining Room", 
            price: 28000, 
            stock: 0, 
            rating: 4.7,
            status: 'Out of Stock',
            variants: [
                { config: 'Teak Finish + 6 Chairs', stock: 0, sold: 35 }
            ]
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = (id) => setExpandedRow(expandedRow === id ? null : id);

    const getStatusStyle = (status) => {
        if (status === 'In Stock') return 'text-green-600 bg-green-100 border-green-200';
        if (status === 'Low Stock') return 'text-orange-600 bg-orange-100 border-orange-200';
        return 'text-red-600 bg-red-100 border-red-200';
    };

    const filteredProducts = products.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || item.category === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
            {/* Toolbar */}
            <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search furniture..." 
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <FaFilter className="text-gray-400" />
                    <select 
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Living Room">Living Room</option>
                        <option value="Bedroom">Bedroom</option>
                        <option value="Office Furniture">Office</option>
                        <option value="Dining Room">Dining</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                            <th className="p-4 border-b w-10"></th>
                            <th className="p-4 font-semibold border-b">Product Name</th>
                            <th className="p-4 font-semibold border-b">Category</th>
                            <th className="p-4 font-semibold border-b">Price</th>
                            <th className="p-4 font-semibold border-b">Stock Status</th>
                            <th className="p-4 font-semibold border-b">Rating</th>
                            <th className="p-4 font-semibold border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                        {filteredProducts.map((item) => (
                            <React.Fragment key={item.id}>
                                <tr className={`hover:bg-gray-50 transition-colors ${expandedRow === item.id ? 'bg-blue-50/30' : ''}`}>
                                    <td className="p-4 text-center">
                                        <button onClick={() => toggleRow(item.id)} className="text-gray-500 hover:text-blue-900">
                                            {expandedRow === item.id ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                    </td>
                                    <td className="p-4 font-medium text-blue-900">{item.name}</td>
                                    <td className="p-4 text-gray-600">{item.category}</td>
                                    <td className="p-4 font-medium">₹{item.price.toLocaleString()}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(item.status)}`}>
                                            {item.status} ({item.stock})
                                        </span>
                                    </td>
                                    <td className="p-4 flex items-center gap-1 text-gray-600">
                                        {item.rating} <FaStar className="text-yellow-400" />
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-2 hover:bg-blue-100 text-blue-600 rounded transition"><FaEye /></button>
                                            <button className="p-2 hover:bg-yellow-100 text-yellow-600 rounded transition"><FaEdit /></button>
                                            <button className="p-2 hover:bg-red-100 text-red-600 rounded transition"><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Collapsible Row */}
                                {expandedRow === item.id && (
                                    <tr className="bg-gray-50">
                                        <td colSpan="7" className="p-0 border-b border-gray-200">
                                            <div className="p-6">
                                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Material & Configurations</h4>
                                                <table className="w-full text-sm text-left bg-white rounded border border-gray-200">
                                                    <thead className="bg-gray-100 text-gray-600">
                                                        <tr>
                                                            <th className="p-3 font-semibold">Variant Detail</th>
                                                            <th className="p-3 font-semibold">Current Stock</th>
                                                            <th className="p-3 font-semibold">Total Sold</th>
                                                            <th className="p-3 font-semibold">Availability</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {item.variants.map((variant, idx) => (
                                                            <tr key={idx} className="hover:bg-gray-50">
                                                                <td className="p-3 font-medium text-gray-800">{variant.config}</td>
                                                                <td className="p-3 text-gray-600">{variant.stock}</td>
                                                                <td className="p-3 text-gray-600">{variant.sold}</td>
                                                                <td className="p-3 flex items-center gap-2">
                                                                    <FaCircle className={`text-[10px] ${variant.stock > 0 ? 'text-green-500' : 'text-red-500'}`} />
                                                                    {variant.stock > 0 ? 'Available' : 'Pre-Order'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
             {/* Pagination */}
             <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
                <p>Showing <span className="font-medium">{filteredProducts.length}</span> results</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border rounded hover:bg-gray-50 opacity-50 cursor-not-allowed">Prev</button>
                    <button className="px-3 py-1 border bg-blue-900 text-white rounded">1</button>
                    <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                    <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;