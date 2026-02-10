import React, { useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { BsCart3, BsBoxSeam } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegHeart, FaRegBell, FaChevronDown } from "react-icons/fa6";
import { IoMdTrendingUp } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import Search from "./search";
import './Header.css';

const Header = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [user, setUser] = useState(null); // State to store logged-in user info

    // --- NEW: Check Local Storage on Component Mount ---
    useEffect(() => {
        // Function to read user data
        const loadUser = () => {
            const storedUser = localStorage.getItem('userData');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };

        // 1. Load on initial mount
        loadUser();

        // 2. Listen for login/logout events
        window.addEventListener('auth-change', loadUser);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('auth-change', loadUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        window.dispatchEvent(new Event("auth-change")); 
        window.location.href = '/login';
    };

    // Data structure (Your existing data)
    const categories = [
        {
            id: 1,
            name: "Electronics",
            subcategories: ["Mobiles", "Laptops", "Cameras", "Tablets", "Audio Devices"]
        },
        {
            id: 2,
            name: "Fashion",
            subcategories: ["Men's Top Wear", "Men's Bottom Wear", "Women's Top Wear", "Women's Bottom Wear", "Men's Footwear", "Women's Footwear", "Bags & Luggages", "Kids"]
        },
        {
            id: 3,
            name: "Furniture",
            subcategories: ["Living Room", "Bedroom", "Office Furniture", "Dining Room"]
        },
        {
            id: 4,
            name: "Home Appliances",
            subcategories: ["Kitchen Appliances", "Large Appliances", "Small Appliances", "Home Comforts"]
        },
        {
            id: 5,
            name: "Books & Toys",
            subcategories: ["Books", "Toys & Games"]
        },
        {
            id: 6,
            name: "Sports",
            subcategories: ["Fitness Equipment", "Outdoor Sports", "Indoor Games"]
        },
        {
            id: 7,
            name: "Beauty & Health",
            subcategories: ["Makeup", "Skin Care", "Hair Care"]
        }
    ];

    const createSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/'s/g, "") 
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");   
    };

    // Helper to get Image URL
    const getProfileImg = () => {
        if (user && user.profileImage) {
            return `http://localhost:5000/uploads/${user.profileImage}`;
        }
        return null;
    };

    return (
        <header className="bg-white">
            {/* Top Strip */}
            <div className="top-strip border-b border-gray-300">
                <div className="container-strip">
                    <div className="col-1 w-[50%] text-left">
                        <p className="font-[500]">!!! Free Shipping Over ₹1000 & Free Returns !!!</p>
                    </div>
                    <div className="col-2 flex items-center gap-4 justify-start">
                        <ul className="flex items-center gap-4">
                            <li><Link to="/orders" className="font-[600] text-gray-500 hover:text-blue-900">Order Tracking</Link></li>|
                            <li><Link to="/helpcenter" className="font-[600] text-gray-500 hover:text-blue-900">Help Center</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="header-main container-fluid py-4">
                <div className="container-main flex items-center">
                    <div className="col-1 w-[20%]">
                        <div className="logo">
                            <Link to="/">
                                <h2 className="text-3xl font-bold text-blue-900">E-Shop</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="col-2 w-[45%]">
                        <div className="w-full">
                            <Search />
                        </div>
                    </div>
                    <div className="col-3 flex items-center justify-end gap-6 w-[35%]">
                        
                        {/* --- UPDATED PROFILE SECTION --- */}
                        <div className="profile-container relative group">
                            {user ? (
                                // STATE 1: LOGGED IN (Show Image & Name)
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-blue-50">
                                        {getProfileImg() ? (
                                            <img 
                                                src={getProfileImg()} 
                                                alt={user.firstname} 
                                                className="w-full h-full object-cover"
                                                onError={(e) => {e.target.onerror = null; e.target.src=""}} // Fallback
                                            />
                                        ) : (
                                            <span className="text-blue-900 font-bold text-sm">
                                                {user.firstname ? user.firstname.charAt(0).toUpperCase() : 'U'}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-800 leading-tight">
                                            {user.firstname}
                                        </span>
                                        <span className="text-[10px] text-gray-500">Account ▾</span>
                                    </div>
                                </div>
                            ) : (
                                // STATE 2: LOGGED OUT (Show Login Button)
                                <Link to="/login">
                                    <button className="login-btn">
                                        <CgProfile className="w-6 h-6 mr-2 inline-block" />
                                        <span className="text-m font-[600]">Log in ▾</span>
                                    </button>
                                </Link>
                            )}

                            {/* Dropdown Menu (Works for both states, but customized for logged in) */}
                            <div className="dropdown-menu text-sm">
                                {user && (
                                    <div className="px-4 py-2 border-b mb-2">
                                        <p className="font-bold text-blue-900">Hello, {user.firstname}</p>
                                    </div>
                                )}
                                <Link to="/settings"><CgProfile className="w-4 h-4 mr-2 inline-block" />My Profile</Link>
                                <Link to="/orders"><BsBoxSeam className="w-4 h-4 mr-2 inline-block" />Orders</Link>
                                <Link to="/wishlist"><FaRegHeart className="w-4 h-4 mr-2 inline-block" />Wishlist</Link>
                                <hr className="my-2"/> 
                                {user ? (
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600 font-bold">
                                        Logout
                                    </button>
                                ) : (
                                    <Link to="/signup" className="SignUp px-4 py-2 block">New Account?<strong className="text-red-900 ml-3">Sign Up</strong></Link>
                                )}
                            </div>
                        </div>
                        {/* --- END UPDATED PROFILE SECTION --- */}

                        <div className="flex items-center gap-6 justify-end max-auto">
                            <Link to="/cart" className="hover:text-blue-900">
                                <div className="flex flex-row items-center height-full gap-1">
                                    <BsCart3 className="w-6 h-6" />
                                    <span className="text-m font-[600]">Cart</span>
                                </div>
                            </Link>
                        </div>
                        <div className="menu-container hover:text-blue-900">
                            <div className="menu-icon"><SlOptionsVertical className="w-4 h-4" /></div>
                            <div className="more-menu text-sm">
                                <Link to="/notification-pref"><FaRegBell className="w-4 h-4 mr-2 inline-block" />Notification Preference</Link>
                                <Link to="/advertise"><IoMdTrendingUp className="w-4 h-4 mr-2 inline-block" />Advertise</Link>
                                <Link to="/download-app"><MdOutlineFileDownload className="w-4 h-4 mr-2 inline-block" />Download App</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Navigation Bar (Unchanged) */}
            <nav className="bg-blue-900 text-white relative">
                <div className="container-main flex items-center justify-between h-[50px]">
                    <ul className="flex items-center w-full justify-evenly h-full">
                        {categories.map((cat) => (
                            <li 
                                key={cat.id} 
                                className="h-full flex items-center"
                                onMouseEnter={() => setActiveCategory(cat.id)}
                                onMouseLeave={() => setActiveCategory(null)}
                            >
                                <h1 className="flex items-center gap-2 px-4 h-full hover:bg-blue-800 transition-colors cursor-pointer font-medium uppercase text-sm tracking-wide">
                                    {cat.name}
                                    <FaChevronDown className={`text-xs transition-transform duration-200 ${activeCategory === cat.id ? 'rotate-180' : ''}`} />
                                </h1>

                                {activeCategory === cat.id && (
                                    <div className="absolute top-[100%] w-[210px] bg-white text-gray-800 shadow-xl border-t z-50 animate-fade-in">
                                        <div className="container-main py-6">
                                            <ul className="flex flex-col gap-3">
                                                {cat.subcategories.map((sub, index) => (
                                                    <li key={index}>
                                                        <Link 
                                                            to={`/${createSlug(sub)}`}
                                                            className="text-sm font-normal hover:text-blue-600 hover:translate-x-1 transition-all flex items-center gap-2"
                                                        >
                                                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full inline-block"></span>
                                                            {sub}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;