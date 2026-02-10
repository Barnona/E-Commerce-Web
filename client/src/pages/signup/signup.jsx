import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaUserCircle } from 'react-icons/fa';
import { authenticateSignup } from '../../service/api';

const Signup = () => {
    const navigate = useNavigate();

    const [signupValues, setSignupValues] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        phone: ''
    });

    const [error, setError] = useState('');

    const onInputChange = (e) => {
        setSignupValues({ ...signupValues, [e.target.name]: e.target.value });
        setError('');
    };

    const signupUser = async () => {
        if (!signupValues.username || !signupValues.password || !signupValues.email) {
            setError("Please fill in all mandatory fields.");
            return;
        }

        let response = await authenticateSignup(signupValues);

        if (!response) {
            setError("Server not responding. Please try again later.");
            return;
        }

        if (response.status === 200) {
            alert("Registration Successful!");
            setSignupValues({
                firstname: '', lastname: '', username: '', email: '', password: '', phone: ''
            });
            navigate('/login');
        } else {
            setError(response.data.message || "Registration Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg flex max-w-4xl w-full overflow-hidden">
                
                <div className="hidden md:flex w-2/5 bg-blue-900 text-white flex-col items-center justify-center p-8 text-center">
                    <div className="mb-4 text-6xl">
                        <FaUserCircle />
                    </div>
                    <p className="text-blue-100">Create an account to explore our exclusive products.</p>
                </div>

                <div className="w-full md:w-3/5 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Create Account</h2>
                    
                    {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm">{error}</div>}

                    <div className="flex flex-col gap-4">
                        
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full relative">
                                <FaUser className="absolute left-3 top-3.5 text-gray-400"/>
                                <input type="text" name="firstname" onChange={onInputChange} value={signupValues.firstname} placeholder="First Name" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="w-full relative">
                                <FaUser className="absolute left-3 top-3.5 text-gray-400"/>
                                <input type="text" name="lastname" onChange={onInputChange} value={signupValues.lastname} placeholder="Last Name" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div className="w-full relative">
                            <FaUserCircle className="absolute left-3 top-3.5 text-gray-400"/>
                            <input type="text" name="username" onChange={onInputChange} value={signupValues.username} placeholder="Choose a Username" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div className="w-full relative">
                            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400"/>
                            <input type="email" name="email" onChange={onInputChange} value={signupValues.email} placeholder="Email Address" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div className="w-full relative">
                            <FaPhone className="absolute left-3 top-3.5 text-gray-400"/>
                            <input type="text" name="phone" onChange={onInputChange} value={signupValues.phone} placeholder="Mobile Number" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div className="w-full relative">
                            <FaLock className="absolute left-3 top-3.5 text-gray-400"/>
                            <input type="password" name="password" onChange={onInputChange} value={signupValues.password} placeholder="Password" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <button 
                            onClick={signupUser}
                            className="mt-4 w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors shadow-lg"
                        >
                            Sign Up
                        </button>

                        <div className="text-center mt-4">
                            <span className="text-gray-600 text-sm">Already have an account? </span>
                            <Link to={'/login'}><span className="text-blue-900 font-bold cursor-pointer hover:underline">Log in</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;