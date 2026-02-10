import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { authenticateLogin } from '../../service/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setAccount }) => {
    
    const navigate = useNavigate();
    const [loginValues, setLoginValues] = useState({
        email: '', 
        password: ''
    });

    const [error, setError] = useState('');

    const onValueChange = (e) => {
        setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
        setError('');
    }

    const loginUser = async () => {
        if (!loginValues.email || !loginValues.password) {
            setError("Please fill in all fields.");
            return;
        }

        let response = await authenticateLogin(loginValues);

        if (!response) {
            setError("Server unreachable. Please try again later.");
            return;
        }

        if (response.status === 200) {

            alert("Login Successful!");
            localStorage.setItem('userToken', response.data.data.token);
            localStorage.setItem('userData', JSON.stringify(response.data.data));
            window.dispatchEvent(new Event("auth-change"));
            navigate('/');
        } else {
            setError(response.data.message || "Login Failed");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg flex max-w-4xl w-full overflow-hidden h-[500px]">
                
                <div className="hidden md:flex w-2/5 bg-blue-900 text-white flex-col items-center justify-center p-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                    <p className="text-blue-100 mb-8">To keep connected with us please login with your personal info.</p>
                    <div className="text-9xl opacity-20">
                        <FaSignInAlt />
                    </div>
                </div>

                <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Login</h2>
                    
                    {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm">{error}</div>}

                    <div className="flex flex-col gap-6">
                        
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400 text-lg"/>
                            <input 
                                type="email" 
                                name="email"
                                value={loginValues.email} 
                                onChange={onValueChange} 
                                placeholder="Email Address" 
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                            />
                        </div>

                        <div className="relative">
                            <FaLock className="absolute left-3 top-3.5 text-gray-400 text-lg"/>
                            <input 
                                type="password" 
                                name="password" 
                                value={loginValues.password} 
                                onChange={onValueChange} 
                                placeholder="Password" 
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                            />
                        </div>

                        <div className="text-right text-sm">
                            <Link to={'/forgot-password'}><span className="text-blue-600 hover:underline cursor-pointer">Forgot Password?</span></Link>
                        </div>

                        <button 
                            onClick={loginUser}
                            className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors shadow-md mt-2"
                        >
                            Log In
                        </button>

                        <div className="text-center mt-6">
                            <span className="text-gray-600 text-sm">New User? </span>
                            <Link to={'/signup'}><span className="text-blue-900 font-bold cursor-pointer hover:underline">Create an Account</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;