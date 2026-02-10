import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile, CgLogOut } from "react-icons/cg";
import { FaChevronDown } from "react-icons/fa"; 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import "./style.css";

// Import API
import { getUser } from '../service/api'; 

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // --- 1. JWT DECODER HELPER ---
  const parseJwt = (token) => {
    try {
        if (!token) return null;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Invalid Token");
        return null;
    }
  };

  useEffect(() => {
    const fetchUserFromToken = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        const decoded = parseJwt(token);
        
        // Check expiry
        if (decoded.exp * 1000 < Date.now()) {
            handleLogout(); 
            return;
        }

        if (decoded && decoded.id) {
            const response = await getUser(decoded.id);
            if (response && response.status === 200) {
                // Ensure we are setting the full object which contains 'image'
                setUser(response.data);
            }
        }
      }
    };

    fetchUserFromToken();
  }, []);

  const handleLogout = () => {
      localStorage.removeItem('token'); 
      localStorage.removeItem('user'); // Clean up any legacy data
      setUser(null);
      navigate('/login');
  };

  return (
    <header className='w-full h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 flex justify-between items-center sticky top-0 z-50 transition-all duration-300'>

        {/* Left Side */}
        <div className="text-xl font-bold text-blue-900 tracking-tight">
             {/* Logo goes here */}
        </div> 

        {/* Right Side Content */}
        <div className='flex items-center gap-4'>
            
            {/* Notification Icon */}
            <Button 
                sx={{ 
                    borderRadius: '50%', 
                    minWidth: '45px', 
                    width: '45px', 
                    height: '45px',
                    '&:hover': { backgroundColor: '#f3f4f6' } 
                }}
            >
                <Box sx={{ color: '#64748b' }}> 
                    <Badge color="error" variant="dot">
                        <Link to={'/settings'}><MailIcon /></Link>
                    </Badge>
                </Box>
            </Button>
            
            <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

            {/* Profile Section */}
            <div className="relative group h-full flex items-center">
                {user ? (
                    // --- LOGGED IN VIEW ---
                    <>
                        <div className="flex items-center gap-3 cursor-pointer p-1.5 pr-3 rounded-full hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200">
                            
                            {/* --- UPDATED AVATAR COMPONENT --- */}
                            <Avatar 
                                src={user.image} // <--- Shows image if available
                                alt={user.name}
                                sx={{ 
                                    width: 35, 
                                    height: 35, 
                                    bgcolor: '#3b82f6', 
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                }}
                            >
                                {/* Fallback: Shows First Letter if no image */}
                                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </Avatar>

                            <div className="hidden md:flex flex-col items-start leading-tight">
                                <span className="text-sm font-semibold text-gray-700 capitalize">
                                    {user.name}
                                </span>
                                <span className="text-[10px] text-gray-500 font-medium">
                                    Admin
                                </span>
                            </div>
                            <FaChevronDown className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-[50px] w-56 bg-white shadow-2xl rounded-xl overflow-hidden hidden group-hover:block border border-gray-100 transform transition-all duration-200 origin-top-right ring-1 ring-black ring-opacity-5">
                             {/* User Info Header */}
                             <div className='px-5 py-4 border-b border-gray-100 bg-gray-50/50'>
                                <p className='font-bold text-gray-800 text-sm truncate'>{user.name}</p>
                                <p className='text-xs text-gray-500 truncate mt-0.5'>{user.email}</p>
                             </div>
                            
                            <div className="p-2">
                                <Link to="/settings" className="flex items-center px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group/item">
                                    <div className="p-1.5 bg-gray-100 text-gray-500 rounded-md mr-3 group-hover/item:bg-blue-100 group-hover/item:text-blue-600 transition-colors">
                                        <CgProfile className="w-4 h-4" /> 
                                    </div>
                                    My Profile
                                </Link>
                                
                                <div 
                                    onClick={handleLogout} 
                                    className="flex items-center px-3 py-2.5 text-sm text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 cursor-pointer transition-colors mt-1 group/item"
                                >
                                    <div className="p-1.5 bg-red-50 text-red-500 rounded-md mr-3 group-hover/item:bg-red-100 group-hover/item:text-red-600 transition-colors">
                                        <CgLogOut className="w-4 h-4" /> 
                                    </div>
                                    Logout
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // --- LOGGED OUT VIEW ---
                    <Link to="/Login">
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium text-sm shadow-md shadow-blue-200 transition-all transform hover:scale-105 active:scale-95">
                            <CgProfile className="w-5 h-5" />
                            <span>Log in</span>
                        </button>
                    </Link>
                )}
            </div>
        </div>
    </header>
  )
}

export default Header;