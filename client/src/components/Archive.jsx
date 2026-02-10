import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../service/api'; 
import { FaShippingFast, FaCheckCircle, FaShieldAlt, FaHeadset, FaUndo, FaTags, FaGlobe, FaStar } from 'react-icons/fa'

const Archive = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllProducts();
                const productList = Array.isArray(data) ? data : (data.products || []);
                
                setProducts(productList); 
            } catch (error) {
                console.log("Error fetching product links");
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-gray-100 py-6 px-10">
            <h3 className="text-md font-bold mb-3 text-gray-800">
                Product Links
            </h3>
            
            <ul className="flex flex-wrap mb-7">
                {products.map((product) => (
                    <li key={product._id}>
                        <Link 
                            to={`/product/${product.id}`} 
                            className="text-[12px] text-slate-500 hover:text-blue-800 transition-colors"
                        >
                            {product.name}
                        </Link><span className='px-1 text-slate-500'>|</span>
                    </li>
                ))}
            </ul>
            {products.length === 0 && <p className="text-sm text-gray-500">Loading links...</p>}

            <h3 className="text-xl font-bold text-blue-500 mb-3 inline-block">
                E-Shop
            </h3>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Welcome to E-Shop, where quality meets affordability. We are your one-stop 
                destination for the latest trends in fashion, cutting-edge electronics, 
                and essential home utilities. We are dedicated to providing you with the 
                very best shopping experience.
            </p>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Our goal is to transform the way you shop by bridging the gap between luxury goods and regular consumers. 
                In order to make sure that every item, from a smartphone to a pair of sneakers, adds real value to your life, we carefully curate our inventory in collaboration with reputable businesses. 
                At E-Shop, we think Shopping ought to be an experience characterized by trust, openness, and complete fulfillment rather than only a transaction.
            </p>

            <h4 className="text-md font-bold text-gray-800 mb-3">Why Choose Us?</h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                        <h5 className="font-bold text-sm text-gray-800">Premium Quality</h5>
                        <p className="text-xs text-gray-500">100% Authentic Products</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <FaShippingFast className="text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                        <h5 className="font-bold text-sm text-gray-800">Fast Delivery</h5>
                        <p className="text-xs text-gray-500">Express Shipping Available</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <FaShieldAlt className="text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                        <h5 className="font-bold text-sm text-gray-800">Secure Payment</h5>
                        <p className="text-xs text-gray-500">Encrypted Transactions</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <FaHeadset className="text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                        <h5 className="font-bold text-sm text-gray-800">24/7 Support</h5>
                        <p className="text-xs text-gray-500">Always here to help</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <FaUndo className="text-red-500 mt-1 text-lg flex-shrink-0" />
                    <div>
                        <h5 className="font-bold text-sm text-gray-800">Easy Returns</h5>
                        <p className="text-xs text-gray-500 mt-1">30-Day Hassle-Free Policy</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <FaTags className="text-yellow-600 mt-1 text-lg flex-shrink-0" />
                    <div>
                        <h5 className="font-bold text-sm text-gray-800">Exclusive Deals</h5>
                        <p className="text-xs text-gray-500 mt-1">Daily Offers & Discounts</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <FaGlobe className="text-teal-600 mt-1 text-lg flex-shrink-0" />
                    <div>
                        <h5 className="font-bold text-sm text-gray-800">Wide Selection</h5>
                        <p className="text-xs text-gray-500 mt-1">10,000+ Products Available</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <FaStar className="text-indigo-600 mt-1 text-lg flex-shrink-0" />
                    <div>
                        <h5 className="font-bold text-sm text-gray-800">Trusted Reviews</h5>
                        <p className="text-xs text-gray-500 mt-1">Verified Customer Feedback</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Archive