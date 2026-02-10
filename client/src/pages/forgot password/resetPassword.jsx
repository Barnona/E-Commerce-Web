import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom'; // useParams grabs the token from URL
import { resetPassword } from '../../service/api';

const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL params
    const navigate = useNavigate();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const response = await resetPassword(token, password);
        
        if (response.status === 200) {
            alert("Password Reset Successfully!");
            navigate('/login');
        } else {
            alert("Error: " + response.data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                <h2 className="text-2xl font-bold mb-6 text-blue-900">Reset Password</h2>
                
                <div className="relative mb-4">
                    <FaLock className="absolute left-3 top-3.5 text-gray-400"/>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password" 
                        className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                <div className="relative mb-6">
                    <FaLock className="absolute left-3 top-3.5 text-gray-400"/>
                    <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password" 
                        className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                <button onClick={handleSubmit} className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition">
                    Update Password
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;