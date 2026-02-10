import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { 
    FaTshirt, 
    FaTags, 
    FaUndo, 
    FaShoppingBag 
} from 'react-icons/fa';

const Boxes = () => {
    const [stats, setStats] = useState([
        { 
            label: 'Total SKUs', 
            val: '12,540', 
            icon: <FaTshirt />, 
            color: 'text-purple-600', 
            bg: 'bg-purple-100',
            trend: 'High variant count'
        },
        { 
            label: 'Avg. Order Value', 
            val: '₹1,850', 
            icon: <FaShoppingBag />, 
            color: 'text-blue-600', 
            bg: 'bg-blue-100',
            trend: '↑ 5% from last week'
        },
        { 
            label: 'Return Rate', 
            val: '12.4%', 
            icon: <FaUndo />, 
            color: 'text-orange-600', 
            bg: 'bg-orange-100',
            trend: 'Standard for fashion'
        },
    ]);

    useEffect(() => {
        const fetchStats = async () => {
            // Fetch specifically for category
            const data = await getCategoryData("Fashion");
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