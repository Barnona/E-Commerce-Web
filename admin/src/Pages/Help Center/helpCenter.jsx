import React, { useState } from 'react';
import { 
    FaBook, 
    FaBoxOpen, 
    FaUserCog, 
    FaChevronDown, 
    FaChevronUp, 
    FaFileInvoiceDollar
} from 'react-icons/fa';

const Help = () => {
    // State for FAQ Accordion
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    // Data: Help Categories
    const helpCategories = [
        { id: 1, title: 'Getting Started', icon: <FaBook />, desc: 'Guide to dashboard setup & configuration.' },
        { id: 2, title: 'Order Management', icon: <FaBoxOpen />, desc: 'Tracking, refunds, and shipping labels.' },
        { id: 3, title: 'Account & Users', icon: <FaUserCog />, desc: 'Managing admin roles and permissions.' },
        { id: 4, title: 'Payments & Payouts', icon: <FaFileInvoiceDollar />, desc: 'Understanding fees, taxes, and withdrawals.' },
    ];

    // Data: FAQs
    const faqs = [
        {
            question: "How do I reset my Admin Password?",
            answer: "Go to Settings > Security > Change Password. If you cannot log in, use the 'Forgot Password' link on the login screen to receive a reset link via email."
        },
        {
            question: "How do I bulk upload products?",
            answer: "Navigate to the Products tab and click 'Import'. Download the CSV template, fill in your product details, and upload the file back to the system."
        },
        {
            question: "A customer wants a refund, how do I process it?",
            answer: "Go to the Orders page, select the specific order ID. Click on the 'Actions' dropdown and select 'Issue Refund'. You can choose partial or full refund."
        },
        {
            question: "My dashboard sales data isn't updating.",
            answer: "Data is usually real-time, but sometimes there is a 5-10 minute cache delay. Try refreshing the page or clearing your browser cache. If the issue persists for over an hour, contact support."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            
            {/* 1. Hero Section (Search Removed) */}
            <div className="bg-blue-900 py-16 px-4 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">How can we help you today?</h1>
                <p className="text-blue-200">Browse topics and guides below.</p>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-8">
                
                {/* 2. Topic Cards (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {helpCategories.map((cat) => (
                        <div key={cat.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-blue-900 group">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 text-xl mb-4 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                                {cat.icon}
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">{cat.title}</h3>
                            <p className="text-gray-500 text-sm">{cat.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    
                    {/* 3. Frequently Asked Questions (Left Column) */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <button 
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none"
                                    >
                                        <span className="font-semibold text-gray-700">{faq.question}</span>
                                        {openFaqIndex === index ? <FaChevronUp className="text-blue-600"/> : <FaChevronDown className="text-gray-400"/>}
                                    </button>
                                    
                                    {/* Animated Answer Div */}
                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="p-5 pt-0 text-gray-600 text-sm border-t border-gray-100">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Contact Sidebar (Buttons Removed) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Still need help?</h3>
                            <p className="text-gray-500 text-sm mb-6">Our support team is available Mon-Fri, 9am - 6pm.</p>
                            
                            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-900">
                                <p className="font-semibold">Contact Email:</p>
                                <p>support@eshopadmin.com</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Help;