import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { 
    FaCouch, 
    FaTruck, 
    FaTools, 
    FaWarehouse 
} from 'react-icons/fa';

const Boxes = () => {
    const [stats, setStats] = useState([
        { 
            label: 'Total Inventory', 
            val: '850 Items', 
            icon: <FaWarehouse />, 
            color: 'text-amber-700', 
            bg: 'bg-amber-100',
            trend: 'Bulky storage'
        },
        { 
            label: 'Avg. Order Value', 
            val: '₹12,500', 
            icon: <FaCouch />, 
            color: 'text-blue-600', 
            bg: 'bg-blue-100',
            trend: 'High ticket items'
        },
        { 
            label: 'Scheduled Delivery', 
            val: '42 Orders', 
            icon: <FaTruck />, 
            color: 'text-green-600', 
            bg: 'bg-green-100',
            trend: 'Dispatching today'
        },
    ]);

    useEffect(() => {
            const fetchStats = async () => {
                // Fetch specifically for category
                const data = await getCategoryData("Furniture");
                if (data) {
                    if (data.stats && data.stats.length > 0) setStats(data.stats);
                }
            };
        fetchStats();
    }, []);

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