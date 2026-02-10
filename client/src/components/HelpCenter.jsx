import React, { useState } from 'react';
import { 
    FaSearch, FaBoxOpen, FaUser, FaCreditCard, 
    FaShippingFast, FaUndo, FaLock, FaChevronDown, FaChevronUp,
    FaEnvelope, FaPhoneAlt, FaWhatsapp
} from 'react-icons/fa';

const HelpCenter = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeQuestion, setActiveQuestion] = useState(null);

    // --- FAQ Data ---
    const faqData = [
        {
            category: "Orders & Tracking",
            icon: <FaBoxOpen />,
            questions: [
                { q: "How do I track my order?", a: "You can track your order by clicking on 'Order Tracking' in the header or going to 'My Orders' in your profile. You will see real-time updates there." },
                { q: "Can I cancel my order?", a: "Yes, you can cancel your order within 24 hours of placing it or before it has been shipped. Go to 'My Orders' > Select Order > Cancel." },
                { q: "I haven't received my order yet.", a: "Please check the estimated delivery date on your order page. If it has passed, please contact our customer support immediately." }
            ]
        },
        {
            category: "Returns & Refunds",
            icon: <FaUndo />,
            questions: [
                { q: "What is the return policy?", a: "We offer a 7-day return policy for most items. The product must be unused and in original packaging." },
                { q: "When will I get my refund?", a: "Refunds are processed within 5-7 business days after we receive the returned item. It will be credited back to your original payment method." }
            ]
        },
        {
            category: "Payments",
            icon: <FaCreditCard />,
            questions: [
                { q: "What payment methods do you accept?", a: "We accept Credit/Debit cards, Net Banking, UPI, and Cash on Delivery (COD) for eligible pincodes." },
                { q: "My payment failed but money was deducted.", a: "Don't worry! If the amount was deducted, it is usually auto-refunded by your bank within 48 hours. If not, contact us with your transaction ID." }
            ]
        },
        {
            category: "Account & Settings",
            icon: <FaUser />,
            questions: [
                { q: "How do I change my password?", a: "Go to your Profile > Settings > Change Password. You will need to enter your current password to set a new one." },
                { q: "I forgot my password.", a: "Click on 'Log In', then select 'Forgot Password?'. Enter your email to receive a reset link." }
            ]
        }
    ];

    // Filter Logic
    const filteredFaqs = faqData.map(cat => ({
        ...cat,
        questions: cat.questions.filter(
            item => item.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    item.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(cat => cat.questions.length > 0);

    const toggleQuestion = (index) => {
        setActiveQuestion(activeQuestion === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            
            {/* --- UPDATED: High Contrast Hero / Search Section --- */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">How can we help you?</h1>
                    <p className="text-blue-100 mb-8 text-lg">Search for specific issues or select a topic below.</p>
                    
                    <div className="relative max-w-2xl mx-auto">
                        {/* Icon Centered Vertically */}
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-500 text-lg" />
                        </div>
                        
                        {/* Input with Explicit White Background and Dark Text */}
                        <input 
                            type="text" 
                            placeholder="Type keywords like 'return', 'track', or 'payment'..." 
                            className="w-full pl-12 pr-6 py-4 rounded-full bg-white text-gray-900 placeholder-gray-500 shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-base border-0"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
                {/* --- Quick Action Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-b-4 border-blue-500 text-center transform hover:-translate-y-1">
                        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-2xl">
                            <FaShippingFast />
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Track Order</h3>
                        <p className="text-sm text-gray-500 mt-1">Check delivery status</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-b-4 border-green-500 text-center transform hover:-translate-y-1">
                        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-2xl">
                            <FaUndo />
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Return Item</h3>
                        <p className="text-sm text-gray-500 mt-1">Start a return request</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-b-4 border-yellow-500 text-center transform hover:-translate-y-1">
                        <div className="w-14 h-14 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600 text-2xl">
                            <FaLock />
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Reset Password</h3>
                        <p className="text-sm text-gray-500 mt-1">Unlock your account</p>
                    </div>
                </div>

                {/* --- Main FAQ Content --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Side: FAQs */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                        
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((category, catIndex) => (
                                <div key={catIndex} className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-2">
                                    <div className="flex items-center gap-3 p-4 text-blue-900 font-bold text-lg border-b border-gray-100">
                                        <span className="text-xl opacity-80">{category.icon}</span> 
                                        {category.category}
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {category.questions.map((item, qIndex) => {
                                            const uniqueId = `${catIndex}-${qIndex}`;
                                            const isOpen = activeQuestion === uniqueId;
                                            return (
                                                <div key={uniqueId} className="group">
                                                    <button 
                                                        onClick={() => toggleQuestion(uniqueId)}
                                                        className={`w-full text-left px-5 py-4 flex justify-between items-center font-medium transition-all ${isOpen ? 'text-blue-700 bg-blue-50/50' : 'text-gray-700 hover:bg-gray-50'}`}
                                                    >
                                                        {item.q}
                                                        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}>
                                                            <FaChevronDown />
                                                        </span>
                                                    </button>
                                                    {isOpen && (
                                                        <div className="px-5 py-4 text-sm text-gray-600 bg-blue-50/30 leading-relaxed animate-fade-in">
                                                            {item.a}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                                <FaSearch className="mx-auto text-4xl text-gray-200 mb-3" />
                                <p className="text-gray-500">No results found for "<span className="font-bold text-gray-700">{searchTerm}</span>".</p>
                                <p className="text-sm text-gray-400 mt-1">Try searching for "refund" or "track"</p>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Contact Box */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Still need help?</h3>
                            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                Can't find the answer you're looking for? Please chat to our friendly team.
                            </p>

                            <div className="space-y-3">
                                <a href="mailto:support@eshop.com" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition border border-gray-100 hover:border-blue-200 group">
                                    <div className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Email Support</div>
                                        <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">support@eshop.com</div>
                                    </div>
                                </a>

                                <a href="tel:1800123456" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-green-50 transition border border-gray-100 hover:border-green-200 group">
                                    <div className="w-10 h-10 bg-white text-green-600 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition">
                                        <FaPhoneAlt />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Phone Support</div>
                                        <div className="text-sm font-bold text-gray-900 group-hover:text-green-700">1800-123-456</div>
                                    </div>
                                </a>

                                <a href="https://wa.me/918910205092" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-green-50 transition border border-gray-100 hover:border-green-200 group">
                                    <div className="w-10 h-10 bg-white text-green-500 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition">
                                        <FaWhatsapp className="text-xl"/>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">WhatsApp</div>
                                        <div className="text-sm font-bold text-gray-900 group-hover:text-green-700">Chat with us</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HelpCenter;