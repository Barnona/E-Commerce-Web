import React, { useState } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { forgotPassword } from '../../service/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email) {
            setError("Please enter your email address");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        const response = await forgotPassword(email);

        if (response && response.status === 200) {
            setMessage("Link sent! Please check your email inbox.");
        } else {
            setError(response?.data?.message || "Failed to send link. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    <FaPaperPlane />
                </div>
                
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Forgot Password?</h2>
                <p className="text-gray-500 mb-8 text-sm">
                    Enter your email address associated with your account and we will send you a link to reset your password.
                </p>
                
                <div className="relative mb-6 text-left">
                    <FaEnvelope className="absolute left-3 top-3.5 text-gray-400"/>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" 
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                    />
                </div>

                <button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className={`w-full text-white font-bold py-3 rounded-lg transition-colors shadow-md ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800'
                    }`}
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                
                {message && <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-sm">{message}</div>}
                {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>}
            </div>
        </div>
    );
};

export default ForgotPassword;