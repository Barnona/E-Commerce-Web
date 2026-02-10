import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { 
    FaBoxOpen, 
    FaClipboardList,
    FaExclamationTriangle, 
} from 'react-icons/fa';

const Boxes = () => {
    // Data for the stats cards
    const [stats, setStats] = useState([
        { 
            label: 'Total Products', 
            val: '1,245', 
            icon: <FaBoxOpen />, 
            color: 'text-blue-600', 
            bg: 'bg-blue-100',
            trend: '+12% this month'
        },
        { 
            label: 'Total Stock', 
            val: '8,502', 
            icon: <FaClipboardList />, 
            color: 'text-green-600', 
            bg: 'bg-green-100',
            trend: 'In good standing'
        },
        { 
            label: 'Low Stock Items', 
            val: '15', 
            icon: <FaExclamationTriangle />, 
            color: 'text-orange-600', 
            bg: 'bg-orange-100',
            trend: 'Requires attention'
        },
    ]);
    
    useEffect(() => {
    const fetchStats = async () => {
        // Fetch specifically for category
        const data = await getCategoryData("Beauty and Health");
        if (data) {
            if (data.stats && data.stats.length > 0) setStats(data.stats);
        }
    };
    fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-3 h-full">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 justify-between h-full">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.val}</h3>
                        </div>
                        <div className={`p-3 rounded-full ${stat.bg} ${stat.color} text-xl`}>
                            {stat.icon}
                        </div>
                    </div>
                    <p className={`text-xs font-medium ${stat.label === 'Low Stock Items' ? 'text-red-500' : 'text-green-600'}`}>
                        {stat.trend}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Boxes;