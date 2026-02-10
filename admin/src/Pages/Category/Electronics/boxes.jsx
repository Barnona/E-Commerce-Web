import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { 
    FaMicrochip, 
    FaBoxOpen, 
    FaBolt, 
    FaTruckLoading 
} from 'react-icons/fa';

const Boxes = () => {
    const [stats, setStats] = useState([
        { 
            label: 'Total Gadgets', 
            val: '2,840', 
            icon: <FaMicrochip />, 
            color: 'text-blue-600', 
            bg: 'bg-blue-100',
            trend: '+8% new arrivals'
        },
        { 
            label: 'Total Value', 
            val: '₹4.2 Cr', 
            icon: <FaBoxOpen />, 
            color: 'text-indigo-600', 
            bg: 'bg-indigo-100',
            trend: 'High value inventory'
        },
        { 
            label: 'Fast Moving', 
            val: '124', 
            icon: <FaBolt />, 
            color: 'text-yellow-600', 
            bg: 'bg-yellow-100',
            trend: 'Smartphones & Audio'
        },
    ]);
    useEffect(() => {
        const fetchStats = async () => {
            // Fetch specifically for category
            const data = await getCategoryData("Electronics");
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