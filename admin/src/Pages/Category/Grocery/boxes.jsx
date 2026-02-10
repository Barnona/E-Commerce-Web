import React from 'react';
import { 
    FaAppleAlt, 
    FaShoppingBasket, 
    FaClock, 
    FaExclamationCircle 
} from 'react-icons/fa';

const Boxes = () => {
    const stats = [
        { 
            label: 'Daily Orders', 
            val: '1,250', 
            icon: <FaShoppingBasket />, 
            color: 'text-green-600', 
            bg: 'bg-green-100',
            trend: 'High frequency'
        },
        { 
            label: 'Near Expiry', 
            val: '45 Items', 
            icon: <FaExclamationCircle />, 
            color: 'text-orange-600', 
            bg: 'bg-orange-100',
            trend: 'Discount immediately'
        },
        { 
            label: 'Avg. Delivery', 
            val: '25 Mins', 
            icon: <FaClock />, 
            color: 'text-blue-600', 
            bg: 'bg-blue-100',
            trend: 'Quick commerce'
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-3 h-full">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.val}</h3>
                        </div>
                        <div className={`p-3 rounded-full ${stat.bg} ${stat.color} text-xl`}>
                            {stat.icon}
                        </div>
                    </div>
                    <p className="text-xs font-medium text-gray-500">
                        {stat.trend}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Boxes;