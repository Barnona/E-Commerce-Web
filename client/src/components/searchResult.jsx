import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { getProductSearch } from '../service/api';
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import { isLoggedIn } from "./utils/auth";
import { FaSpinner, FaSadTear, FaShoppingCart, FaCheck } from 'react-icons/fa';

const SearchResults = () => {
    const { addToCart } = useCart();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchSearch = async () => {
            setLoading(true);
            const response = await getProductSearch(query);
            if (response && response.status === 200) {
                setProducts(response.data);
            } else {
                setProducts([]);
            }
            setLoading(false);
        };

        if (query) {
            fetchSearch();
        }
    }, [query]);

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Search Results for <span className="text-blue-600">"{query}"</span>
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <FaSpinner className="animate-spin text-4xl text-blue-600" />
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded shadow hover:shadow-lg transition flex flex-col relative overflow-hidden group">
                                
                                <Link to={`/product/${product._id}`} className="flex-1 p-4 flex flex-col">
                                    <div className="h-40 w-full flex items-center justify-center mb-4 relative">
                                        <img 
                                            src={product.images[0]} 
                                            alt={product.name} 
                                            className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 text-sm truncate mb-1">{product.name}</h3>
                                    <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                                </Link>

                                <div className="p-4 pt-0 mt-auto flex items-center justify-between border-t border-gray-50 pt-3">
                                    <span className="font-bold text-blue-900 text-lg">₹{Math.round((product.price - product.discount) + (product.price - product.discount) *  product.taxClass/100).toLocaleString("en-IN")}</span>
                                    
                                    <button 
                                        onClick={()=>{
                                            if (!isLoggedIn()) {
                                                alert("Please login to add items to cart");
                                              return;
                                            }
                                            addToCart(product);
                                        }}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all shadow-md ${
                                                "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                                        }`}
                                    >
                                            <>
                                                <FaShoppingCart /> Add
                                            </>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-10 rounded shadow text-center">
                        <FaSadTear className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-600">No products found</h3>
                        <p className="text-gray-500 mt-2">Try checking your spelling or use different keywords.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;